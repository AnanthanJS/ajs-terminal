import {
  resolvePath, lsPath, catPath, isDir, isFile,
  getEntryMeta, buildTree,
} from './fileSystem';
import { THEME_NAMES, ThemeName } from './themes';

export type OutputType = 'cmd' | 'info' | 'success' | 'error' | 'accent' | 'dim' | 'raw' | 'spacer';

export interface OutputLine {
  type: OutputType;
  text: string;
  id?: string;
}

export interface CommandContext {
  cwd: string;
  setCwd: (cwd: string) => void;
  setMatrix: (active: boolean) => void;
  setTheme: (theme: ThemeName) => void;
  clearTerminal: () => void;
  openDashboard: () => void;
  startTime: number;
}

type CommandHandler = (args: string[], ctx: CommandContext) => OutputLine[];

function lines(...items: [OutputType, string][]): OutputLine[] {
  return items.map(([type, text]) => ({ type, text }));
}
function spacer(): OutputLine { return { type: 'spacer', text: '' }; }
function info(text: string): OutputLine { return { type: 'info', text }; }
function success(text: string): OutputLine { return { type: 'success', text }; }
function error(text: string): OutputLine { return { type: 'error', text }; }
function accent(text: string): OutputLine { return { type: 'accent', text }; }
function dim(text: string): OutputLine { return { type: 'dim', text }; }

// ── Command registry ─────────────────────────────────────────────────────────

const COMMANDS: Record<string, CommandHandler> = {

  help: () => [
    spacer(),
    accent('╔══════════════════════════════════════════════════╗'),
    accent('║         AJS-TERMINAL v2.0  —  HELP SYSTEM        ║'),
    accent('╚══════════════════════════════════════════════════╝'),
    spacer(),
    accent('  NAVIGATION'),
    info('  ls [path]          list directory contents'),
    info('  cd <path>          change directory'),
    info('  pwd                print working directory'),
    info('  cat <file>         view file contents'),
    info('  tree [path]        directory tree view'),
    spacer(),
    accent('  PORTFOLIO'),
    info('  whoami             display user profile'),
    info('  about              show about section'),
    info('  skills             display technical skills'),
    info('  projects           list all projects'),
    info('  open <id>          launch project window (1-4)'),
    info('  contact            show contact information'),
    spacer(),
    accent('  SYSTEM'),
    info('  clear / cls        clear terminal screen'),
    info('  history            show command history'),
    info('  echo <text>        echo text to terminal'),
    info('  date               current date and time'),
    info('  uptime             time since system boot'),
    info('  banner             display ASCII banner'),
    info('  motd               message of the day'),
    info('  neofetch           system information'),
    info('  theme <name>       switch theme'),
    info('  dashboard          open hacker dashboard'),
    spacer(),
    accent('  THEMES AVAILABLE'),
    info('  dark  amber  green  light  blue  sunset'),
    spacer(),
    accent('  EASTER EGGS'),
    dim('  ??? ??? ???  (keep exploring...)'),
    spacer(),
  ],

  ls: (args, ctx) => {
    const targetPath = args[0] ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
    const entries = lsPath(targetPath);
    if (!entries) return [error(`ls: cannot access '${args[0] || ''}': No such directory`)];

    if (entries.length === 0) return [dim('(empty directory)')];

    const result: OutputLine[] = [spacer()];
    const header = `total ${entries.length}`;
    result.push(dim(header));

    entries.forEach(name => {
      const meta = getEntryMeta(targetPath, name);
      if (!meta) return;
      const isDirectory = meta.type === 'dir';
      const sizeStr = isDirectory ? '-' : `${meta.size}`;
      const line = `${meta.permissions}  ${sizeStr.padStart(6)}  ${name}${isDirectory ? '/' : ''}`;
      result.push({ type: isDirectory ? 'accent' : 'info', text: line });
    });

    result.push(spacer());
    return result;
  },

  cd: (args, ctx) => {
    if (!args[0]) {
      ctx.setCwd('~');
      return [info('Changed to home directory')];
    }
    const target = resolvePath(ctx.cwd, args[0]);
    if (!isDir(target)) {
      return [error(`cd: '${args[0]}': No such directory`)];
    }
    ctx.setCwd(target);
    return [dim(`> ${target}`)];
  },

  pwd: (_, ctx) => [info(ctx.cwd.replace('~', '/home/ajs'))],

  cat: (args, ctx) => {
    if (!args[0]) return [error('cat: missing operand')];
    const filePath = resolvePath(ctx.cwd, args[0]);
    const content = catPath(filePath);
    if (content === null) {
      if (isDir(filePath)) return [error(`cat: '${args[0]}': Is a directory`)];
      return [error(`cat: '${args[0]}': No such file`)];
    }
    const result: OutputLine[] = [spacer()];
    content.split('\n').forEach(line => {
      const type: OutputType = line.startsWith('#') ? 'accent'
        : line.startsWith('>') ? 'success'
        : line.startsWith('[') ? 'info'
        : line.trim() === '' ? 'spacer'
        : 'info';
      result.push({ type, text: line });
    });
    result.push(spacer());
    return result;
  },

  tree: (args, ctx) => {
    const targetPath = args[0] ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
    if (!isDir(targetPath)) return [error(`tree: '${targetPath}': Not a directory`)];
    const treeName = targetPath.split('/').pop() || '~';
    const result: OutputLine[] = [spacer(), accent(`${treeName}/`)];
    buildTree(targetPath).forEach(line => result.push(info(line)));
    result.push(spacer());
    return result;
  },

  whoami: () => [
    spacer(),
    accent('┌─────────────────────────────────────────┐'),
    accent('│         USER PROFILE                     │'),
    accent('└─────────────────────────────────────────┘'),
    spacer(),
    info('  NAME     Ananthakrishnan J S'),
    info('  ROLE     Full-Stack Software Developer'),
    info('  FOCUS    .NET · Angular · React · SQL'),
    info('  XP       2+ years enterprise applications'),
    info('  STATUS   ● AVAILABLE'),
    spacer(),
    dim('  Type "about" for full bio or "skills" for tech stack'),
    spacer(),
  ],

  about: () => [
    spacer(),
    accent('  ANANTHAKRISHNAN J S'),
    accent('  ─────────────────────────────────────────'),
    spacer(),
    info('  Full-Stack Software Developer with 2+ years of'),
    info('  hands-on production experience. Primary expertise'),
    info('  in .NET Core/C# systems and Angular/React UI components,'),
    info('  with working knowledge across the full web stack.'),
    spacer(),
    accent('  CORE STRENGTHS'),
    success('  ✓ Entity Framework Core & MS SQL DB design'),
    success('  ✓ Backend architecture — Repository & CQRS patterns'),
    success('  ✓ Unit testing — XUnit & Jest with CI/CD pipelines'),
    success('  ✓ Full-stack bridge — .NET APIs + Angular/React frontends'),
    spacer(),
    dim('  Type "cat ~/portfolio/about/bio.md" for full bio'),
    spacer(),
  ],

  skills: () => [
    spacer(),
    accent('  TECHNICAL ARSENAL — SKILL MATRIX'),
    accent('  ═══════════════════════════════════════'),
    spacer(),
    accent('  BACKEND                              LEVEL'),
    info('  .NET Core / C# ···················· 90%  [CORE]'),
    info('  Entity Framework Core ············· 88%  [CORE]'),
    info('  REST API Design ··················· 85%  [CORE]'),
    info('  CQRS / Mediator ··················· 80%'),
    info('  XUnit Testing ····················· 75%'),
    spacer(),
    accent('  FRONTEND                             LEVEL'),
    info('  Angular 15+ ······················· 88%  [CORE]'),
    info('  React ····························· 85%  [CORE]'),
    info('  TypeScript ························ 85%'),
    info('  HTML5 / CSS3 ····················· 85%'),
    info('  Jest Testing ····················· 70%'),
    spacer(),
    accent('  DATABASE & INFRA                     LEVEL'),
    info('  MS SQL Server ····················· 85%'),
    info('  Git / GitHub ····················· 85%'),
    info('  CI/CD Pipelines ··················· 80%'),
    info('  Agile / Scrum ····················· 90%'),
    info('  SonarQube ························· 75%'),
    spacer(),
    dim('  Type "cat ~/portfolio/skills/backend.json" for details'),
    spacer(),
  ],

  projects: () => [
    spacer(),
    accent('  DEPLOYMENT LOG — ACTIVE PROJECTS'),
    accent('  ═══════════════════════════════════════'),
    spacer(),
    success('  [1] TKT-001  Enterprise Management System DEPLOYED'),
    info('      .NET Core · C# · Angular 15+ · MS SQL'),
    spacer(),
    success('  [2] TKT-002  Secure Access & Dashboard    MAINTAINED'),
    info('      .NET Core · Angular 15+ · JWT Auth · MS SQL'),
    spacer(),
    success('  [3] TKT-003  Agile Web App Suite          DEPLOYED'),
    info('      .NET · JavaScript · TypeScript · MS SQL'),
    spacer(),
    success('  [4] TKT-004  Legacy Hospital Management   INTEGRATED'),
    info('      .NET · C# · Entity Framework · MS SQL'),
    spacer(),
    dim('  Run "open 1" to launch project window'),
    dim('  Run "cat ~/portfolio/projects/ecommerce/README.md" for details'),
    spacer(),
  ],

  open: () => [
    spacer(),
    error(`  X ERR_GUI_REQUIRED`),
    dim('  Terminal window manager disabled.'),
    success('  Please scroll to the Projects gallery to view details.'),
    spacer(),
  ],

  contact: () => [
    spacer(),
    accent('  OPEN CHANNEL — CONTACT'),
    accent('  ══════════════════════════════'),
    spacer(),
    info(`  EMAIL     ${process.env.NEXT_PUBLIC_EMAIL_ADDRESS || 'ananthakrishnanajs@gmail.com'}`),
    info(`  GITHUB    ${(process.env.NEXT_PUBLIC_GITHUB_URL || 'github.com/AnanthanJS').replace(/^https?:\/\//, '')}`),
    info(`  LINKEDIN  ${(process.env.NEXT_PUBLIC_LINKEDIN_URL || 'linkedin.com/in/ananthakrishnan-js').replace(/^https?:\/\//, '')}`),
    spacer(),
    success('  STATUS  ● AVAILABLE'),
    info('  RESPONSE TIME  < 24 hours'),
    spacer(),
    dim('  Scroll to contact section or type "cat ~/portfolio/about/contact.json"'),
    spacer(),
  ],

  clear: (_, ctx) => { ctx.clearTerminal(); return []; },
  cls: (_, ctx) => { ctx.clearTerminal(); return []; },

  history: () => [
    spacer(),
    dim('  (History is shown inline in the terminal — scroll up)'),
    spacer(),
  ],

  echo: (args) => [info(args.join(' ') || '')],

  date: () => {
    const now = new Date();
    return [
      info(now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })),
      info(now.toLocaleTimeString('en-US', { hour12: false })),
    ];
  },

  uptime: (_, ctx) => {
    const seconds = Math.floor((Date.now() - ctx.startTime) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return [info(`  System uptime: ${mins}m ${secs}s`)];
  },

  banner: () => [
    spacer(),
    accent('   █████╗      ██╗███████╗'),
    accent('  ██╔══██╗     ██║██╔════╝'),
    accent('  ███████║     ██║███████╗'),
    accent('  ██╔══██║██   ██║╚════██║'),
    accent('  ██║  ██║╚█████╔╝███████║'),
    accent('  ╚═╝  ╚═╝ ╚════╝ ╚══════╝'),
    spacer(),
    dim('  Ananthakrishnan J S — Terminal v2.0.0'),
    spacer(),
  ],

  motd: () => [
    spacer(),
    accent('  ╔══════════════════════════════════════════════╗'),
    accent('  ║   WELCOME TO AJS-TERMINAL v2.0.0             ║'),
    accent('  ╚══════════════════════════════════════════════╝'),
    spacer(),
    info('  This is not a portfolio.'),
    info('  This is an interactive developer experience'),
    info('  that happens to contain my work.'),
    spacer(),
    success('  Tip: Try "ls ~/portfolio/projects" to explore'),
    success('  Tip: Try "matrix" for something interesting'),
    success('  Tip: Try "theme amber" to change the display'),
    spacer(),
  ],

  neofetch: (_, ctx) => {
    const now = new Date();
    return [
      spacer(),
      accent('  ajs@terminal'),
      dim('  ─────────────────────────────────────'),
      info(`  OS:        AJS-OS 2.0 (Portfolio-Linux)`),
      info(`  Host:      Developer Workstation`),
      info(`  Kernel:    experience-1yr-stable`),
      info(`  Shell:     ajs-shell 2.0.0`),
      info(`  Terminal:  AJS-Terminal v2.0.0`),
      info(`  CWD:       ${ctx.cwd}`),
      info(`  Date:      ${now.toLocaleDateString()}`),
      info(`  Uptime:    ${Math.floor((Date.now() - ctx.startTime) / 1000)}s`),
      spacer(),
      accent('  Skills'),
      info('  ██████████ .NET Core / C#   90%'),
      info('  █████████░ Angular 15+      88%'),
      info('  █████████░ MS SQL Server    85%'),
      spacer(),
    ];
  },

  theme: (args, ctx) => {
    const name = args[0]?.toLowerCase() as ThemeName;
    if (!name || !THEME_NAMES.includes(name)) {
      return [
        error(`theme: invalid theme '${args[0] || ''}'`),
        info(`  Available: ${THEME_NAMES.join(' | ')}`),
      ];
    }
    ctx.setTheme(name);
    return [
      spacer(),
      success(`  Theme switched to: ${name.toUpperCase()}`),
      dim('  Type "theme dark" to return to default'),
      spacer(),
    ];
  },

  dashboard: (_, ctx) => {
    ctx.openDashboard();
    return [
      spacer(),
      success('  ▶ Opening HACKER DASHBOARD...'),
      dim('  System metrics now streaming.'),
      spacer(),
    ];
  },

  matrix: (_, ctx) => {
    ctx.setMatrix(true);
    return [
      spacer(),
      success('  ▶ INITIATING MATRIX SEQUENCE...'),
      dim('  Press any key or click to exit.'),
      spacer(),
    ];
  },

  // Easter eggs
  sudo: (args) => {
    if (args[0] === 'rm' && args[1] === '-rf') {
      return [
        error('  Nice try.'),
        dim('  The portfolio lives on.'),
      ];
    }
    return [
      error('  [sudo] password for ajs: '),
      error('  Sorry, try again.'),
      error('  Sorry, try again.'),
      error('  ajs is not in the sudoers file. This incident will be reported.'),
    ];
  },

  exit: () => [
    spacer(),
    dim('  There is no escape from the portfolio.'),
    success('  (But you can close the tab if you really want to)'),
    spacer(),
  ],

  hack: () => [
    spacer(),
    success('  ACCESS GRANTED ▒▒▒▒▒▒▒▒ 100%'),
    accent('  Hacking mainframe...'),
    info('  Bypassing firewall... OK'),
    info('  Decrypting database... OK'),
    success('  Congratulations! You are in.'),
    dim('  (Just kidding. But try "matrix" for the real show.)'),
    spacer(),
  ],

  coffee: () => [
    spacer(),
    accent('     ( ('),
    accent('      ) )'),
    accent('    ........'),
    accent('    |      |]'),
    accent('    \\      /'),
    accent('     `----\''),
    spacer(),
    info('  Brewing a fresh cup of caffeine...'),
    success('  ☕ Coffee ready. Code incoming.'),
    spacer(),
  ],

  man: (args) => {
    if (!args[0]) return [info('What manual page do you want?')];
    return [
      spacer(),
      accent(`  MAN — ${args[0].toUpperCase()}`),
      spacer(),
      info(`  Try: ${args[0]} --help`),
      dim('  Or just type "help" to see all commands.'),
      spacer(),
    ];
  },

  ping: (args) => {
    const host = args[0] || 'portfolio';
    return [
      info(`PING ${host}: 56 data bytes`),
      success(`64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.1ms`),
      success(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.1ms`),
      info(`--- ${host} ping statistics ---`),
      info('2 packets transmitted, 2 received, 0% packet loss'),
    ];
  },
};

// Aliases
COMMANDS['ll'] = COMMANDS['ls'];
COMMANDS['quit'] = COMMANDS['exit'];
COMMANDS['clr'] = COMMANDS['clear'];

export const COMMAND_NAMES = Object.keys(COMMANDS).sort();

export function executeCommand(raw: string, ctx: CommandContext): OutputLine[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handler = COMMANDS[cmd];
  if (!handler) {
    return [
      { type: 'error', text: `  command not found: ${cmd}` },
      { type: 'dim', text: '  Type "help" for available commands.' },
    ];
  }

  return handler(args, ctx);
}

export function getCompletions(partial: string): string[] {
  if (!partial) return [];
  return COMMAND_NAMES.filter(c => c.startsWith(partial.toLowerCase()));
}
