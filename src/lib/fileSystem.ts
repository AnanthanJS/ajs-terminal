import { PROJECTS } from '@/data/projects';

export interface FSFile {
  type: 'file';
  size: number;
  content: string;
  permissions: string;
}

export interface FSDir {
  type: 'dir';
  children: Record<string, FSFile | FSDir>;
  permissions: string;
}

export type FSEntry = FSFile | FSDir;

const generatedProjects: Record<string, FSEntry> = {};
PROJECTS.forEach(project => {
  const fileName = `${project.ticket.toLowerCase()}.md`;
  generatedProjects[fileName] = {
    type: 'file',
    permissions: '-rw-r--r--',
    size: project.terminalContent.length,
    content: project.terminalContent
  };
});

export const FILESYSTEM: FSDir = {
  type: 'dir',
  permissions: 'drwxr-xr-x',
  children: {
    'README.md': {
      type: 'file', permissions: '-rw-r--r--', size: 512,
      content: `# AJS-Terminal v2.0.0

Welcome to the interactive portfolio of Ananthakrishnan J S.
Full-Stack Application Engineer | Python/Django Specialist

## Quick Navigation
- Type \`help\` to see all available commands
- Type \`projects\` to list all projects
- Type \`skills\` to see the technical arsenal
- Type \`matrix\` for a surprise
- Type \`about\` to learn more

## System Info
OS: AJS-OS 2.0 (Based on Portfolio-Linux)
Kernel: experience-1yr
Shell: ajs-shell 2.0.0
`,
    },
    '.bashrc': {
      type: 'file', permissions: '-rw-r--r--', size: 128,
      content: `# AJS Shell Configuration
alias ll='ls -la'
alias projects='cd ~/portfolio/projects && ls'
alias work='open'
PS1='ajs@terminal:\\w $ '
export EDITOR=vim
export THEME=dark
`,
    },
    'portfolio': {
      type: 'dir', permissions: 'drwxr-xr-x',
      children: {
        'projects': {
          type: 'dir', permissions: 'drwxr-xr-x',
          children: generatedProjects,
        },
        'skills': {
          type: 'dir', permissions: 'drwxr-xr-x',
          children: {
            'backend.json': {
              type: 'file', permissions: '-rw-r--r--', size: 340,
              content: JSON.stringify({
                category: 'Backend',
                level: 'Advanced',
                skills: {
                  Python: { level: 90, tag: 'CORE' },
                  Django: { level: 88, tag: 'CORE' },
                  'Django REST Framework': { level: 85, tag: 'CORE' },
                  Flask: { level: 70 },
                  'C# / .NET': { level: 65 },
                  'REST API Design': { level: 82 },
                },
              }, null, 2),
            },
            'frontend.json': {
              type: 'file', permissions: '-rw-r--r--', size: 296,
              content: JSON.stringify({
                category: 'Frontend',
                level: 'Intermediate',
                skills: {
                  'JavaScript / TypeScript': { level: 78 },
                  React: { level: 75 },
                  Angular: { level: 68 },
                  'HTML5 / CSS3': { level: 85 },
                  'Tailwind CSS': { level: 72 },
                },
              }, null, 2),
            },
            'infra.json': {
              type: 'file', permissions: '-rw-r--r--', size: 280,
              content: JSON.stringify({
                category: 'Database & Infrastructure',
                level: 'Intermediate',
                skills: {
                  MySQL: { level: 80 },
                  'SQL Schema Design': { level: 78 },
                  'AWS S3': { level: 70 },
                  'Git / GitHub': { level: 85 },
                  'Linux / SSH': { level: 65 },
                },
              }, null, 2),
            },
          },
        },
        'about': {
          type: 'dir', permissions: 'drwxr-xr-x',
          children: {
            'bio.md': {
              type: 'file', permissions: '-rw-r--r--', size: 660,
              content: `# About Ananthakrishnan J S

Full-Stack Software Developer with 2+ years of production experience.
Primary strength: enterprise full-stack development and systematic debugging.

## Core Strengths
- Entity Framework Core mastery (complex queries, migrations)
- Architecture (Repository & CQRS patterns, Mediator)
- Full-stack bridge (.NET APIs + Angular/React frontends)
- Code Quality (XUnit, Jest, CI/CD with SonarQube)

## Philosophy
"When something breaks in production, I trace it methodically:
EF Core query → Mediator pipeline → service layer → Angular UI.
Every time."

## Background
Based in India | Open to remote and hybrid roles
Focused on building systems that are correct, maintainable, and fast.
`,
            },
            'contact.json': {
              type: 'file', permissions: '-rw-r--r--', size: 192,
              content: JSON.stringify({
                name: 'Ananthakrishnan J S',
                role: 'Full-Stack Application Engineer',
                email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || 'ananthakrishnanajs@gmail.com',
                github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/AnanthanJS',
                linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/ananthakrishnan-j-s',
                status: 'AVAILABLE',
                response_time: '< 24 hours',
              }, null, 2),
            },
          },
        },
      },
    },
  },
};

// ── FS navigation utilities ──────────────────────────────────────────────────

export function resolvePath(cwd: string, input: string): string {
  if (input === '~' || input === '') return '~';
  if (input.startsWith('~/')) return input;
  if (input === '..') {
    const parts = cwd.split('/').filter(Boolean);
    if (parts.length <= 1) return '~';
    parts.pop();
    return parts.join('/') || '~';
  }
  if (input === '.') return cwd;
  if (input.startsWith('/')) return `~${input}`;
  return `${cwd}/${input}`.replace('//', '/');
}

function getNode(path: string): FSEntry | null {
  const normalized = path.replace(/^~\/?/, '');
  if (!normalized) return FILESYSTEM;
  const parts = normalized.split('/').filter(Boolean);
  let node: FSEntry = FILESYSTEM;
  for (const part of parts) {
    if (node.type !== 'dir') return null;
    const child: FSEntry | undefined = node.children[part];
    if (!child) return null;
    node = child;
  }
  return node;
}

export function lsPath(path: string): string[] | null {
  const node = getNode(path);
  if (!node || node.type !== 'dir') return null;
  return Object.keys(node.children);
}

export function catPath(path: string): string | null {
  const node = getNode(path);
  if (!node || node.type !== 'file') return null;
  return node.content;
}

export function isDir(path: string): boolean {
  const node = getNode(path);
  return node?.type === 'dir';
}

export function isFile(path: string): boolean {
  const node = getNode(path);
  return node?.type === 'file';
}

export function getEntryMeta(path: string, name: string): { type: 'file' | 'dir'; size: number; permissions: string } | null {
  const node = getNode(path);
  if (!node || node.type !== 'dir') return null;
  const child: FSEntry | undefined = node.children[name];
  if (!child) return null;
  return {
    type: child.type,
    size: child.type === 'file' ? child.size : 0,
    permissions: child.permissions,
  };
}

export function buildTree(path: string, prefix = '', depth = 0): string[] {
  if (depth > 3) return [];
  const node = getNode(path);
  if (!node || node.type !== 'dir') return [];
  const lines: string[] = [];
  const entries = Object.keys(node.children);
  entries.forEach((name, i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const child: FSEntry = node.children[name] as FSEntry;
    lines.push(`${prefix}${connector}${name}${child.type === 'dir' ? '/' : ''}`);
    if (child.type === 'dir') {
      const ext = buildTree(`${path}/${name}`, prefix + (isLast ? '    ' : '│   '), depth + 1);
      lines.push(...ext);
    }
  });
  return lines;
}
