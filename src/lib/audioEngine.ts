export type SoundName =
  | 'keypress' | 'commandAccept' | 'commandError'
  | 'navigate' | 'projectLaunch' | 'windowOpen'
  | 'windowClose' | 'matrixStart' | 'themeChange'
  | 'bootComplete' | 'easterEgg';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!muted) this.init();
  }

  get isMuted() { return this.muted; }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = 'square',
    vol = 0.06,
    delay = 0,
  ) {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  play(sound: SoundName) {
    if (this.muted) return;
    try {
      if (!this.ctx) this.init();
      switch (sound) {
        case 'keypress':
          this.tone(880, 0.04, 'square', 0.03);
          break;
      case 'commandAccept':
        this.tone(523, 0.08, 'square', 0.06);
        this.tone(659, 0.1, 'square', 0.06, 0.07);
        break;
      case 'commandError':
        this.tone(200, 0.12, 'sawtooth', 0.07);
        this.tone(150, 0.18, 'sawtooth', 0.05, 0.1);
        break;
      case 'navigate':
        this.tone(660, 0.06, 'triangle', 0.04);
        break;
      case 'projectLaunch':
        [523, 659, 784].forEach((f, i) => this.tone(f, 0.1, 'square', 0.06, i * 0.08));
        break;
      case 'windowOpen':
        this.tone(880, 0.1, 'triangle', 0.05);
        this.tone(1100, 0.08, 'triangle', 0.04, 0.06);
        break;
      case 'windowClose':
        this.tone(440, 0.1, 'triangle', 0.05);
        this.tone(330, 0.08, 'triangle', 0.04, 0.06);
        break;
      case 'matrixStart':
        [50, 75, 100, 125].forEach((f, i) => this.tone(f, 0.4, 'sawtooth', 0.025, i * 0.05));
        break;
      case 'themeChange':
        this.tone(660, 0.07, 'triangle', 0.05);
        this.tone(880, 0.07, 'triangle', 0.05, 0.08);
        this.tone(1100, 0.08, 'triangle', 0.04, 0.16);
        break;
      case 'bootComplete':
        [262, 330, 392, 523].forEach((f, i) => this.tone(f, 0.15, 'square', 0.07, i * 0.12));
        break;
      case 'easterEgg':
        [698, 784, 880, 698, 784, 880, 1047].forEach((f, i) =>
          this.tone(f, 0.1, 'triangle', 0.07, i * 0.09));
        break;
      }
    } catch (e) {
      console.warn('Audio playback prevented by browser policy');
    }
  }
}

export const audioEngine = new AudioEngine();
