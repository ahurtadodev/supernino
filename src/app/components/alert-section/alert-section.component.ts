import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-alert-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full alert-section" id="section-alert" #sectionRef>

      <div class="noise-overlay"></div>

      <!-- Pulsing alert bg -->
      <div class="alert-bg" #alertBg></div>

      <!-- Content -->
      <div class="alert-content">

        <div class="alert-label">
          <span class="label-sci">11 — ALERTA</span>
        </div>

        <!-- Main message -->
        <div class="alert-main" #alertMain>
          <h2 class="headline-xl alert-h1" #h1Ref>
            NO PODEMOS<br>DETENER EL OCÉANO.
          </h2>

          <div class="alert-pause" #pauseRef>
            <div class="pause-line"></div>
          </div>

          <h2 class="headline-xl alert-h2" #h2Ref>
            PERO PODEMOS<br>PREPARARNOS.
          </h2>
        </div>

        <!-- Action grid -->
        <div class="actions-grid" #actionsGrid>
          <div class="action-card" *ngFor="let a of actions; let i = index" [attr.data-index]="i">
            <div class="action-icon" [style.color]="a.color" [innerHTML]="a.icon"></div>
            <div class="action-content">
              <h3 class="headline-sm action-title" [style.color]="a.color">{{ a.title }}</h3>
              <p class="body-narrative action-desc" style="font-size:0.88rem">{{ a.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Institutions -->
        <div class="institutions" #institutionsRef>
          <span class="label-sci">MONITOREO ACTIVO:</span>
          <div class="inst-logos">
            <span class="inst-tag" *ngFor="let inst of institutions">{{ inst }}</span>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .alert-section {
      background: #060504;
      display: flex;
      align-items: center;
      padding: 8rem 0;
      min-height: 100vh;
    }

    .alert-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(
          ellipse 80% 60% at 50% 50%,
          rgba(80, 8, 0, 0.3) 0%,
          rgba(10, 6, 4, 0.88) 60%,
          rgba(6, 5, 4, 1) 100%
        );
    }

    .alert-content {
      position: relative;
      z-index: 10;
      padding: 0 6vw;
      width: 100%;
    }

    .alert-label {
      margin-bottom: 4rem;
      opacity: 0;
    }

    .alert-main {
      margin-bottom: 6rem;
    }

    .alert-h1 {
      color: rgba(240, 244, 248, 0.5);
      opacity: 0;
      transform: translateY(40px);
      margin-bottom: 3rem;
    }

    .alert-pause {
      opacity: 0;
      margin-bottom: 3rem;
    }

    .pause-line {
      width: 60px;
      height: 2px;
      border-radius: 9999px;
      background: var(--c-accent);
      box-shadow: 0 0 12px rgba(200, 127, 53, 0.4);
    }

    .alert-h2 {
      color: var(--c-accent);
      opacity: 0;
      transform: translateY(40px);
      text-shadow:
        0 0 60px rgba(200, 127, 53, 0.25),
        0 0 120px rgba(200, 127, 53, 0.1);
    }

    /* Actions grid */
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 4rem;
    }

    .action-card {
      display: flex;
      gap: 1.25rem;
      padding: 2rem 1.6rem;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 24px;
      background: rgba(10, 22, 38, 0.5);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .action-card:hover {
      border-color: rgba(184, 125, 58, 0.35);
      background: rgba(14, 28, 48, 0.75);
      transform: translateY(-4px);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
    }

    .action-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }

    .action-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .action-title {
      font-size: clamp(1rem, 1.5vw, 1.4rem);
    }

    .action-desc {
      color: #8099b0;
      font-size: 0.82rem;
      line-height: 1.55;
    }

    /* Institutions */
    .institutions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      opacity: 0;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .inst-logos {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .inst-tag {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      padding: 0.35rem 0.9rem;
      border: 1px solid rgba(74, 184, 216, 0.22);
      border-radius: 9999px;
      color: rgba(74, 184, 216, 0.8);
      background: rgba(74, 184, 216, 0.06);
    }

    @media (max-width: 768px) {
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AlertSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('h1Ref') h1Ref!: ElementRef;
  @ViewChild('h2Ref') h2Ref!: ElementRef;
  @ViewChild('pauseRef') pauseRef!: ElementRef;
  @ViewChild('actionsGrid') actionsGrid!: ElementRef;
  @ViewChild('institutionsRef') institutionsRef!: ElementRef;

  actions = [
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2"/><path d="M12 8v4l3 3"/></svg>`,
      title: 'MONITOREO',
      desc: 'Sistemas de observación del océano y la atmósfera detectan señales tempranas de anomalías climáticas.',
      color: '#3a9db8',
    },
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
      title: 'SISTEMAS DE ALERTA',
      desc: 'Redes de alerta temprana permiten notificar a las poblaciones antes de que los eventos alcancen su pico.',
      color: '#b05a20',
    },
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'INFRAESTRUCTURA',
      desc: 'La construcción de obras de defensa ribereña y drenaje reduce significativamente el riesgo de inundaciones.',
      color: '#7a94aa',
    },
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      title: 'PLANIFICACIÓN',
      desc: 'Los planes de contingencia y evacuación definidos con anticipación salvan vidas cuando llega el evento.',
      color: '#b87d3a',
    },
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M6.34 6.34l1.42 1.42M15.24 15.24l1.42 1.42M2 12h2M20 12h2M6.34 17.66l1.42-1.42M15.24 8.76l1.42-1.42M12 2v2M12 20v2"/></svg>`,
      title: 'CIENCIA',
      desc: 'La investigación climática peruana genera modelos de predicción cada vez más precisos.',
      color: '#3a9db8',
    },
    {
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      title: 'INFORMACIÓN',
      desc: 'Una ciudadanía informada toma mejores decisiones. El conocimiento es la primera línea de prevención.',
      color: '#7a94aa',
    },
  ];

  institutions = ['SENAMHI', 'NOAA', 'INDECI', 'ANA', 'IGP', 'MINAM'];

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.setupAnimations();
  }

  private setupAnimations() {
    const section = this.sectionRef.nativeElement;

    // Label
    const label = section.querySelector('.alert-label');
    if (label) {
      gsap.to(label, {
        opacity: 1, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 75%' }
      });
    }

    // Headline 1 (despair)
    gsap.to(this.h1Ref.nativeElement, {
      opacity: 1, y: 0, duration: 1.5, ease: 'power4.out',
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    // Pause line
    gsap.to(this.pauseRef.nativeElement, {
      opacity: 1, duration: 0.6,
      scrollTrigger: { trigger: section, start: 'top 60%' }
    });

    // Headline 2 (hope/action)
    gsap.to(this.h2Ref.nativeElement, {
      opacity: 1, y: 0, duration: 1.5, ease: 'power4.out',
      scrollTrigger: { trigger: section, start: 'top 55%' }
    });

    // Action cards stagger
    const cards = this.actionsGrid.nativeElement.querySelectorAll('.action-card');
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: this.actionsGrid.nativeElement, start: 'top 75%' }
    });

    // Institutions
    gsap.to(this.institutionsRef.nativeElement, {
      opacity: 1, duration: 1,
      scrollTrigger: { trigger: this.institutionsRef.nativeElement, start: 'top 85%' }
    });
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
