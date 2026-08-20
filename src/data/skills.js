// ============================================
// SKILLS DATA
// DevOps Capability Matrix
// ============================================

export const skillCategories = [
  {
    id: 'cloud',
    label: 'CLOUD',
    color: 'var(--accent)',
    skills: [
      {
        name: 'AWS',
        level: 'EXPERIENCED',
        context: ['EC2', 'S3', 'RDS', 'IAM', 'CloudWatch', 'CloudFormation', 'VPC'],
        description: 'Cloud infrastructure provisioning, security policies, cost optimization, and resource management.',
      },
      {
        name: 'Azure',
        level: 'WORKING',
        context: ['Virtual Machines', 'Blob Storage', 'Azure DevOps', 'Entra ID', 'VNet', 'Resource Groups'],
        description: 'Cloud infrastructure provisioning, virtual networks, identity access management, and automated deployments.',
      },
      {
        name: 'Huawei Cloud',
        level: 'WORKING',
        context: ['ECS', 'OBS', 'VPC', 'IAM'],
        description: 'Enterprise cloud infrastructure setup and management.',
      },
    ],
  },
  {
    id: 'containers',
    label: 'CONTAINERS',
    color: '#2496ED',
    skills: [
      {
        name: 'Docker',
        level: 'EXPERIENCED',
        context: ['Dockerfile', 'Compose', 'Multi-stage Builds', 'Networking', 'Volumes'],
        description: 'Containerization, image optimization, multi-stage builds, and orchestrated deployments.',
      },
      {
        name: 'Kubernetes',
        level: 'WORKING',
        context: ['Deployments', 'Services', 'ConfigMaps', 'Ingress', 'Monitoring'],
        description: 'Container orchestration, cluster management, and workload scaling.',
      },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    color: '#22c55e',
    skills: [
      {
        name: 'GitHub Actions',
        level: 'CORE',
        context: ['Workflows', 'Matrix Builds', 'Secrets', 'Artifacts', 'Deployment'],
        description: 'End-to-end CI/CD pipeline automation with multi-environment deployments.',
      },
      {
        name: 'Coolify',
        level: 'EXPERIENCED',
        context: ['Self-hosted PaaS', 'Auto Deploy', 'Container Orchestration'],
        description: 'Self-hosted deployment platform for automated staging and production workflows.',
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    color: 'var(--accent-violet)',
    skills: [
      {
        name: 'Terraform',
        level: 'EXPERIENCED',
        context: ['HCL', 'State Management', 'Modules', 'Multi-provider'],
        description: 'Declarative IaC provisioning and multi-environment infrastructure management.',
      },
      {
        name: 'Linux',
        level: 'EXPERIENCED',
        context: ['Administration', 'Shell Scripting', 'Networking', 'Security'],
        description: 'Server administration, shell scripting, networking, and security hardening.',
      },
    ],
  },
  {
    id: 'observability',
    label: 'OBSERVABILITY',
    color: '#F46800',
    skills: [
      {
        name: 'Grafana',
        level: 'EXPERIENCED',
        context: ['Dashboards', 'Alerts', 'Panels', 'Data Sources', 'Variables'],
        description: 'Real-time interactive dashboards, alert management, and metric visualization.',
      },
      {
        name: 'Prometheus',
        level: 'EXPERIENCED',
        context: ['PromQL', 'Exporters', 'Alert Rules', 'Targets', 'Service Discovery'],
        description: 'Time-series metric collection, target discovery, and alert rule configuration.',
      },
    ],
  },
  {
    id: 'security',
    label: 'SECURITY',
    color: '#ef4444',
    skills: [
      {
        name: 'DevSecOps',
        level: 'EXPERIENCED',
        context: ['SAST', 'DAST', 'Secret Detection', 'Container Scanning', 'Compliance'],
        description: 'Automated security scanning and vulnerability management in CI/CD pipelines.',
      },
      {
        name: 'Oracle DB',
        level: 'WORKING',
        context: ['Administration', 'Performance Tuning', 'Schema Management', 'Backup'],
        description: 'Enterprise database administration, query optimization, and reliability.',
      },
    ],
  },
  {
    id: 'development',
    label: 'DEVELOPMENT',
    color: 'var(--accent-cyan)',
    skills: [
      {
        name: 'React',
        level: 'EXPERIENCED',
        context: ['Hooks', 'State Management', 'SPA', 'Component Architecture'],
        description: 'Modern responsive web interfaces with component-driven architecture.',
      },
      {
        name: 'Python',
        level: 'WORKING',
        context: ['FastAPI', 'Scripting', 'Automation', 'Data Processing'],
        description: 'Backend APIs, automation scripting, and data processing.',
      },
      {
        name: 'Node.js',
        level: 'WORKING',
        context: ['Express', 'REST APIs', 'GraphQL', 'Server-side'],
        description: 'Server-side JavaScript development and API construction.',
      },
    ],
  },
];

// Skill level descriptions
export const skillLevels = {
  CORE: { label: 'Core', description: 'Primary daily tool', color: 'var(--accent)' },
  EXPERIENCED: { label: 'Experienced', description: 'Strong working knowledge', color: 'var(--success)' },
  WORKING: { label: 'Working', description: 'Practical experience', color: 'var(--accent-cyan)' },
  EXPANDING: { label: 'Expanding', description: 'Actively learning', color: 'var(--accent-violet)' },
};

export default skillCategories;
