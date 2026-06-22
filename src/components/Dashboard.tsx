'use client';

import { useEffect, useState, useRef } from 'react';
import { audioEngine } from '@/lib/audioEngine';

interface Props {
  onClose: () => void;
  startTime: number;
}

export default function Dashboard({ onClose, startTime }: Props) {
  const [uptime, setUptime] = useState(0);
  const [cpu, setCpu] = useState(65);
  const [mem, setMem] = useState(42);
  const [net, setNet] = useState(12);
  const [closing, setClosing] = useState(false);
  
  // Simulated live metrics
  useEffect(() => {
    audioEngine.play('windowOpen');
    
    const iv = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
      setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10))));
      setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() * 6 - 3))));
      if (Math.random() > 0.7) setNet(prev => prev + Math.floor(Math.random() * 5));
    }, 1000);
    
    return () => clearInterval(iv);
  }, [startTime]);

  const close = () => {
    setClosing(true);
    audioEngine.play('windowClose');
    setTimeout(onClose, 300);
  };

  const MetricGauge = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', border: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span className="pixel-label" style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, transition: 'width 0.5s ease-out' }} />
      </div>
    </div>
  );

  return (
    <div
      className="dot-matrix-surface relative z-10"
      style={{
        position: 'fixed',
        inset: '40px',
        zIndex: 4000,
        background: 'color-mix(in srgb, var(--bg-elevated) 98%, transparent)',
        border: '2px solid var(--accent)',
        clipPath: 'polygon(0 16px, 16px 16px, 16px 0, calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px))',
        boxShadow: '0 0 100px var(--bg-elevated)',
        display: 'flex',
        flexDirection: 'column',
        opacity: closing ? 0 : 1,
        transform: closing ? 'scale(0.98)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          background: 'var(--accent-dim)',
          borderBottom: '2px solid var(--accent)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 12, height: 12, background: 'var(--accent)', animation: 'led-blink 2s infinite' }} />
          <h2 className="pixel-heading-lg" style={{ color: 'var(--accent)', margin: 0 }}>HACKER_DASHBOARD</h2>
        </div>
        <button onClick={close} className="pixel-btn-ghost">CLOSE [X]</button>
      </div>

      {/* Dashboard Body */}
      <div className="dot-matrix-surface-led" style={{ flex: 1, padding: '32px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', overflowY: 'auto' }}>
        
        {/* Left Column: Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', border: '2px solid var(--border)', background: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)' }}>
            <div className="pixel-label" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>SYSTEM.STATUS</div>
            <div className="pixel-heading-sm" style={{ color: '#28ca41', marginBottom: '8px' }}>● ALL SYSTEMS NOMINAL</div>
            <div className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>UPTIME: {Math.floor(uptime / 60)}m {uptime % 60}s</div>
            <div className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>ACTIVE TX: {net} kbps</div>
          </div>

          <MetricGauge label="CPU (DESIGN UTILIZATION)" value={cpu} color="var(--accent)" />
          <MetricGauge label="MEM (COMPLEXITY INDEX)" value={mem} color="#00e5ff" />
          <MetricGauge label="NET (CLIENT PROJECTS)" value={net * 2} color="#28ca41" />
        </div>

        {/* Right Column: Logs / Graph placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ flex: 1, border: '2px solid var(--border)', background: 'color-mix(in srgb, var(--bg-surface) 60%, transparent)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 opacity-10" style={{ background: 'repeating-linear-gradient(45deg, var(--accent) 0px, var(--accent) 2px, transparent 2px, transparent 10px)' }} />
            <div className="pixel-label" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>PROCESS.LIST</div>
            <table style={{ width: '100%', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ paddingBottom: '8px' }}>PID</th>
                  <th style={{ paddingBottom: '8px' }}>USER</th>
                  <th style={{ paddingBottom: '8px' }}>%CPU</th>
                  <th style={{ paddingBottom: '8px' }}>COMMAND</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-primary)' }}>
                <tr><td style={{ paddingTop: '8px' }}>001</td><td style={{ paddingTop: '8px' }}>ajs</td><td style={{ paddingTop: '8px', color: '#28ca41' }}>24.5</td><td style={{ paddingTop: '8px' }}>/usr/bin/dotnet-run</td></tr>
                <tr><td style={{ paddingTop: '8px' }}>002</td><td style={{ paddingTop: '8px' }}>ajs</td><td style={{ paddingTop: '8px', color: '#28ca41' }}>18.2</td><td style={{ paddingTop: '8px' }}>next-dev --turbo</td></tr>
                <tr><td style={{ paddingTop: '8px' }}>003</td><td style={{ paddingTop: '8px' }}>ajs</td><td style={{ paddingTop: '8px', color: 'var(--accent)' }}>45.0</td><td style={{ paddingTop: '8px' }}>mysql_daemon</td></tr>
                <tr><td style={{ paddingTop: '8px' }}>004</td><td style={{ paddingTop: '8px' }}>ajs</td><td style={{ paddingTop: '8px' }}>0.1</td><td style={{ paddingTop: '8px' }}>vim ~/portfolio/README.md</td></tr>
              </tbody>
            </table>

            {/* Fake graph grid lines */}
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, var(--border-subtle) 19px, var(--border-subtle) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, var(--border-subtle) 19px, var(--border-subtle) 20px)',
                opacity: 0.3, zIndex: 0,
              }}
            />
            {/* Fake animated line graph */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', width: '100%', zIndex: 1, overflow: 'visible' }}>
              <polyline
                points={`0,80 50,${100 - cpu} 150,${100 - mem} 250,${100 - cpu + 20} 350,${100 - mem - 10} 450,${100 - cpu - 10} 600,${100 - cpu}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                style={{ transition: 'all 0.5s ease-out' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
