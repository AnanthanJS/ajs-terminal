'use client';

import { useRef, useState } from 'react';

import emailjs from '@emailjs/browser';

const SOCIAL_LINKS = [
  {
    id: 'github-link',
    label: 'GITHUB',
    sub: 'View source & projects',
    href: process.env.NEXT_PUBLIC_GITHUB_URL || '#',
    icon: '⬡',
    color: '#e8e8e8',
  },
  {
    id: 'linkedin-link',
    label: 'LINKEDIN',
    sub: 'Professional profile',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
    icon: '◈',
    color: '#00e5ff',
  },
  {
    id: 'email-link',
    label: 'EMAIL',
    sub: 'Direct message',
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS || ''}`,
    icon: '▣',
    color: '#bf5fff',
  },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function PixelInput({ id, type = 'text', name, label, placeholder, required, rows }: {
  id: string; type?: string; name: string; label: string; placeholder: string; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'color-mix(in srgb, var(--bg-base) 90%, transparent)',
    border: `2px solid ${focused ? 'var(--accent)' : 'var(--border-subtle)'}`,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-jetbrains-mono)',
    fontSize: '12px',
    outline: 'none',
    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
    boxShadow: focused ? '0 0 0 1px rgba(191,95,255,0.2), inset 0 0 12px rgba(191,95,255,0.04)' : 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    resize: 'none' as const,
  };

  return (
    <div>
      <label htmlFor={id} className="pixel-label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={id} name={name} required={required} placeholder={placeholder} rows={rows}
          style={baseStyle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id} type={type} name={name} required={required} placeholder={placeholder}
          style={baseStyle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');
    const form = e.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id') {
      console.warn('EmailJS environment variables are missing or default.');
      setErrorMsg('System configuration error: Missing mail servers.');
      setFormState('error');
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setFormState('success');
      form.reset();
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setErrorMsg(err?.text || 'Transmission failed. Signal lost.');
      setFormState('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-24 md:py-32"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(191,95,255,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">// SECTION_05</span>
            <div
              className="flex-1 h-px"
              style={{ background: 'repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)' }}
            />
            <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>TX/RX MODE</span>
          </div>
          <h2 className="pixel-heading-xl pixel-glow-white" style={{ display: 'block', lineHeight: '2.6' }}>
            OPEN_CHANNEL
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '14px', marginTop: '8px' }}>
            Send a transmission or reach out on any channel below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form panel */}
          <div
              className="dot-matrix-surface relative z-10"
              style={{
                background: 'color-mix(in srgb, var(--bg-elevated) 90%, transparent)',
                border: '2px solid var(--border)',
              clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
              overflow: 'hidden',
            }}
          >
            {/* Panel header */}
            <div
              style={{
                padding: '10px 20px',
                borderBottom: '2px solid var(--border-subtle)',
                background: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div className="w-2 h-2" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)', animation: 'led-blink 3s ease infinite' }} />
              <span className="pixel-label pixel-glow">TRANSMISSION.NEW()</span>
            </div>

            <div style={{ padding: '24px' }}>
              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0', animation: 'fade-up 0.4s ease forwards' }}>
                  <div
                    className="pixel-heading-lg pixel-glow"
                    style={{ display: 'block', marginBottom: '16px', lineHeight: '2' }}
                  >
                    [ OK ]
                  </div>
                  <p className="pixel-heading-sm" style={{ color: 'var(--text-primary)', display: 'block', lineHeight: '2' }}>
                    TRANSMISSION RECEIVED
                  </p>
                  <p className="pixel-label" style={{ color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
                    RESPONSE ETA: 24-48 HRS
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="pixel-btn-ghost"
                    style={{ marginTop: '20px' }}
                  >
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} aria-label="Contact form">
                  <PixelInput id="contact-name" name="name" label="NAME" placeholder="Your name" required />
                  <PixelInput id="contact-email" type="email" name="email" label="EMAIL" placeholder="your@email.com" required />
                  <PixelInput id="contact-message" name="message" label="MESSAGE" placeholder="What are you working on?" required rows={5} />

                  {formState === 'error' && (
                    <div
                      style={{
                        padding: '10px 12px',
                        border: '2px solid rgba(255,95,87,0.4)',
                        clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
                        background: 'rgba(255,95,87,0.06)',
                      }}
                    >
                      <span className="pixel-label" style={{ color: '#ff5f57' }}>ERR: {errorMsg}</span>
                    </div>
                  )}

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="pixel-btn"
                    style={{ width: '100%', opacity: formState === 'submitting' ? 0.5 : 1 }}
                  >
                    {formState === 'submitting' ? '▷ TRANSMITTING...' : '▸ SEND_TRANSMISSION'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right panel: channels + availability */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Social links */}
            <div
              style={{
                background: 'color-mix(in srgb, var(--bg-elevated) 90%, transparent)',
                border: '2px solid var(--border-subtle)',
                clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
              }}
            >
              <div className="flex justify-between items-center"
                style={{
                  padding: '12px 24px',
                  borderBottom: '2px solid var(--border)',
                  background: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)',
                }}
              >
                <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>CHANNELS.AVAILABLE</span>
              </div>
              <div style={{ padding: '16px' }}>
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    id={link.id}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 12px',
                      marginBottom: '4px',
                      border: '2px solid transparent',
                      clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'var(--border)';
                      el.style.background = 'rgba(191,95,255,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'transparent';
                      el.style.background = 'transparent';
                    }}
                  >
                    {/* Icon box */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${link.color}`,
                        color: link.color,
                        fontSize: '14px',
                        flexShrink: 0,
                        background: `${link.color}10`,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="pixel-label" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>{link.label}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-muted)' }}>{link.sub}</div>
                    </div>
                    <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>▸</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability indicator */}
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(40,202,65,0.04)',
                border: '2px solid rgba(40,202,65,0.25)',
                clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div
                  className="w-2 h-2 shrink-0"
                  style={{
                    background: '#28ca41',
                    boxShadow: '0 0 8px #28ca41',
                    animation: 'pulse-glow 2s ease infinite',
                  }}
                  aria-hidden="true"
                />
                <span className="pixel-label" style={{ color: '#28ca41' }}>STATUS: AVAILABLE</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.6' }}>
                Open to full-time roles, contract work, and interesting problems. Response time: within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
