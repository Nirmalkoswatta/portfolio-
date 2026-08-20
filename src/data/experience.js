// ============================================
// EXPERIENCE DATA
// ============================================

export const experience = [
  {
    id: 'zuse',
    year: '2024 — Present',
    role: 'Junior DevOps Engineer',
    company: 'Zuse Technologies',
    url: 'https://zuse.lk/',
    type: 'Internship',
    status: 'current',
    description: 'Building automated deployment pipelines, Infrastructure as Code, system observability, and enterprise database management.',
    responsibilities: [
      'CI/CD workflows using GitHub Actions & Coolify PaaS',
      'Infrastructure as Code with Terraform',
      'System monitoring with Prometheus & Grafana',
      'Oracle DB administration & performance tuning',
      'Containerized application deployments',
    ],
    technologies: ['GitHub Actions', 'Terraform', 'Prometheus', 'Grafana', 'Docker', 'Oracle DB', 'Coolify', 'AWS'],
  },
  {
    id: 'fortude',
    year: '2024',
    role: 'Intern DevSecOps Engineer',
    company: 'Fortude',
    url: 'https://fortude.co/',
    type: 'Internship',
    status: 'completed',
    description: 'Shifted security left by integrating automated security scanners, vulnerability management, and compliance checks into CI/CD pipelines.',
    responsibilities: [
      'SAST, DAST, dependency & container vulnerability scanning in CI/CD',
      'Static code analysis & secret detection automation',
      'Infrastructure security hardening & compliance controls',
      'Vulnerability triage & remediation with development teams',
    ],
    technologies: ['GitHub Actions', 'SAST', 'DAST', 'Docker', 'DevSecOps', 'Container Security'],
  },
];

export const education = [
  {
    degree: 'BSc (Hons) Computer Science',
    institution: 'University of Bedfordshire / SLIIT CityUNI',
    period: '2023 — Present',
    focus: 'DevOps, Cloud Architecture, Full-Stack Development',
  },
];

export default experience;
