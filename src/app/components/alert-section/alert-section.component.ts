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
            <div class="action-icon" [style.color]="a.color">{{ a.icon }}</div>
            <div class="action-content">
              <h3 class="headline-sm action-title" [style.color]="a.color">{{ a.title }}</h3>
              <p class="body-narrative action-desc" style="font-size:0.9rem">{{ a.desc }}</p>
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
      background: #04080e;
      display: flex;
      align-items: center;
      padding: 8rem 0;
      min-height: 100vh;
    }

    .alert-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 80% 60% at 50% 50%,
        rgba(30, 10, 60, 0.4) 0%,
        rgba(4, 8, 14, 0.95) 70%
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
      height: 1px;
      background: #4ab8d8;
      box-shadow: 0 0 10px rgba(74, 184, 216, 0.5);
    }

    .alert-h2 {
      color: #4ab8d8;
      opacity: 0;
      transform: translateY(40px);
      text-shadow:
        0 0 60px rgba(74, 184, 216, 0.25),
        0 0 120px rgba(74, 184, 216, 0.1);
    }

    /* Actions grid */
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2px;
      margin-bottom: 4rem;
    }

    .action-card {
      display: flex;
      gap: 1.25rem;
      padding: 2rem 1.5rem;
      border: 1px solid rgba(42, 111, 168, 0.1);
      background: rgba(10, 22, 38, 0.5);
      opacity: 0;
      transform: translateY(20px);
      transition: border-color 0.4s ease, background 0.4s ease;
    }

    .action-card:hover {
      border-color: rgba(74, 184, 216, 0.3);
      background: rgba(10, 22, 38, 0.8);
    }

    .action-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }

    .action-content {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .action-title {
      font-size: clamp(1rem, 1.8vw, 1.8rem);
    }

    .action-desc {
      color: #8099b0;
      font-size: 0.9rem;
    }

    /* Institutions */
    .institutions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      opacity: 0;
      padding-top: 2rem;
      border-top: 1px solid rgba(42, 111, 168, 0.1);
    }

    .inst-logos {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .inst-tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      padding: 0.4rem 0.8rem;
      border: 1px solid rgba(74, 184, 216, 0.2);
      color: #4ab8d8;
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
      icon: '📡',
      title: 'MONITOREO',
      desc: 'Sistemas de observación del océano y la atmósfera detectan señales tempranas de anomalías climáticas.',
      color: '#4ab8d8',
    },
    {
      icon: '🚨',
      title: 'SISTEMAS DE ALERTA',
      desc: 'Redes de alerta temprana permiten notificar a las poblaciones antes de que los eventos alcancen su pico.',
      color: '#f07a1a',
    },
    {
      icon: '🏗️',
      title: 'INFRAESTRUCTURA',
      desc: 'La construcción de obras de defensa ribereña y drenaje reduce significativamente el riesgo de inundaciones.',
      color: '#7ec8e3',
    },
    {
      icon: '📋',
      title: 'PLANIFICACIÓN',
      desc: 'Los planes de contingencia y evacuación definidos con anticipación salvan vidas cuando llega el evento.',
      color: '#c45c00',
    },
    {
      icon: '🔬',
      title: 'CIENCIA',
      desc: 'La investigación climática peruana genera modelos de predicción cada vez más precisos.',
      color: '#4ab8d8',
    },
    {
      icon: '📚',
      title: 'INFORMACIÓN',
      desc: 'Una ciudadanía informada toma mejores decisiones. El conocimiento es la primera línea de prevención.',
      color: '#7ec8e3',
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
