'use client';

import { useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  tag?: string;
  projects?: string;
}

interface SkillCategory {
  title: string;
  level: string;
  skills: Skill[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    title: 'BACKEND_SYSTEMS',
    level: 'ADVANCED',
    skills: [
      { name: '.NET Core / C#', level: 90, tag: 'CORE', projects: 'Enterprise Apps' },
      { name: 'Python / Django 5', level: 90, tag: 'CORE', projects: 'PeakTrack, E-Commerce' },
      { name: 'Node.js / Next.js API', level: 88, projects: 'Zarcz Fitness, Portfolios' },
      { name: 'Entity Framework Core', level: 88, projects: 'Enterprise DBs' },
      { name: 'REST API / Celery', level: 85, projects: 'Async Event Processing' },
      { name: 'CQRS / Mediator', level: 80, projects: 'Backend Services' },
      { name: 'XUnit / JWT Auth', level: 75 },
    ]
  },
  {
    title: 'FRONTEND_DEV',
    level: 'ADVANCED',
    skills: [
      { name: 'Angular 15+', level: 88, tag: 'CORE', projects: 'Enterprise UI' },
      { name: 'React / Next.js 16', level: 92, tag: 'CORE', projects: 'Web Platforms & SPAs' },
      { name: 'React Native / Expo', level: 88, tag: 'CORE', projects: 'Mobile Apps' },
      { name: 'TypeScript', level: 90, projects: 'Type Safety & Architecture' },
      { name: 'Tailwind / Framer Motion', level: 85, projects: 'Dynamic UI & Animation' },
      { name: 'HTML5/CSS3', level: 85 },
      { name: 'WebGL / Three.js', level: 75, projects: '3D Portfolios' },
      { name: 'Jest Testing', level: 70 },
    ]
  },
  {
    title: 'INFRASTRUCTURE',
    level: 'ADVANCED',
    skills: [
      { name: 'MS SQL Server', level: 85, tag: 'CORE', projects: 'Enterprise DBs' },
      { name: 'PostgreSQL / Prisma', level: 85, tag: 'CORE', projects: 'Relational DBs' },
      { name: 'Local-First Storage', level: 90, projects: 'AsyncStorage & Privacy' },
      { name: 'CI/CD Pipelines', level: 80, projects: 'SonarQube Integration' },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Agile / Scrum', level: 90 },
      { name: 'Serverless / Edge Deploy', level: 88, projects: 'Vercel, Netlify' },
      { name: 'Performance Opt.', level: 90, projects: 'Lighthouse 95+ Scores' },
    ]
  }
];

const springConfig = { damping: 20, stiffness: 300 };

// Custom Framer Motion Tilt Card
function TiltCard({ category, idx }: { category: SkillCategory, idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map motion values to tilt degrees (max 10 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: idx * 0.1, ...springConfig }}
      className="perspective-1000"
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full bg-bg-surface border-2 border-border p-6 sm:p-8 dot-matrix-surface-led relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        }}
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-between items-start mb-8">
            <h3 className="font-pixel text-[11px] leading-loose text-accent">
              {category.title}
            </h3>
            <span className="pixel-label text-text-muted">
              LVL:{category.level}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {category.skills.map((skill, i) => (
              <div key={skill.name} className="group relative">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-text-primary group-hover:text-accent transition-colors">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="pixel-tag border border-accent text-accent text-[5px]">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Framer Motion LED Bar */}
                <div className="led-bar-track group-hover:shadow-[0_0_8px_var(--accent-glow)] transition-shadow overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, type: 'spring' as const, bounce: 0.4 }}
                    className="h-full relative"
                    style={{
                      background: 'repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 6px, rgba(191, 95, 255, 0.15) 6px, rgba(191, 95, 255, 0.15) 8px)',
                      boxShadow: '0 0 8px var(--accent-glow)'
                    }}
                  />
                </div>
                
                {/* Hover Tooltip for projects */}
                {skill.projects && (
                  <div className="absolute top-[-30px] right-0 bg-bg-elevated border border-border px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-mono text-[10px] text-text-secondary whitespace-nowrap">
                    Used in: {skill.projects}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechnicalArsenal() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={springConfig}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            <h2 className="section-label m-0">SYS_CAPABILITY</h2>
          </div>
          <h3 className="pixel-heading-lg text-text-primary m-0">TECHNICAL_ARSENAL</h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_DATA.map((category, idx) => (
            <TiltCard key={category.title} category={category} idx={idx} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
