import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasParticlesService } from '../../services/canvas-particles.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full temp-section" id="section-temperature" #sectionRef>
      <!-- Animated background canvas -->
      <canvas class="particle-canvas" #particleCanvas></canvas>

      <!-- Background temperature map image -->
      <div class="temp-map-bg" #mapBg>
        <img src="assets/images/ocean_temperature.png"
             alt="Mapa de temperatura oceánica"
             class="cinematic-img"
             #mapImg />
      </div>

      <!-- Overlay -->
      <div class="temp-overlay"></div>
      <div class="noise-overlay"></div>

      <!-- Left content -->
      <div class="temp-content" #contentRef>
        <div class="temp-label reveal-opacity" #labelRef>
          <span class="label-sci">03 — LA TEMPERATURA CAMBIA</span>
        </div>

        <div class="temp-title-wrap" #titleWrap>
          <h2 class="headline-xl temp-headline" #headline1>EL OCÉANO</h2>
          <h2 class="headline-xl temp-headline temp-headline--warm" #headline2>SE CALIENTA.</h2>
        </div>

        <div class="temp-body reveal-up" #bodyText>
          <p class="body-narrative">
            Y cuando el océano cambia,<br>
            la atmósfera responde.
          </p>
        </div>
      </div>

      <!-- Right: current readings panel -->
      <div class="temp-readings" #readingsPanel>
        <div class="reading-card" *ngFor="let r of readings; let i = index" [attr.data-index]="i">
          <span class="label-sci reading-label">{{ r.label }}</span>
          <div class="reading-value">
            <span class="reading-num">{{ r.value }}</span>
            <span class="reading-unit">{{ r.unit }}</span>
          </div>
          <div class="reading-bar">
            <div class="reading-bar-fill" [style.width]="r.pct + '%'" [style.background]="r.color"></div>
          </div>
        </div>
      </div>

      <!-- Scanlines -->
      <div class="scanlines"></div>
    </section>
  `,
  styles: [`
    .temp-section {
      background: #060e18;
      display: flex;
      align-items: center;
      min-height: 100vh;
    }

    .temp-map-bg {
      position: absolute;
      inset: 0;
      opacity: 0.2;
    }

    .temp-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 80% 100% at 20% 50%,
        transparent 0%,
        rgba(6, 14, 24, 0.7) 60%,
        rgba(6, 14, 24, 0.95) 100%
      );
      z-index: 2;
    }

    .temp-content {
      position: relative;
      z-index: 10;
      padding: 0 5vw;
      max-width: 65%;
    }

    .temp-label {
      margin-bottom: 2rem;
    }

    .temp-title-wrap {
      margin-bottom: 3rem;
    }

    .temp-headline {
      display: block;
      opacity: 0;
      transform: translateX(-60px);
      will-change: transform, opacity;
    }

    .temp-headline--warm {
      color: #c45c00;
      text-shadow:
        0 0 40px rgba(196, 92, 0, 0.4),
        0 0 80px rgba(196, 92, 0, 0.15);
    }

    .temp-body {
      max-width: 480px;
    }

    .temp-readings {
      position: absolute;
      right: 5vw;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 200px;
    }

    .reading-card {
      opacity: 0;
      transform: translateX(30px);
      border-left: 1px solid rgba(42, 111, 168, 0.3);
      padding-left: 1.25rem;
    }

    .reading-label {
      display: block;
      margin-bottom: 0.3rem;
      opacity: 0.7;
    }

    .reading-value {
      display: flex;
      align-items: baseline;
      gap: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .reading-num {
      font-family: 'Space Mono', monospace;
      font-size: 1.5rem;
      color: #f0f4f8;
    }

    .reading-unit {
      font-family: 'Space Mono', monospace;
      font-size: 0.7rem;
      color: #8099b0;
    }

    .reading-bar {
      height: 2px;
      background: rgba(42, 111, 168, 0.2);
      width: 100%;
    }

    .reading-bar-fill {
      height: 100%;
      transition: width 1.5s ease;
      box-shadow: 0 0 8px currentColor;
    }

    @media (max-width: 768px) {
      .temp-content { max-width: 100%; }
      .temp-readings { display: none; }
    }
  `]
})
export class TemperatureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapBg') mapBg!: ElementRef;
  @ViewChild('mapImg') mapImg!: ElementRef;
  @ViewChild('labelRef') labelRef!: ElementRef;
  @ViewChild('headline1') headline1!: ElementRef;
  @ViewChild('headline2') headline2!: ElementRef;
  @ViewChild('bodyText') bodyText!: ElementRef;
  @ViewChild('readingsPanel') readingsPanel!: ElementRef;

  readings = [
    { label: 'TEMPERATURA SUPERFICIAL', value: '+2.3', unit: '°C ANOMALÍA', pct: 70, color: '#c45c00' },
    { label: 'ÍNDICE OCEÁNICO EL NIÑO', value: '+1.8', unit: 'σ', pct: 58, color: '#f07a1a' },
    { label: 'PRECIPITACIÓN PROYECTADA', value: '+140', unit: '% SOBRE MEDIA', pct: 85, color: '#4ab8d8' },
    { label: 'ESTADO ALERTA', value: 'ACTIVO', unit: '', pct: 100, color: '#e03000' },
  ];

  private waveFrame!: number;
  private waveTime = 0;

  constructor(private particles: CanvasParticlesService) {}

  ngAfterViewInit() {
    this.setupCanvas();
    this.setupScrollAnimations();
  }

  private setupCanvas() {
    const canvas = this.particleCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      this.waveFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.waveTime++;
      // Draw current lines
      for (let i = 0; i < 8; i++) {
        const x = (Date.now() * 0.00015 * (i + 1)) % 1;
        const cx = x * canvas.width;
        ctx.strokeStyle = `rgba(42, 111, 168, ${0.05 + i * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 3) {
          const xOffset = Math.sin(y * 0.02 + this.waveTime * 0.01 + i) * 30;
          if (y === 0) ctx.moveTo(cx + xOffset, y);
          else ctx.lineTo(cx + xOffset, y);
        }
        ctx.stroke();
      }
    };
    draw();
  }

  private setupScrollAnimations() {
    const section = this.sectionRef.nativeElement;

    // Label
    gsap.fromTo(this.labelRef.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 75%' }
      }
    );

    // Headlines
    gsap.to(this.headline1.nativeElement, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    gsap.to(this.headline2.nativeElement, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    // Body text
    gsap.fromTo(this.bodyText.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5,
        scrollTrigger: { trigger: section, start: 'top 65%' }
      }
    );

    // Reading cards stagger
    const cards = this.readingsPanel.nativeElement.querySelectorAll('.reading-card');
    gsap.to(cards, {
      opacity: 1, x: 0, duration: 0.8, stagger: 0.15,
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    // Parallax on map
    gsap.fromTo(this.mapBg.nativeElement,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.waveFrame) cancelAnimationFrame(this.waveFrame);
  }
}
