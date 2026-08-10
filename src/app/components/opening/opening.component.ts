import {
  Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-opening',
  standalone: true,
  template: `
    <section class="section-full opening-section" id="section-opening" #sectionRef>
      <!-- Noise texture -->
      <div class="ocean-bg" #bgImage>
        <img
          src="assets/images/banner.jpeg"
          alt="Océano Pacífico"
          class="cinematic-img ocean-img"
          #oceanImg
        />
        <!-- Thermal overlay that appears on scroll -->
        <div class="thermal-overlay" #thermalOverlay></div>
      </div>
      <div class="noise-overlay"></div>

      <!-- Warning background pulse glow -->
      <div class="opening-threat-glow" #threatGlow></div>

      <!-- Stars background -->
      <canvas #starsCanvas class="particle-canvas"></canvas>

      <!-- Top urgent badge -->
      <!-- <div class="urgent-top-banner" #bannerRef>
        <span class="pulse-warning-dot"></span>
        <span class="label-sci tracking-widest text-warm-orange">
          ALERTA NACIONAL · MONITOREO CLIMÁTICO 2026 – 2027
        </span>
        <span class="banner-badge">ENFEN / SENAMHI</span>
      </div> -->

      <!-- Content -->
      <div class="opening-content " #contentRef>
        <div class="opening-line" #lineOne>
          <span class="label-sci tracking-widest text-cyan">PACÍFICO SUR · PROYECCIÓN DE ANOMALÍA</span>
        </div>

        <div class="opening-year" #lineTwo>
          <span class="font-mono text-muted">2026 – 2027</span>
        </div>

        <div class="opening-title" #lineThree>
          <h1 class="headline-xl opening-main-title">EL NIÑO</h1>
          <div class="opening-glow-effect"></div>
        </div>

        <div class="opening-concept" #lineConcept>
          <p class="concept-highlight">"EL NIÑO NO LLEGA DE GOLPE. EMPIEZA EN EL OCÉANO."</p>
        </div>

        <div class="opening-sub" #lineFour>
          <p class="label-sci">El océano está cambiando aceleradamente.</p>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="opening-scroll-hint" #scrollHint>
        <span class="label-sci">SCROLL PARA VER EL IMPACTO EN EL PERÚ</span>
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .opening-section {
      background: #040c14;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }
    .ocean-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
.ocean-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transform-origin: center center;
  will-change: transform;

  /* Un poco más cinematográfico */
  filter: brightness(0.80) contrast(1.1) saturate(0.9);
}
    .thermal-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 60% 40% at 60% 55%,
        rgba(228, 108, 3, 0) 0%,
        rgba(224, 80, 0, 0) 50%,
        transparent 100%
      );
      opacity: 0;
      mix-blend-mode: screen;
      will-change: opacity;
    }
    .opening-threat-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 70% 50% at 50% 60%,
        rgba(196, 92, 0, 0.18) 0%,
        rgba(224, 48, 0, 0.08) 40%,
        transparent 80%
      );
      opacity: 0.6;
      animation: threatPulse 4s ease-in-out infinite;
      z-index: 1;
    }

    @keyframes threatPulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.85; transform: scale(1.08); }
    }


    .pulse-warning-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      z-index: 2;
      background: #ff3300;
      box-shadow: 0 0 12px #ff3300;
      animation: alertBlink 1.2s ease-in-out infinite;
    }

    @keyframes alertBlink {
      0%, 100% { opacity: 0.3; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.3); }
    }

    .banner-badge {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      background: rgba(224, 48, 0, 0.3);
      color: #f0f4f8;
      padding: 0.15rem 0.5rem;
      letter-spacing: 0.1em;
      z-index: 3;
    }

    .opening-content {
      text-align: center;
      position: relative;
      z-index: 100;
      max-width: 90vw;
    }

    .opening-line {
      opacity: 0;
      margin-bottom: 1rem;
      letter-spacing: 0.4em;
    }

    .text-cyan {
      color: #7ec8e3;
    }

    .text-warm-orange {
      color: #f07a1a;
    }

    .opening-year {
      opacity: 0;
      font-size: clamp(1.1rem, 2.2vw, 1.8rem);
      color: #8099b0;
      margin-bottom: 1.5rem;
      letter-spacing: 0.3em;
    }

    .opening-title {
      position: relative;
      opacity: 0;
      transform: scale(0.85);
      will-change: transform, opacity;
      margin-bottom: 1.5rem;
    }

    .opening-main-title {
      font-size: clamp(5rem, 22vw, 19rem);
      color: #f0f4f8;
      text-shadow:
        0 0 80px rgba(196, 92, 0, 0.4),
        0 0 160px rgba(224, 48, 0, 0.25),
        0 0 240px rgba(42, 111, 168, 0.2);
    }

    .opening-glow-effect {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(224, 48, 0, 0.25) 0%, transparent 70%);
      filter: blur(40px);
      pointer-events: none;
      z-index: -1;
    }

    .opening-concept {
      opacity: 0;
      margin-bottom: 1rem;
    }

    .concept-highlight {
      font-family: 'Space Mono', monospace;
      font-size: clamp(0.9rem, 1.6vw, 1.3rem);
      color: #f07a1a;
      letter-spacing: 0.08em;
      text-shadow: 0 0 15px rgba(240, 122, 26, 0.4);
    }

    .opening-sub {
      opacity: 0;
      margin-top: 1rem;
      letter-spacing: 0.3em;
    }

    .opening-scroll-hint {
      position: absolute;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      opacity: 0;
      z-index: 10;
    }

    .scroll-line {
      width: 1px;
      height: 60px;
      background: linear-gradient(to bottom, rgba(240,122,26,0.8), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }
.ocean-bg::after {
  content: '';
  position: absolute;
  inset: 0;

  /* Oscurece la imagen y concentra la atención en el centro */
  background:
    linear-gradient(
      to bottom,
      rgba(4, 12, 20, 0.72) 0%,
      rgba(4, 12, 20, 0.34) 35%,
      rgba(4, 12, 20, 0.58) 65%,
      rgba(4, 12, 20, 0.88) 100%
    ),
    radial-gradient(
      ellipse at center,
      rgba(4, 12, 20, 0.15) 0%,
      rgba(4, 12, 20, 0.55) 70%,
      rgba(4, 12, 20, 0.9) 100%
    );

  z-index: 1;
  pointer-events: none;
  }
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
      50% { opacity: 1; transform: scaleY(1); }
    }
  `]
})
export class OpeningComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('starsCanvas') starsCanvas!: ElementRef<HTMLCanvasElement>;
  // @ViewChild('bannerRef') bannerRef!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('lineOne') lineOne!: ElementRef;
  @ViewChild('lineTwo') lineTwo!: ElementRef;
  @ViewChild('lineThree') lineThree!: ElementRef;
  @ViewChild('lineConcept') lineConcept!: ElementRef;
  @ViewChild('lineFour') lineFour!: ElementRef;
  @ViewChild('scrollHint') scrollHint!: ElementRef;

  private tl!: gsap.core.Timeline;
  private animFrame!: number;
  private stars: { x: number, y: number, r: number, op: number, speed: number }[] = [];

  ngAfterViewInit() {
    this.initStars();
    this.playIntroTimeline();
    this.setupScrollExit();
  }

  private initStars() {
    const canvas = this.starsCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 160; i++) {
      this.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3,
        op: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.005 + 0.002
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of this.stars) {
        s.op += Math.sin(Date.now() * s.speed) * 0.003;
        ctx.globalAlpha = Math.abs(s.op);
        ctx.fillStyle = s.r > 1 ? '#f07a1a' : '#7ec8e3';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  private playIntroTimeline() {
    this.tl = gsap.timeline({ delay: 0.3 });

    this.tl
      // .to(this.bannerRef.nativeElement, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.1)
      .to(this.lineOne.nativeElement, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.4)
      .to(this.lineTwo.nativeElement, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 1.0)
      .to(this.lineThree.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.4)',
        filter: 'blur(0px)'
      }, 1.8)
      .to(this.lineConcept.nativeElement, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.8)
      .to(this.lineFour.nativeElement, { opacity: 1, duration: 1, ease: 'power2.out' }, 3.6)
      .to(this.scrollHint.nativeElement, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 4.2);

    // Initial blur on title
    gsap.set(this.lineThree.nativeElement, { filter: 'blur(20px)' });
    gsap.set(this.lineConcept.nativeElement, { y: 20 });
    //gsap.set(this.bannerRef.nativeElement, { y: -20 });
  }

  private setupScrollExit() {
    ScrollTrigger.create({
      trigger: this.sectionRef.nativeElement,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(this.contentRef.nativeElement, {
          scale: 1 + p * 0.35,
          opacity: 1 - p * 2,
        });
        // gsap.set(this.bannerRef.nativeElement, {
        //   opacity: Math.max(0, 1 - p * 2.5),
        // });
        gsap.set(this.scrollHint.nativeElement, {
          opacity: Math.max(0, (1 - p * 3)) * 0.8,
        });
      }
    });
  }

  ngOnDestroy() {
    this.tl?.kill();
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
