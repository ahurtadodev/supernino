import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasParticlesService } from '../../services/canvas-particles.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-ocean',
  standalone: true,
  template: `
    <section class="section-full ocean-section" id="section-ocean" #sectionRef>
      <!-- Background image -->
      <div class="ocean-bg" #bgImage>
        <img
          src="assets/images/ocean_hero.png"
          alt="Océano Pacífico"
          class="cinematic-img ocean-img"
          #oceanImg
        />
        <!-- Thermal overlay that appears on scroll -->
        <div class="thermal-overlay" #thermalOverlay></div>
      </div>

      <!-- Particle canvas -->
      <canvas class="particle-canvas" #particleCanvas></canvas>

      <!-- Wave canvas -->
      <canvas class="particle-canvas wave-canvas" #waveCanvas></canvas>

      <!-- Overlays -->
      <div class="overlay-black-bottom ocean-bottom-overlay"></div>
      <div class="scanlines"></div>
      <div class="noise-overlay"></div>

      <!-- Content -->
      <div class="ocean-content" #contentRef>
        <div class="ocean-label reveal-opacity" #labelRef>
          <span class="label-sci">02 — EL OCÉANO PACÍFICO</span>
          <div class="separator-line mt-3"></div>
        </div>

        <div class="ocean-tagline" #taglineRef>
          <p class="headline-sm text-muted">TODO COMIENZA AQUÍ.</p>
        </div>
      </div>

      <!-- Anomaly indicator -->
      <div class="anomaly-indicator" #anomalyRef>
        <div class="anomaly-dot"></div>
        <span class="label-sci ml-3">ANOMALÍA TÉRMICA DETECTADA</span>
      </div>
    </section>
  `,
  styles: [`
    .ocean-section {
      height: 100vh;
    }

    .ocean-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .ocean-img {
      transform-origin: center center;
      will-change: transform;
    }

    .thermal-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 60% 40% at 60% 55%,
        rgba(196, 92, 0, 0) 0%,
        rgba(224, 80, 0, 0) 50%,
        transparent 100%
      );
      opacity: 0;
      mix-blend-mode: screen;
      will-change: opacity;
    }

    .ocean-bottom-overlay {
      position: absolute;
      inset: 0;
      z-index: 3;
    }

    .wave-canvas {
      z-index: 2;
      opacity: 0.5;
    }

    .ocean-content {
      position: absolute;
      bottom: 8vh;
      left: 5vw;
      z-index: 10;
    }

    .ocean-label {
      margin-bottom: 1.5rem;
    }

    .ocean-tagline {
      opacity: 0;
      transform: translateY(20px);
    }

    .anomaly-indicator {
      position: absolute;
      top: 40%;
      right: 8vw;
      display: flex;
      align-items: center;
      opacity: 0;
      z-index: 10;
      background: rgba(196, 92, 0, 0.08);
      border: 1px solid rgba(196, 92, 0, 0.3);
      padding: 0.75rem 1.25rem;
      backdrop-filter: blur(4px);
    }

    .anomaly-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #c45c00;
      box-shadow: 0 0 12px rgba(196, 92, 0, 0.8);
      animation: pulseDot 1.5s ease-in-out infinite;
    }

    @keyframes pulseDot {
      0%, 100% { box-shadow: 0 0 4px rgba(196,92,0,0.6); transform: scale(1); }
      50% { box-shadow: 0 0 20px rgba(196,92,0,1); transform: scale(1.4); }
    }
  `]
})
export class OceanComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('bgImage') bgImage!: ElementRef;
  @ViewChild('oceanImg') oceanImg!: ElementRef;
  @ViewChild('thermalOverlay') thermalOverlay!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('labelRef') labelRef!: ElementRef;
  @ViewChild('taglineRef') taglineRef!: ElementRef;
  @ViewChild('anomalyRef') anomalyRef!: ElementRef;
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('waveCanvas') waveCanvas!: ElementRef<HTMLCanvasElement>;

  private waveAnimFrame!: number;
  private waveTime = 0;

  constructor(private particles: CanvasParticlesService) {}

  ngAfterViewInit() {
    this.setupParticles();
    this.setupWaveCanvas();
    this.setupScrollAnimations();
  }

  private setupParticles() {
    const canvas = this.particleCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.particles.init(canvas);
    this.particles.spawnOceanParticles(60);
    this.particles.start();
  }

  private setupWaveCanvas() {
    const canvas = this.waveCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      this.waveAnimFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.waveTime++;
      this.particles.drawWaveLines(ctx, canvas.width, canvas.height, this.waveTime, 0);
    };
    draw();
  }

  private setupScrollAnimations() {
    const section = this.sectionRef.nativeElement;

    // Label reveal
    gsap.fromTo(this.labelRef.nativeElement,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' }
      }
    );

    // Tagline reveal
    gsap.to(this.taglineRef.nativeElement, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3,
      scrollTrigger: { trigger: section, start: 'top 80%' }
    });

    // Parallax zoom on image while scrolling
    gsap.fromTo(this.oceanImg.nativeElement,
      { scale: 1 },
      {
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Thermal overlay fades in on scroll
    gsap.to(this.thermalOverlay.nativeElement, {
      opacity: 1,
      backgroundImage: `radial-gradient(
        ellipse 60% 40% at 60% 55%,
        rgba(196, 92, 0, 0.35) 0%,
        rgba(224, 80, 0, 0.15) 50%,
        transparent 100%
      )`,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Anomaly indicator appears mid-scroll
    gsap.to(this.anomalyRef.nativeElement, {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: section, start: 'top 40%' }
    });

    // Warmth increases as user scrolls
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        this.particles.setWarmth(self.progress * 0.5);
      }
    });
  }

  ngOnDestroy() {
    this.particles.stop();
    if (this.waveAnimFrame) cancelAnimationFrame(this.waveAnimFrame);
  }
}
