import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasParticlesService } from '../../services/canvas-particles.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-climax',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full climax-section" id="section-climax" #sectionRef>

      <!-- Hot particle canvas -->
      <canvas class="particle-canvas climax-canvas" #climaxCanvas></canvas>

      <!-- Ocean image (revealed later) -->
      <div class="climax-ocean-bg" #oceanBg>
        <img src="assets/images/ocean_hero.png"
             alt="Océano Pacífico"
             class="cinematic-img climax-ocean-img"
             #oceanImg />
      </div>

      <!-- Dark overlay -->
      <div class="climax-overlay" #overlayRef></div>
      <div class="noise-overlay"></div>
      <div class="scanlines"></div>

      <!-- Text content -->
      <div class="climax-content" #contentRef>

        <div class="climax-label">
          <span class="label-sci">09 — MOMENTO DE MÁXIMA TENSIÓN</span>
        </div>

        <!-- Line 1 -->
        <div class="climax-line" #line1>
          <p class="headline-lg climax-text-1">
            EL PROBLEMA NO ESTÁ
          </p>
          <p class="headline-lg climax-text-1b">
            EN EL CIELO.
          </p>
        </div>

        <!-- Line 2 -->
        <div class="climax-line climax-line-2" #line2>
          <p class="headline-lg climax-text-2">
            ESTÁ CONECTADO<br>AL OCÉANO.
          </p>
        </div>

        <!-- Connection reveal -->
        <div class="climax-connection" #connectionRef>
          <div class="conn-left">
            <span class="label-sci conn-label">OCÉANO</span>
            <div class="conn-temp-dot"></div>
          </div>
          <div class="conn-arrow-wrap" #connArrow>
            <div class="conn-arrow-line"></div>
            <div class="conn-arrow-head">→</div>
          </div>
          <div class="conn-right">
            <span class="label-sci conn-label">PERÚ</span>
            <div class="conn-peru-dot"></div>
          </div>
        </div>

        <!-- Impact points map -->
        <div class="impact-points-wrap" #impactPoints>
          <div class="impact-point" *ngFor="let p of impactDots"
               [style.left]="p.x + '%'"
               [style.top]="p.y + '%'"
               [style.animationDelay]="p.delay + 's'">
          </div>
        </div>

      </div>

    </section>
  `,
  styles: [`
    .climax-section {
      background: #040008;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .climax-canvas {
      z-index: 1;
      mix-blend-mode: screen;
    }

    .climax-ocean-bg {
      position: absolute;
      inset: 0;
      opacity: 0;
      will-change: opacity;
    }

    .climax-ocean-img {
      scale: 1.3;
      transform-origin: center;
      filter: saturate(0.4) brightness(0.4);
    }

    .climax-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 100% 100% at 50% 50%,
        rgba(80, 0, 0, 0.1) 0%,
        rgba(4, 0, 8, 0.85) 60%,
        rgba(4, 0, 8, 0.95) 100%
      );
      z-index: 2;
      will-change: opacity;
    }

    .climax-content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 5vw;
      max-width: 1000px;
    }

    .climax-label {
      position: absolute;
      top: -40vh;
      left: 50%;
      transform: translateX(-50%);
    }

    .climax-line {
      margin-bottom: 1rem;
      opacity: 0;
      will-change: opacity, transform;
    }

    .climax-line-2 {
      margin-bottom: 4rem;
    }

    .climax-text-1 {
      color: rgba(240, 244, 248, 0.7);
      letter-spacing: 0.05em;
    }

    .climax-text-1b {
      color: #f0f4f8;
      letter-spacing: 0.05em;
    }

    .climax-text-2 {
      color: #e03000;
      text-shadow:
        0 0 60px rgba(224, 48, 0, 0.5),
        0 0 120px rgba(224, 48, 0, 0.2);
      letter-spacing: 0.05em;
    }

    /* Connection viz */
    .climax-connection {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      opacity: 0;
      margin-bottom: 3rem;
    }

    .conn-left, .conn-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .conn-label { color: #8099b0; }

    .conn-temp-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #4ab8d8;
      box-shadow: 0 0 20px rgba(74, 184, 216, 0.7);
      animation: dotPulse 2s ease-in-out infinite;
    }

    .conn-peru-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #e03000;
      box-shadow: 0 0 20px rgba(224, 48, 0, 0.7);
      animation: dotPulse 2s ease-in-out infinite 0.5s;
    }

    @keyframes dotPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.4); }
    }

    .conn-arrow-wrap {
      display: flex;
      align-items: center;
      gap: 0;
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left;
    }

    .conn-arrow-line {
      width: 120px;
      height: 1px;
      background: linear-gradient(to right, #4ab8d8, #e03000);
      box-shadow: 0 0 8px rgba(224, 48, 0, 0.4);
    }

    .conn-arrow-head {
      font-family: 'Space Mono', monospace;
      color: #e03000;
      font-size: 1.2rem;
    }

    /* Impact dots overlay */
    .impact-points-wrap {
      position: absolute;
      inset: -50vh -50vw;
      pointer-events: none;
      opacity: 0;
    }

    .impact-point {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e03000;
      box-shadow: 0 0 12px rgba(224, 48, 0, 0.7);
      animation: impactPulse 2s ease-in-out infinite;
    }

    @keyframes impactPulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.8); }
    }
  `]
})
export class ClimaxComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('climaxCanvas') climaxCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('oceanBg') oceanBg!: ElementRef;
  @ViewChild('oceanImg') oceanImg!: ElementRef;
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('line1') line1!: ElementRef;
  @ViewChild('line2') line2!: ElementRef;
  @ViewChild('connectionRef') connectionRef!: ElementRef;
  @ViewChild('connArrow') connArrow!: ElementRef;
  @ViewChild('impactPoints') impactPoints!: ElementRef;

  impactDots = Array.from({ length: 25 }, (_, i) => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 2,
  }));

  private particleFrame!: number;
  private particles: { x:number; y:number; vx:number; vy:number; size:number; life:number; maxLife:number }[] = [];

  constructor(private particleSvc: CanvasParticlesService) {}

  ngAfterViewInit() {
    this.initHotParticles();
    this.setupScrollAnimations();
  }

  private initHotParticles() {
    const canvas = this.climaxCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    for (let i = 0; i < 80; i++) {
      this.particles.push(this.createHotParticle(canvas));
    }

    const warms = ['#ff3300', '#e03000', '#ff6020', '#c45c00', '#f07a1a'];
    const draw = () => {
      this.particleFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02; // rise

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : (1 - progress) / 0.7;

        ctx.globalAlpha = alpha * 0.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = warms[Math.floor(Math.random() * warms.length)];
        ctx.fillStyle = warms[Math.floor(Math.random() * warms.length)];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          this.particles.splice(i, 1);
          this.particles.push(this.createHotParticle(canvas));
        }
      }
      ctx.globalAlpha = 1;
    };
    draw();
  }

  private createHotParticle(canvas: HTMLCanvasElement) {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height * (0.5 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.5 + Math.random() * 1.5),
      size: 1 + Math.random() * 3,
      life: 0,
      maxLife: 120 + Math.random() * 180,
    };
  }

  private setupScrollAnimations() {
    const section = this.sectionRef.nativeElement;

    // Line 1 – first reveal
    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.timeline()
          .to(this.line1.nativeElement, { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' })
          .to(this.line2.nativeElement, { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }, 1)
          .to(this.connectionRef.nativeElement, { opacity: 1, duration: 0.8 }, 2)
          .to(this.connArrow.nativeElement, { opacity: 1, scaleX: 1, duration: 1, ease: 'power3.out' }, 2.2)
          .to(this.oceanBg.nativeElement, { opacity: 1, duration: 2, ease: 'power2.out' }, 2.5)
          .to(this.impactPoints.nativeElement, { opacity: 1, duration: 1 }, 3.2);

        // Set initial positions
        gsap.set(this.line1.nativeElement, { y: 40 });
        gsap.set(this.line2.nativeElement, { y: 40 });
      }
    });

    // Ocean zoom out on scroll
    gsap.fromTo(this.oceanImg.nativeElement,
      { scale: 1.3 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  }

  ngOnDestroy() {
    if (this.particleFrame) cancelAnimationFrame(this.particleFrame);
  }
}
