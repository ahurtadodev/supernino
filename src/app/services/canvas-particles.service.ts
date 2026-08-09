import { Injectable } from '@angular/core';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

@Injectable({ providedIn: 'root' })
export class CanvasParticlesService {
  private particles: Particle[] = [];
  private animFrameId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private warmth = 0; // 0 = cold blue, 1 = hot red

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  setWarmth(value: number) {
    this.warmth = Math.max(0, Math.min(1, value));
  }

  spawnOceanParticles(count: number = 80) {
    if (!this.canvas) return;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const w = this.canvas!.width;
    const h = this.canvas!.height;
    const maxLife = 180 + Math.random() * 240;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.2 - 0.15,
      size: 1 + Math.random() * 2.5,
      opacity: 0,
      color: this.getColor(),
      life: 0,
      maxLife,
    };
  }

  private getColor(): string {
    const t = this.warmth;
    if (t < 0.3) {
      // Cold: blue-cyan spectrum
      const blues = ['#4ab8d8', '#2a6fa8', '#7ec8e3', '#1a4a6e', '#a0d8ef'];
      return blues[Math.floor(Math.random() * blues.length)];
    } else if (t < 0.65) {
      // Transition: mix
      const mixed = ['#4ab8d8', '#c45c00', '#f07a1a', '#2a6fa8', '#e08020'];
      return mixed[Math.floor(Math.random() * mixed.length)];
    } else {
      // Hot: orange-red spectrum
      const warms = ['#f07a1a', '#c45c00', '#e03000', '#ff6020', '#ffa040'];
      return warms[Math.floor(Math.random() * warms.length)];
    }
  }

  start() {
    const animate = () => {
      this.animFrameId = requestAnimationFrame(animate);
      this.update();
      this.draw();
    };
    animate();
  }

  stop() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      // Fade in / out
      const halfLife = p.maxLife / 2;
      if (p.life < halfLife) {
        p.opacity = (p.life / halfLife) * 0.7;
      } else {
        p.opacity = ((p.maxLife - p.life) / halfLife) * 0.7;
      }

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        this.particles.push(this.createParticle());
      }

      // Wrap around edges
      const w = this.canvas!.width;
      const h = this.canvas!.height;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }
  }

  private draw() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  drawWaveLines(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, warmth: number) {
    const t = warmth;
    const coldColor = `rgba(74, 184, 216, 0.15)`;
    const warmColor = `rgba(240, 122, 26, 0.2)`;
    const color = t < 0.5 ? coldColor : warmColor;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {
      const yBase = h * (0.2 + i * 0.15);
      const amp = 20 + i * 8;
      const freq = 0.008 + i * 0.002;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = yBase + Math.sin(x * freq + time * 0.001 + i) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
}
