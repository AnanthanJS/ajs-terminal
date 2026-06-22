'use client';

import { useState, useRef, useEffect } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { executeCommand, getCompletions, OutputLine, CommandContext } from '@/lib/terminalCommands';

interface Props {
  ctx: CommandContext;
}

export default function TerminalWindow({ ctx }: Props) {
  const [history, setHistory] = useState<OutputLine[]>([
    { type: 'info', text: 'AJS-Terminal v2.0.0 initialized.' },
    { type: 'dim', text: 'Type "help" to see available commands.' },
    { type: 'spacer', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history, input]);

  // Global keydown -> focus input
  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    window.addEventListener('keydown', focus);
    return () => window.removeEventListener('keydown', focus);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      audioEngine.play('commandAccept');
      
      const newCmd = input.trim();
      const userLine: OutputLine = { type: 'cmd', text: `${ctx.cwd.replace('~', 'ajs@terminal:~')} $ ${input}` };
      
      if (!newCmd) {
        setHistory(prev => [...prev, userLine]);
        setInput('');
        return;
      }

      setCmdHistory(prev => [...prev, newCmd]);
      setHistoryIdx(-1);

      // Execute
      const output = executeCommand(newCmd, ctx);
      
      // Since executeCommand is synchronous but we might have cleared the terminal:
      if (newCmd === 'clear' || newCmd === 'cls') {
        // Handled by context, but we also clear local history
        setHistory([]);
      } else {
        setHistory(prev => [...prev, userLine, ...output]);
      }
      
      setInput('');
      
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      audioEngine.play('keypress');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
      audioEngine.play('keypress');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getCompletions(input);
      if (completions.length === 1) {
        setInput(completions[0] + ' ');
        audioEngine.play('keypress');
      } else if (completions.length > 1) {
        audioEngine.play('commandError');
        setHistory(prev => [
          ...prev,
          { type: 'cmd', text: `${ctx.cwd.replace('~', 'ajs@terminal:~')} $ ${input}` },
          { type: 'info', text: completions.join('  ') },
        ]);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      // Ctrl+C
      setHistory(prev => [...prev, { type: 'cmd', text: `${ctx.cwd.replace('~', 'ajs@terminal:~')} $ ${input}^C` }]);
      setInput('');
      audioEngine.play('keypress');
    } else {
      audioEngine.play('keypress');
    }
  };

  return (
    <div
      className="dot-matrix-surface"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '120px auto 40px',
        background: 'var(--bg-elevated)',
        border: '2px solid var(--border)',
        clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        boxShadow: '0 0 60px rgba(0,0,0,0.5), 6px 6px 0 rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '60vh',
        maxHeight: '80vh',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Chrome Title Bar */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '2px solid var(--border-subtle)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <span style={{ width: 10, height: 10, background: '#ff5f57', clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))' }} />
        <span style={{ width: 10, height: 10, background: '#ffbd2e', clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))' }} />
        <span style={{ width: 10, height: 10, background: '#28ca41', clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))' }} />
        <span
          style={{
            flex: 1, height: '2px', margin: '0 12px',
            background: 'repeating-linear-gradient(90deg, var(--border-subtle) 0px, var(--border-subtle) 3px, transparent 3px, transparent 6px)',
          }}
        />
        <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
          ajs@terminal: {ctx.cwd}
        </span>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '13px',
          lineHeight: '1.6',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {history.map((line, i) => {
          if (line.type === 'spacer') return <div key={i} style={{ height: '0.8em' }} />;
          
          let color = 'var(--text-primary)';
          let textShadow = 'none';
          if (line.type === 'cmd') color = 'var(--text-muted)';
          if (line.type === 'accent') { color = 'var(--accent)'; textShadow = '0 0 6px var(--accent-glow)'; }
          if (line.type === 'success') color = '#28ca41';
          if (line.type === 'error') color = '#ff5f57';
          if (line.type === 'dim') color = 'var(--text-muted)';

          return (
            <div key={i} style={{ color, textShadow, whiteSpace: 'pre-wrap' }}>
              {line.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '4px' }}>
          <span style={{ color: 'var(--accent)', marginRight: '8px', textShadow: '0 0 4px var(--accent-glow)' }}>
            {ctx.cwd.replace('~', 'ajs@terminal:~')} $
          </span>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'transparent', // hide real text
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '13px',
                caretColor: 'transparent',
                position: 'absolute',
                top: 0, left: 0,
                zIndex: 2,
              }}
              aria-label="Terminal command input"
            />
            {/* Fake text + block cursor rendering */}
            <div
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '13px',
                pointerEvents: 'none',
                position: 'relative',
                zIndex: 1,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
              aria-hidden="true"
            >
              {input}
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: 'var(--accent)',
                  verticalAlign: 'middle',
                  marginLeft: '2px',
                  animation: 'cursor-blink 1s step-end infinite',
                }}
              />
            </div>
          </div>
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
