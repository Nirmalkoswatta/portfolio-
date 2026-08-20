// minimal data file for tech stack icons
import { FaReact, FaPython, FaDocker, FaServer, FaShieldAlt } from 'react-icons/fa';
import { SiGrafana, SiPrometheus, SiTerraform, SiGithubactions, SiOracle, SiTypescript } from 'react-icons/si';
import { Rocket } from 'lucide-react';

// Carousel data for tech stack
export const techStack = [
  { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
  { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
  { name: 'Terraform', icon: SiTerraform, color: '#844FBA' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'Coolify', icon: FaServer, color: '#6366F1' },
  { name: 'Oracle DB', icon: SiOracle, color: '#F80000' },
  { name: 'DevSecOps', icon: FaShieldAlt, color: '#10B981' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'CI/CD', icon: Rocket, color: '#EC4899' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
];

export default techStack;

