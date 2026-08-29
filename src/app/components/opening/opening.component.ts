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

      <!-- ENFEN Alert band (top) -->
      <div  #enfenBand>
      </div>

      <!-- Background ocean image -->
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

      <!-- Content -->
      <div class="opening-content" #contentRef>
        <div class="opening-line" #lineOne>
          <span class="editorial-tag">INFORME ESPECIAL DE PREVENCIÓN CLIMÁTICA</span>
        </div>

        <div class="opening-year" #lineTwo>
          <span class="editorial-years">TEMPORADA 2026 – 2027</span>
        </div>

        <div class="opening-title" #lineThree>
          <h1 class="headline-xl opening-main-title">EL NIÑO</h1>
          <div class="opening-glow-effect"></div>
        </div>

        <div class="opening-concept" #lineConcept>
          <p class="concept-highlight">"El agua del Pacífico ya se está calentando. Las lluvias torrenciales pondrán a prueba la resistencia de cada techo en el país."</p>
        </div>

        <!-- Quick Action Buttons -->
        <div class="opening-cta-group" #lineFour>
          <a class="hero-btn-primary" (click)="scrollToSection('catalog')">
            <span>Ver Techos y Coberturas Recomendadas</span>
          </a>
          <a class="hero-btn-secondary" (click)="scrollToSection('section-peru-map')">
            <span>Consultar Mapa por Regiones</span>
            <span class="arrow-right">→</span>
          </a>
        </div>
      </div>

      <!-- Geographic context -->
      <div class="geo-coord" #geoCoord>
        <span>Costa Norte y Sierra del Perú</span>
        <span class="geo-sep">·</span>
        <span>Guía Técnica de Protección Estructural</span>
      </div>

      <!-- Scroll indicator -->
      <div class="opening-scroll-hint" #scrollHint>
        <span class="scroll-label">Desliza para conocer el impacto</span>
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    /* ENFEN Alert band (Píldora Flotante Redondeada) */
    .enfen-band {
      position: absolute;
      top: 1.8rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.55rem 1.6rem;
      background: rgba(18, 14, 12, 0.88);
      border: 1px solid rgba(212, 139, 56, 0.35);
      border-radius: 9999px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 139, 56, 0.1);
    }

    .enfen-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #cc1a00;
      flex-shrink: 0;
      box-shadow: 0 0 8px #cc1a00;
      animation: enfenPulse 2s ease-in-out infinite;
    }

    @keyframes enfenPulse {
      0%, 100% { opacity: 0.5; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .enfen-text {
      font-family: var(--font-body);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: rgba(247, 244, 238, 0.95);
      text-transform: uppercase;
      white-space: nowrap;
    }

    .opening-section {
      background: #0a0908;
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
      background: #cc1a00;
      box-shadow: 0 0 10px #cc1a00;
      animation: alertBlink 1.5s ease-in-out infinite;
    }

    @keyframes alertBlink {
      0%, 100% { opacity: 0.3; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .banner-badge {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      background: rgba(180, 34, 0, 0.25);
      color: #eef2f6;
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

    .editorial-tag {
      font-family: var(--font-body);
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      font-weight: 600;
      color: var(--c-accent);
      text-transform: uppercase;
    }

    .editorial-years {
      font-family: var(--font-display);
      font-size: clamp(1rem, 1.8vw, 1.4rem);
      font-weight: 700;
      color: var(--c-muted);
      letter-spacing: 0.08em;
    }

    .opening-concept {
      opacity: 0;
      margin-bottom: 2rem;
      max-width: 680px;
      margin-left: auto;
      margin-right: auto;
    }

    .concept-highlight {
      font-family: var(--font-body);
      font-size: clamp(1rem, 1.5vw, 1.25rem);
      line-height: 1.7;
      color: rgba(247, 244, 238, 0.9);
      font-weight: 400;
    }

    .opening-cta-group {
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }

    .hero-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.85rem 1.6rem;
      background: var(--c-accent);
      color: #0a0908;
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 12px 30px rgba(212, 139, 56, 0.35);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;

      &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 18px 40px rgba(212, 139, 56, 0.5);
        background: #e59942;
      }
    }

    .hero-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 1.6rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 9999px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      text-decoration: none;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }
    }

    .scroll-label {
      font-family: var(--font-body);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      color: var(--c-muted);
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

    .geo-coord {
      position: absolute;
      bottom: 2.5rem;
      left: 3rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-mono);
      font-size: 0.58rem;
      letter-spacing: 0.14em;
      color: rgba(122, 148, 170, 0.45);
      text-transform: uppercase;
      opacity: 0;
      z-index: 10;
    }

    .geo-sep {
      opacity: 0.3;
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
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('lineOne') lineOne!: ElementRef;
  @ViewChild('lineTwo') lineTwo!: ElementRef;
  @ViewChild('lineThree') lineThree!: ElementRef;
  @ViewChild('lineConcept') lineConcept!: ElementRef;
  @ViewChild('lineFour') lineFour!: ElementRef;
  @ViewChild('scrollHint') scrollHint!: ElementRef;
  @ViewChild('geoCoord') geoCoord!: ElementRef;

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
        ctx.fillStyle = s.r > 1 ? '#c87f35' : '#f0ece6';
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
      .to(this.lineOne.nativeElement, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.4)
      .to(this.lineTwo.nativeElement, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 1.0)
      .to(this.lineThree.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
        filter: 'blur(0px)'
      }, 1.8)
      .to(this.lineConcept.nativeElement, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.8)
      .to(this.lineFour.nativeElement, { opacity: 1, duration: 1, ease: 'power2.out' }, 3.6)
      .to(this.scrollHint.nativeElement, { opacity: 0.8, duration: 0.8, ease: 'power2.out' }, 4.2)
      .to(this.geoCoord.nativeElement, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 4.4);

    // Initial state
    gsap.set(this.lineThree.nativeElement, { filter: 'blur(20px)', scale: 0.96 });
    gsap.set(this.lineConcept.nativeElement, { y: 20 });
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

  scrollToSection(targetId: string) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    this.tl?.kill();
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
