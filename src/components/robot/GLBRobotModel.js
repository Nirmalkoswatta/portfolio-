import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import gsap from 'gsap';
import TeleportEffect from './TeleportEffect';

// Optimized from the original Sketchfab source (37.5MB -> ~640KB): textures
// resized/re-encoded to WebP, geometry welded/pruned. See asset-sources/ for
// the original. Node/material layout confirmed via `npx gltfjsx` (see
// RobotGLTF.jsx) - 3 static meshes (no bones/rig), one per paint color.
const MODEL_URL = '/robot-optimized.glb';

// The source asset's front points sideways relative to this scene's default
// camera-facing (+Z) - rotate here if it ever looks off after a model swap.
// (+90 previously overshot to the back; -90 brings it to front.)
const FRONT_FACING_CORRECTION = -Math.PI / 2;

// Per-mesh transforms as resolved by gltfjsx from the flattened scene graph -
// reused here instead of `<primitive object={scene} />` so each part is a
// real React node with its own ref/events (hover highlight, future per-part
// control) rather than an opaque black-box.
const PART_TRANSFORMS = {
  R: { position: [0.018, 0.432, 0.01], rotation: [-Math.PI / 2, 0, 0], scale: 2.409 },
  B: { position: [0.195, 0.491, 0.01], rotation: [-Math.PI / 2, 0, 0], scale: 2.245 },
  G: { position: [0.015, 0.439, 0.01], rotation: [-Math.PI / 2, 0, 0], scale: 2.416 },
};
const PART_KEYS = ['R', 'B', 'G'];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const damp = (current, target, lambda, delta) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));

/**
 * Loads the real GLB robot asset and drives it with the same interaction
 * targets (`motion`, see useRobotInteraction) as the rest of the system:
 * idle breathing + cursor look + GSAP-driven teleport (dematerialize/
 * relocate/rematerialize), plus a hover-triggered wave gesture and per-part
 * glow highlight. Centering/scale is computed from the model's actual
 * bounding box so it frames consistently regardless of the source asset's
 * own pivot/units.
 */
const GLBRobotModel = ({ motion, quality = 'high' }) => {
  const { scene, nodes, materials } = useGLTF(MODEL_URL);

  const { offset, scale } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const TARGET_HEIGHT = 2.6; // matches the framing the rest of the scene/camera expects
    return {
      offset: [-center.x, -center.y, -center.z],
      scale: TARGET_HEIGHT / maxDim,
    };
  }, [scene]);

  // Match each flattened mesh node to its paint-color material by name
  // (robust regardless of the source asset's mangled/non-ASCII node names).
  const partMeshes = useMemo(() => {
    const meshes = Object.values(nodes).filter((n) => n.isMesh);
    const find = (materialName) => meshes.find((n) => n.material?.name === materialName);
    return { R: find('R.001'), B: find('B.001'), G: find('G.001') };
  }, [nodes]);

  const baseEmissive = useMemo(() => {
    const base = {};
    PART_KEYS.forEach((k) => {
      const mat = materials[`${k}.001`];
      base[k] = mat ? mat.emissiveIntensity ?? 0 : 0;
      // Teleport needs to fade opacity, so materials must be transparent-capable.
      if (mat) {
        mat.transparent = true;
        mat.needsUpdate = true;
      }
    });
    return base;
  }, [materials]);

  const rootGroup = useRef();
  const modelGroup = useRef();
  const groundGlow = useRef();
  const entrance = useRef(0);
  const idleSeed = useRef(Math.random() * Math.PI * 2);

  const hoverPart = useRef(null); // which part (R/B/G) the pointer is directly over
  const nearHover = useRef(false); // pointer anywhere near the robot (via the forgiving collider)
  const waveAngle = useRef(0);
  const waveState = useRef({ active: false, cooldownUntil: 0 });

  // Friendly greeting gesture: a quick side-to-side rock/settle, triggered
  // when the pointer first comes near the robot. The source GLB has no arm
  // bone to raise, so this reads as a whole-body "hello" wave/shimmy rather
  // than a literal arm-raise - still clamped, damped back to idle after.
  const triggerWave = () => {
    const now = performance.now();
    if (waveState.current.active || now < waveState.current.cooldownUntil) return;
    waveState.current.active = true;
    const obj = { a: 0 };
    gsap
      .timeline({
        onComplete: () => {
          waveState.current.active = false;
          waveState.current.cooldownUntil = performance.now() + 1200;
        },
      })
      .to(obj, { a: 1, duration: 0.16, ease: 'power2.out', onUpdate: () => (waveAngle.current = obj.a) })
      .to(obj, { a: -0.85, duration: 0.26, ease: 'sine.inOut', onUpdate: () => (waveAngle.current = obj.a) })
      .to(obj, { a: 0.55, duration: 0.22, ease: 'sine.inOut', onUpdate: () => (waveAngle.current = obj.a) })
      .to(obj, { a: 0, duration: 0.35, ease: 'elastic.out(1, 0.6)', onUpdate: () => (waveAngle.current = obj.a) });
  };

  const handleNearEnter = () => {
    if (motion.reducedMotionRef.current) return;
    if (!nearHover.current) {
      nearHover.current = true;
      triggerWave();
    }
  };
  const handleNearLeave = () => {
    nearHover.current = false;
  };
  const handlePartOver = (part) => (e) => {
    e.stopPropagation();
    hoverPart.current = part;
  };
  const handlePartOut = (part) => () => {
    if (hoverPart.current === part) hoverPart.current = null;
  };

  useFrame((state, rawDelta) => {
    if (!rootGroup.current || !modelGroup.current) return;
    const delta = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;
    const { pointerRef, motionRef, reducedMotionRef } = motion;
    const m = motionRef.current;
    const reduced = reducedMotionRef.current;

    // Entrance: gentle rise + soft overshoot settle.
    entrance.current = Math.min(1, entrance.current + delta / 0.9);
    const entranceEase = 1 - Math.pow(1 - entrance.current, 3);
    const entranceOvershoot = entrance.current < 1 ? Math.sin(entrance.current * Math.PI) * 0.035 : 0;

    // Calm idle breathing, scaled by the teleport dematerialize/rematerialize
    // envelope (1 = fully here, 0 = mid-teleport/invisible).
    const breathe = reduced ? 0 : Math.sin(t * 1.05) * 0.03;
    rootGroup.current.position.y = breathe + (entranceEase - 1) * 0.5;
    const idleScale = 0.97 + entranceEase * 0.03 * (0.96 + m.squash * 0.04) + entranceOvershoot;
    rootGroup.current.scale.setScalar(idleScale * Math.max(0.001, m.teleport));

    // Cursor awareness + jump lean, all on the whole model (no separate head
    // bone available on this static mesh).
    const pointerTargetY = reduced ? 0 : clamp(pointerRef.current.x, -1, 1) * 0.22;
    const pointerTargetX = reduced ? 0 : clamp(-pointerRef.current.y, -1, 1) * 0.1;
    const microGlance = reduced ? 0 : Math.sin(t * 0.17 + idleSeed.current) * 0.03;
    const idleSway = reduced ? 0 : Math.sin(t * 0.22 + idleSeed.current) * 0.025;

    const targetY = FRONT_FACING_CORRECTION + clamp(pointerTargetY + microGlance + idleSway, -0.4, 0.4) + m.leanX * 0.3;
    const targetX = clamp(pointerTargetX, -0.18, 0.18);
    const targetZ = m.leanX * 0.5 + (reduced ? 0 : waveAngle.current * 0.4);

    modelGroup.current.rotation.y = damp(modelGroup.current.rotation.y, targetY, 5, delta);
    modelGroup.current.rotation.x = damp(modelGroup.current.rotation.x, targetX, 5, delta);
    modelGroup.current.rotation.z = damp(modelGroup.current.rotation.z, targetZ, 6, delta);

    // Per-part glow highlight when the pointer is directly over that section,
    // plus the teleport opacity fade (materials made transparent-capable above).
    PART_KEYS.forEach((k) => {
      const mat = materials[`${k}.001`];
      if (!mat) return;
      const target = hoverPart.current === k ? baseEmissive[k] + 0.7 : baseEmissive[k];
      mat.emissiveIntensity = damp(mat.emissiveIntensity, target, 8, delta);
      mat.opacity = m.teleport;
    });

    if (groundGlow.current) {
      groundGlow.current.material.opacity = (0.14 + Math.sin(t * 1.1) * 0.03 + m.eyeBoost * 0.08) * entranceEase * m.teleport;
    }
  });

  return (
    <group ref={rootGroup} position={[0, -0.35, 0]}>
      <mesh ref={groundGlow} position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.14} depthWrite={false} />
      </mesh>

      <TeleportEffect teleportFxRef={motion.teleportFxRef} groundY={-1.3} />

      <group ref={modelGroup}>
        <group scale={scale} position={[offset[0] * scale, offset[1] * scale, offset[2] * scale]}>
          {PART_KEYS.map(
            (k) =>
              partMeshes[k] && (
                <mesh
                  key={k}
                  geometry={partMeshes[k].geometry}
                  material={materials[`${k}.001`]}
                  {...PART_TRANSFORMS[k]}
                  onPointerOver={handlePartOver(k)}
                  onPointerOut={handlePartOut(k)}
                />
              )
          )}
        </group>
      </group>

      {/* Invisible, slightly-larger interaction collider - forgiving hit area
          for clicks/taps, and the "pointer near the robot" wave trigger. */}
      <mesh
        visible={false}
        position={[0, -0.3, 0]}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerOver={handleNearEnter}
        onPointerOut={handleNearLeave}
      >
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload(MODEL_URL);

export default GLBRobotModel;
