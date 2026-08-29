import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-final-section',
  standalone: true,
  template: `
    <section class="section-full final-section" id="section-final" #sectionRef>

      <!-- Final ocean image with light -->
      <div class="final-bg" #finalBg>
        <img src="assets/images/ocean_final.png"
             alt="Océano Pacífico al amanecer"
             class="cinematic-img final-ocean-img"
             #finalImg />
      </div>

      <!-- Light overlay that grows -->
      <div class="final-light-overlay" #lightOverlay></div>

      <!-- Dark vignette -->
      <div class="final-vignette"></div>
      <div class="noise-overlay"></div>

      <!-- Content -->
      <div class="final-content" #contentRef>

        <!-- Narrative text -->
        <div class="final-narrative" #narrativeRef>
          <p class="final-line" #line1>El Niño es un fenómeno natural.</p>
          <div class="final-pause-line" #pause1></div>
          <p class="final-line final-line--mid" #line2>Sus efectos no tienen por qué convertirse en desastre.</p>
          <div class="final-pause-line" #pause2></div>
        </div>

        <!-- Key phrase -->
        <div class="final-key" #keyRef>
          <h2 class="headline-xl final-headline">CONOCER ES PREVENIR.</h2>
        </div>

        <!-- CTA -->
        <div class="final-cta" #ctaRef>
          <a href="https://www.senamhi.gob.pe" target="_blank" rel="noopener noreferrer"
             class="cta-btn" id="cta-entender">
            <span>ENTENDER EL FENÓMENO</span>
            <span class="cta-arrow">→</span>
          </a>

          <div class="cta-sources">
            <span class="label-sci">FUENTES DE MONITOREO:</span>
            <div class="source-links">
              <a href="https://www.senamhi.gob.pe" target="_blank" class="source-link">SENAMHI</a>
              <span class="sep-dot">·</span>
              <a href="https://www.noaa.gov" target="_blank" class="source-link">NOAA</a>
              <span class="sep-dot">·</span>
              <a href="https://www.indeci.gob.pe" target="_blank" class="source-link">INDECI</a>
              <span class="sep-dot">·</span>
              <a href="https://www.ana.gob.pe" target="_blank" class="source-link">ANA</a>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <footer class="final-footer" #footerRef>
        <div class="footer-left">
          <span class="label-sci footer-brand">EL NIÑO · PERÚ 2026</span>
          <span class="footer-note">
            Experiencia educativa basada en datos científicos verificados.
            No reemplaza información oficial de organismos gubernamentales.
          </span>
        </div>
        <div class="footer-right">
          <span class="label-sci">SCROLL PARA VOLVER ↑</span>
        </div>
      </footer>

    </section>
  `,
  styles: [`
    .final-section {
      background: #070604;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      position: relative;
    }

    .final-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .final-ocean-img {
      will-change: transform;
      transform-origin: center;
      filter: brightness(0.5) saturate(0.8);
    }

    .final-light-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 80% 50% at 50% 30%,
        rgba(200, 170, 80, 0) 0%,
        transparent 60%
      );
      z-index: 2;
      opacity: 0;
      will-change: opacity;
    }

    .final-vignette {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to top, rgba(6,5,4,0.97) 0%, rgba(6,5,4,0.5) 40%, transparent 70%),
        linear-gradient(to bottom, rgba(6,5,4,0.7) 0%, transparent 30%);
      z-index: 3;
    }

    .final-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 3rem;
      padding: 0 6vw;
      max-width: 900px;
    }

    .final-narrative {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .final-line {
      font-family: var(--font-body);
      font-size: clamp(1.1rem, 2vw, 1.5rem);
      font-weight: 300;
      color: rgba(190, 210, 228, 0.7);
      letter-spacing: 0.015em;
      opacity: 0;
      transform: translateY(20px);
    }

    .final-line--mid {
      color: rgba(210, 228, 242, 0.85);
      font-size: clamp(1rem, 1.8vw, 1.35rem);
    }

    .final-pause-line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(200, 127, 53, 0.5), transparent);
      opacity: 0;
    }

    .final-key {
      opacity: 0;
      transform: translateY(30px);
    }

    .final-headline {
      color: var(--c-white);
      font-size: clamp(3.5rem, 10vw, 11rem);
      text-shadow:
        0 0 60px rgba(200, 127, 53, 0.2),
        0 0 120px rgba(200, 127, 53, 0.08);
    }

    .final-cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      opacity: 0;
    }

    .cta-arrow {
      transition: transform 0.3s ease;
    }

    .cta-btn:hover .cta-arrow {
      transform: translateX(6px);
    }

    .cta-sources {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .source-links {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .source-link {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: rgba(200, 127, 53, 0.7);
      letter-spacing: 0.1em;
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .source-link:hover { opacity: 0.6; }

    .sep-dot {
      color: var(--c-muted);
      font-size: 0.65rem;
    }

    /* Footer */
    .final-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      padding: 1.5rem 5vw;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      opacity: 0;
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .footer-brand { color: var(--c-accent); }

    .footer-note {
      font-family: var(--font-mono);
      font-size: 0.55rem;
      color: var(--c-muted);
      max-width: 460px;
      line-height: 1.7;
      opacity: 0.7;
    }

    .footer-right {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--c-muted);
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .footer-right:hover { color: var(--c-accent); }

    @media (max-width: 768px) {
      .final-footer { flex-direction: column; gap: 1rem; align-items: flex-start; }
    }
  `]
})
export class FinalSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('finalImg') finalImg!: ElementRef;
  @ViewChild('lightOverlay') lightOverlay!: ElementRef;
  @ViewChild('line1') line1!: ElementRef;
  @ViewChild('line2') line2!: ElementRef;
  @ViewChild('pause1') pause1!: ElementRef;
  @ViewChild('pause2') pause2!: ElementRef;
  @ViewChild('keyRef') keyRef!: ElementRef;
  @ViewChild('ctaRef') ctaRef!: ElementRef;
  @ViewChild('footerRef') footerRef!: ElementRef;

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.setupAnimations();
  }

  private setupAnimations() {
    const section = this.sectionRef.nativeElement;

    // Parallax on image
    gsap.fromTo(this.finalImg.nativeElement,
      { scale: 1.05 },
      {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    // Light overlay grows in
    gsap.to(this.lightOverlay.nativeElement, {
      opacity: 1,
      backgroundImage: `radial-gradient(
        ellipse 80% 50% at 50% 30%,
        rgba(200, 170, 80, 0.15) 0%,
        rgba(74, 184, 216, 0.05) 50%,
        transparent 80%
      )`,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 60%' }
    });

    // Narrative sequence
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    tl.to(this.line1.nativeElement, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(this.pause1.nativeElement, { opacity: 1, duration: 0.6 }, '+=0.3')
      .to(this.line2.nativeElement, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(this.pause2.nativeElement, { opacity: 1, duration: 0.6 }, '+=0.3')
      .to(this.keyRef.nativeElement, { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }, '+=0.2')
      .to(this.ctaRef.nativeElement, { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.5')
      .to(this.footerRef.nativeElement, { opacity: 1, duration: 0.8 }, '-=0.3');
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
