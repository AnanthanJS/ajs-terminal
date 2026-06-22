import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// True bitmap dot-matrix font — used for all headings/labels
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Ananthakrishnan J S — Full-Stack Software Developer",
  description:
    "Portfolio of Ananthakrishnan J S, a Full-Stack Software Developer with 2+ years of experience in .NET Core, C#, Angular 15+, and MS SQL. Proficient in REST APIs, Entity Framework Core, CQRS, and Mediator patterns.",
  keywords: [
    "Ananthakrishnan",
    "Full-Stack Developer",
    ".NET Core",
    "C#",
    "Angular",
    "React",
    "MS SQL",
    "Entity Framework",
    "portfolio",
  ],
  authors: [{ name: "Ananthakrishnan J S" }],
  openGraph: {
    title: "Ananthakrishnan J S — Full-Stack Software Developer",
    description:
      "Portfolio of Ananthakrishnan J S — .NET Core & Angular specialist, full-stack developer, enterprise applications builder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} antialiased font-sans bg-bg-base text-text-primary min-h-screen`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('ajs-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                const themes = {
                  dark: { '--bg-base': '#080808', '--bg-surface': '#0e0e0e', '--bg-elevated': '#141414', '--text-primary': '#e8e8e8', '--text-secondary': '#909090', '--text-muted': '#484848', '--accent': '#bf5fff', '--accent-dim': 'rgba(191,95,255,0.12)', '--accent-glow': 'rgba(191,95,255,0.35)', '--border': 'rgba(191,95,255,0.22)', '--border-subtle': 'rgba(255,255,255,0.05)', '--matrix-color': '191,95,255', '--crt-tint': 'rgba(50,0,80,0.04)', '--vignette': 'rgba(0,0,0,0.7)' },
                  amber: { '--bg-base': '#0d0700', '--bg-surface': '#150c00', '--bg-elevated': '#1c1100', '--text-primary': '#ffb400', '--text-secondary': '#cc8800', '--text-muted': '#664400', '--accent': '#ffb400', '--accent-dim': 'rgba(255,180,0,0.12)', '--accent-glow': 'rgba(255,180,0,0.4)', '--border': 'rgba(255,180,0,0.3)', '--border-subtle': 'rgba(255,180,0,0.07)', '--matrix-color': '255,180,0', '--crt-tint': 'rgba(80,40,0,0.05)', '--vignette': 'rgba(0,0,0,0.75)' },
                  green: { '--bg-base': '#000d00', '--bg-surface': '#001100', '--bg-elevated': '#001800', '--text-primary': '#00ff41', '--text-secondary': '#00cc33', '--text-muted': '#006618', '--accent': '#00ff41', '--accent-dim': 'rgba(0,255,65,0.1)', '--accent-glow': 'rgba(0,255,65,0.35)', '--border': 'rgba(0,255,65,0.25)', '--border-subtle': 'rgba(0,255,65,0.06)', '--matrix-color': '0,255,65', '--crt-tint': 'rgba(0,50,0,0.06)', '--vignette': 'rgba(0,0,0,0.8)' },
                  light: { '--bg-base': '#f0f0f0', '--bg-surface': '#e4e4e4', '--bg-elevated': '#d8d8d8', '--text-primary': '#111111', '--text-secondary': '#444444', '--text-muted': '#888888', '--accent': '#6600cc', '--accent-dim': 'rgba(102,0,204,0.1)', '--accent-glow': 'rgba(102,0,204,0.25)', '--border': 'rgba(102,0,204,0.3)', '--border-subtle': 'rgba(0,0,0,0.1)', '--matrix-color': '102,0,204', '--crt-tint': 'rgba(0,0,0,0.01)', '--vignette': 'rgba(0,0,0,0.2)' },
                  blue: { '--bg-base': '#00001a', '--bg-surface': '#000022', '--bg-elevated': '#00002c', '--text-primary': '#00b8ff', '--text-secondary': '#0080cc', '--text-muted': '#004066', '--accent': '#00b8ff', '--accent-dim': 'rgba(0,184,255,0.1)', '--accent-glow': 'rgba(0,184,255,0.35)', '--border': 'rgba(0,184,255,0.25)', '--border-subtle': 'rgba(0,184,255,0.06)', '--matrix-color': '0,184,255', '--crt-tint': 'rgba(0,0,60,0.05)', '--vignette': 'rgba(0,0,0,0.8)' },
                  sunset: { '--bg-base': '#0d0005', '--bg-surface': '#14000a', '--bg-elevated': '#1a0010', '--text-primary': '#ff8040', '--text-secondary': '#cc5520', '--text-muted': '#662200', '--accent': '#ff3d6e', '--accent-dim': 'rgba(255,61,110,0.12)', '--accent-glow': 'rgba(255,61,110,0.35)', '--border': 'rgba(255,61,110,0.25)', '--border-subtle': 'rgba(255,61,110,0.06)', '--matrix-color': '255,61,110', '--crt-tint': 'rgba(60,0,20,0.05)', '--vignette': 'rgba(0,0,0,0.75)' }
                };
                if (themes[theme]) {
                  Object.entries(themes[theme]).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
                }
              } catch (e) {}
            `
          }}
        />
        
        {/* SVG Filters for CRT effects */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="crt-aberration">
            <feOffset dx="0.5" dy="0" in="SourceGraphic" result="red-shift" />
            <feOffset dx="-0.5" dy="0" in="SourceGraphic" result="blue-shift" />
            <feOffset dx="0" dy="0" in="SourceGraphic" result="green-shift" />
            <feColorMatrix in="red-shift" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feColorMatrix in="blue-shift" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feColorMatrix in="green-shift" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feBlend mode="screen" in="red" in2="blue" result="rb" />
            <feBlend mode="screen" in="rb" in2="green" result="final" />
            <feBlend mode="normal" in="final" in2="SourceGraphic" />
          </filter>
        </svg>

        {children}
      </body>
    </html>
  );
}
