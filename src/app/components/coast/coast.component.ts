import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-coast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full coast-section" id="section-coast" #sectionRef>

      <!-- Parallax background image -->
      <div class="coast-bg" #coastBg>
        <img src="assets/images/coast_rain.png"
             alt="Costa peruana bajo lluvia intensa"
             class="cinematic-img coast-img"
             #coastImg />
      </div>

      <!-- Rain overlay canvas -->
      <canvas class="particle-canvas rain-canvas" #rainCanvas></canvas>

      <!-- Overlays -->
      <div class="coast-vignette"></div>
      <div class="noise-overlay"></div>

      <!-- Sticky text sequence -->
      <div class="coast-text-wrap sticky-container" #textWrap [style.height]="'250vh'">
        <div class="sticky-panel coast-sticky">

          <div class="coast-label">
            <span class="label-sci">06 — LA COSTA</span>
          </div>

          <div class="coast-words" #wordsRef>
            <!-- Word 1 -->
            <div class="coast-word" #word1>
              <h2 class="headline-xl coast-headline coast-headline--1">LLUVIA.</h2>
            </div>

            <!-- Word 2 -->
            <div class="coast-word" #word2>
              <h2 class="headline-xl coast-headline coast-headline--2">MUCHA<br>LLUVIA.</h2>
            </div>

            <!-- Paragraph -->
            <div class="coast-para" #paraRef>
              <p class="body-narrative">
                En determinadas condiciones, las precipitaciones pueden aumentar
                significativamente en algunas regiones del territorio peruano,
                especialmente en la costa norte.
              </p>
              <div class="coast-note label-sci">
                <span class="note-dot"></span>
                Las proyecciones dependen de la intensidad del fenómeno · SENAMHI / NOAA
              </div>
            </div>
          </div>

          <!-- Rain intensity indicator -->
          <div class="rain-indicator" #rainIndicator>
            <div class="rain-bar-track">
              <div class="rain-bar-fill" #rainBarFill></div>
              <div class="rain-labels">
                <span class="label-sci">NORMAL</span>
                <span class="label-sci rain-label-high">INTENSO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .coast-section {
      background: #040c14;
    }

    .coast-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .coast-img {
      transform-origin: center;
      will-change: transform;
    }

    .rain-canvas {
      z-index: 3;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: 0.6;
    }

    .coast-vignette {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to right, rgba(4, 12, 20, 0.17) 0%, rgba(4,12,20,0.4) 50%, rgba(4,12,20,0.7) 100%),
        linear-gradient(to top, rgba(4,12,20,0.9) 0%, transparent 40%);
      z-index: 2;
    }

    .coast-text-wrap {
      position: absolute;
      inset: 0;
      z-index: 10;
    }

    .coast-sticky {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 6vw;
      background: transparent;
    }

    .coast-label {
      position: absolute;
      top: 2rem;
      left: 6vw;
    }

    .coast-words {
      position: relative;
      min-height: 240px;
    }

    .coast-word {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      will-change: opacity, transform;
    }

    .coast-headline {
      text-shadow: 0 4px 40px rgba(4,12,20,0.8);
    }

    .coast-headline--1 {
      color: #f0f4f8;
      font-size: clamp(5rem, 18vw, 16rem);
    }

    .coast-headline--2 {
      color: #4ab8d8;
      font-size: clamp(4rem, 14vw, 13rem);
      line-height: 0.9;
      text-shadow:
        0 0 60px rgba(74, 184, 216, 0.2),
        0 4px 40px rgba(4,12,20,0.8);
    }

    .coast-para {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      max-width: 520px;
    }

    .coast-note {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      opacity: 0.6;
    }

    .note-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #4ab8d8;
      flex-shrink: 0;
    }

    .rain-indicator {
      position: absolute;
      bottom: 4rem;
      left: 6vw;
      width: 280px;
      opacity: 0;
    }

    .rain-bar-track {
      position: relative;
    }

    .rain-bar-fill {
      height: 2px;
      background: linear-gradient(to right, #4ab8d8, #c45c00);
      width: 0%;
      transition: width 2s ease;
      box-shadow: 0 0 8px rgba(196, 92, 0, 0.5);
    }

    .rain-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
    }

    .rain-label-high {
      color: #c45c00;
    }
  `]
})
export class CoastComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('coastBg') coastBg!: ElementRef;
  @ViewChild('coastImg') coastImg!: ElementRef;
  @ViewChild('word1') word1!: ElementRef;
  @ViewChild('word2') word2!: ElementRef;
  @ViewChild('paraRef') paraRef!: ElementRef;
  @ViewChild('rainCanvas') rainCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rainIndicator') rainIndicator!: ElementRef;
  @ViewChild('rainBarFill') rainBarFill!: ElementRef;
  @ViewChild('textWrap') textWrap!: ElementRef;

  private rainFrame!: number;
  private drops: { x: number; y: number; speed: number; len: number; opacity: number }[] = [];

  ngAfterViewInit() {
    this.initRainCanvas();
    this.setupScrollAnimations();
  }

  private initRainCanvas() {
    const canvas = this.rainCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create rain drops
    for (let i = 0; i < 200; i++) {
      this.drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 8 + Math.random() * 10,
        len: 15 + Math.random() * 25,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }

    const draw = () => {
      this.rainFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(74, 184, 216, 0.6)';
      ctx.lineWidth = 0.8;

      for (const d of this.drops) {
        ctx.globalAlpha = d.opacity;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
      }
    };
    draw();
  }

  private setupScrollAnimations() {
    const section = this.sectionRef.nativeElement;
    const textWrap = this.textWrap.nativeElement;

    // Parallax image
    gsap.fromTo(this.coastImg.nativeElement,
      { scale: 1.1, yPercent: -5 },
      {
        scale: 1.18, yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    // Word 1: LLUVIA.
    ScrollTrigger.create({
      trigger: textWrap,
      start: 'top top',
      end: '33% top',
      scrub: false,
      onEnter: () => {
        gsap.to(this.word1.nativeElement, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        gsap.set(this.word1.nativeElement, { y: 30 });
      },
      onLeave: () => {
        gsap.to(this.word1.nativeElement, { opacity: 0, y: -20, duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to(this.word1.nativeElement, { opacity: 1, y: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(this.word1.nativeElement, { opacity: 0, duration: 0.3 });
      },
    });

    // Word 2: MUCHA LLUVIA.
    ScrollTrigger.create({
      trigger: textWrap,
      start: '33% top',
      end: '66% top',
      onEnter: () => {
        gsap.to(this.word2.nativeElement, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        gsap.set(this.word2.nativeElement, { y: 30 });
      },
      onLeave: () => {
        gsap.to(this.word2.nativeElement, { opacity: 0, y: -20, duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to(this.word2.nativeElement, { opacity: 1, y: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(this.word2.nativeElement, { opacity: 0, duration: 0.3 });
      },
    });

    // Paragraph
    ScrollTrigger.create({
      trigger: textWrap,
      start: '66% top',
      end: '100% top',
      onEnter: () => {
        gsap.to(this.paraRef.nativeElement, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        gsap.set(this.paraRef.nativeElement, { y: 30 });
        // Rain indicator
        gsap.to(this.rainIndicator.nativeElement, { opacity: 1, duration: 0.8 });
        setTimeout(() => {
          this.rainBarFill.nativeElement.style.width = '78%';
        }, 300);
      },
      onLeaveBack: () => {
        gsap.to(this.paraRef.nativeElement, { opacity: 0, duration: 0.3 });
        gsap.to(this.rainIndicator.nativeElement, { opacity: 0, duration: 0.3 });
      },
    });
  }

  ngOnDestroy() {
    if (this.rainFrame) cancelAnimationFrame(this.rainFrame);
  }
}
