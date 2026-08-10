import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-rivers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full rivers-section" id="section-rivers" #sectionRef>

      <!-- Parallax background -->
      <div class="rivers-bg-wrap" #bgWrap>
        <img src="assets/images/river_flooding.png"
             alt="Río crecido cerca de zona urbana"
             class="cinematic-img rivers-img"
             #riverImg />
      </div>

      <!-- Water level canvas -->
      <canvas class="particle-canvas water-canvas" #waterCanvas></canvas>

      <!-- Overlays -->
      <div class="rivers-vignette"></div>
      <div class="noise-overlay"></div>

      <!-- Content -->
      <div class="rivers-content" #contentRef>

        <div class="rivers-label">
          <span class="label-sci">07 — CUANDO LOS RÍOS RESPONDEN</span>
        </div>

        <div class="rivers-headline-wrap">
          <h2 class="headline-xl rivers-h1" #h1Ref>EL AGUA</h2>
          <h2 class="headline-xl rivers-h2" #h2Ref>BUSCA SU CAMINO.</h2>
        </div>

        <div class="rivers-body" #bodyRef>
          <p class="body-narrative">
            Y cuando supera la capacidad del territorio,<br>
            comienza el riesgo.
          </p>
        </div>

        <!-- Risk items -->
        <div class="risk-grid" #riskGrid>
          <div class="risk-item" *ngFor="let r of risks">
            <div class="risk-icon">{{ r.icon }}</div>
            <span class="label-sci risk-label">{{ r.label }}</span>
          </div>
        </div>

      </div>

      <!-- Water level gauge -->
      <div class="water-gauge" #waterGauge>
        <div class="gauge-label label-sci">NIVEL DE ALERTA</div>
        <div class="gauge-track">
          <div class="gauge-fill" #gaugeFill></div>
          <div class="gauge-markers">
            <div class="gauge-marker" style="bottom: 30%">
              <span class="label-sci" style="color:#4ab8d8">NORMAL</span>
            </div>
            <div class="gauge-marker" style="bottom: 60%">
              <span class="label-sci" style="color:#f07a1a">ALERTA</span>
            </div>
            <div class="gauge-marker" style="bottom: 85%">
              <span class="label-sci" style="color:#e03000">EMERGENCIA</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .rivers-section {
      background: #06080a;
      display: flex;
      align-items: center;
      min-height: 100vh;
    }

    .rivers-bg-wrap {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .rivers-img {
      will-change: transform;
      transform-origin: center bottom;
    }

    .water-canvas {
      z-index: 3;
      mix-blend-mode: screen;
      opacity: 0.4;
    }

    .rivers-vignette {
      position: absolute;
      inset: 0;
    background: linear-gradient(to right, rgb(235 87 28 / 45%) 0%, rgb(101 80 20 / 50%) 60%, rgb(56 29 4 / 42%) 100%), linear-gradient(to top, rgba(6, 8, 10, 0.95) 0%, transparent 50%);
      z-index: 2;
    }

    .rivers-content {
      position: relative;
      z-index: 10;
      padding: 0 6vw;
      max-width: 65%;
    }

    .rivers-label {
      margin-bottom: 3rem;
      opacity: 0;
    }

    .rivers-headline-wrap {
      margin-bottom: 2.5rem;
    }

    .rivers-h1 {
      color: #f0f4f8;
      opacity: 0;
      transform: translateY(50px);
      will-change: transform, opacity;
    }

    .rivers-h2 {
      color: #4ab8d8;
      opacity: 0;
      transform: translateY(50px);
      will-change: transform, opacity;
      text-shadow: 0 0 40px rgba(74, 184, 216, 0.3);
    }

    .rivers-body {
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(20px);
    }

    .risk-grid {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      opacity: 0;
    }

    .risk-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 1rem;
      border: 1px solid rgba(74, 184, 216, 0.15);
      background: rgba(13, 33, 55, 0.3);
      backdrop-filter: blur(4px);
    }

    .risk-icon { font-size: 1.1rem; }
    .risk-label { font-size: 0.65rem; }

    /* Water gauge */
    .water-gauge {
      position: absolute;
      right: 6vw;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      opacity: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .gauge-label {
      writing-mode: horizontal-tb;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
    }

    .gauge-track {
      width: 6px;
      height: 200px;
      background: rgba(240, 244, 248, 0.08);
      border: 1px solid rgba(240, 244, 248, 0.1);
      border-radius: 3px;
      position: relative;
      overflow: visible;
    }

    .gauge-fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0%;
      border-radius: 3px;
      background: linear-gradient(to top, #e03000, #f07a1a, #4ab8d8);
      box-shadow: 0 0 12px rgba(224, 48, 0, 0.5);
      transition: height 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .gauge-markers {
      position: absolute;
      right: 12px;
      top: 0;
      bottom: 0;
      width: 60px;
    }

    .gauge-marker {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .gauge-marker::before {
      content: '';
      width: 6px;
      height: 1px;
      background: currentColor;
      display: block;
    }

    @media (max-width: 768px) {
      .rivers-content { max-width: 100%; }
      .water-gauge { display: none; }
    }
  `]
})
export class RiversComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('bgWrap') bgWrap!: ElementRef;
  @ViewChild('riverImg') riverImg!: ElementRef;
  @ViewChild('h1Ref') h1Ref!: ElementRef;
  @ViewChild('h2Ref') h2Ref!: ElementRef;
  @ViewChild('bodyRef') bodyRef!: ElementRef;
  @ViewChild('riskGrid') riskGrid!: ElementRef;
  @ViewChild('waterGauge') waterGauge!: ElementRef;
  @ViewChild('gaugeFill') gaugeFill!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('waterCanvas') waterCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rivers-label', { static: false }) riverLabel!: ElementRef;

  risks = [
    { icon: '🌉', label: 'PUENTES' },
    { icon: '🛣️', label: 'CARRETERAS' },
    { icon: '🏘️', label: 'ZONAS URBANAS' },
    { icon: '🌾', label: 'TERRENOS AGRÍCOLAS' },
  ];

  private waveFrame!: number;

  ngAfterViewInit() {
    this.initWaterCanvas();
    this.setupScrollAnimations();
  }

  private initWaterCanvas() {
    const canvas = this.waterCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let t = 0;
    const draw = () => {
      this.waveFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // Water surface
      for (let y = canvas.height * 0.6; y < canvas.height; y += 4) {
        const alpha = ((y - canvas.height * 0.6) / (canvas.height * 0.4)) * 0.12;
        ctx.fillStyle = `rgba(74, 184, 216, ${alpha})`;
        ctx.fillRect(0, y, canvas.width, 4);
      }

      // Ripples
      for (let i = 0; i < 3; i++) {
        const rippleY = canvas.height * 0.65 + i * 15;
        ctx.strokeStyle = `rgba(74, 184, 216, 0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 3) {
          const y = rippleY + Math.sin(x * 0.02 + t * 0.03 + i * 1.5) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };
    draw();
  }

  private setupScrollAnimations() {
    const section = this.sectionRef.nativeElement;

    // Parallax bg
    gsap.fromTo(this.riverImg.nativeElement,
      { scale: 1.05, yPercent: -5 },
      {
        scale: 1.2, yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    // Label
    const label = section.querySelector('.rivers-label');
    if (label) {
      gsap.to(label, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 75%' }
      });
    }

    // Headlines
    gsap.to(this.h1Ref.nativeElement, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    gsap.to(this.h2Ref.nativeElement, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2,
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    // Body
    gsap.to(this.bodyRef.nativeElement, {
      opacity: 1, y: 0, duration: 1, delay: 0.4,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });

    // Risk grid
    gsap.to(this.riskGrid.nativeElement, {
      opacity: 1, duration: 0.8, delay: 0.6,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });

    // Water gauge
    gsap.to(this.waterGauge.nativeElement, {
      opacity: 1, duration: 1,
      scrollTrigger: {
        trigger: section, start: 'top 60%',
        onEnter: () => {
          setTimeout(() => {
            this.gaugeFill.nativeElement.style.height = '72%';
          }, 400);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.waveFrame) cancelAnimationFrame(this.waveFrame);
  }
}
