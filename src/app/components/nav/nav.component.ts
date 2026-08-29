import {
  Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="nav-bar" [class.scrolled]="scrolled" #navRef id="main-nav">

      <!-- Logo -->
      <a class="nav-logo" href="#" (click)="goToTop($event)">
        <span>EL NIÑO</span>
        <span>·</span>
        <span>PERÚ 2026</span>
      </a>

      <!-- Center: Links & progress indicator -->
      <div class="nav-center-wrap">
        <div class="nav-quick-links" [class.visible]="scrolled">
          <a class="nav-link-pill" (click)="scrollToSection('section-peru-map')">Mapa de Alerta</a>
          <a class="nav-link-pill" (click)="scrollToSection('section-data')">Cronograma</a>
          <a class="nav-link-pill nav-link-highlight" (click)="scrollToSection('catalog')">Blindaje de Techos</a>
        </div>

        <div class="nav-progress" [class.visible]="scrollProgress > 0.02 && !scrolled">
          <div class="nav-progress-track">
            <div class="nav-progress-fill" [style.width]="(scrollProgress * 100) + '%'"></div>
          </div>
          <span class="nav-section-label label-sci">{{ currentSection }}</span>
        </div>
      </div>

      <!-- Right: Direct CTA / scroll % -->
      <div class="nav-right">
        <a
          href="https://wa.me/51908801093?text=Hola,%20solicito%20cotizaci%C3%B3n%20para%20blindaje%20de%20techos%20ante%20El%20Ni%C3%B1o%202026-2027"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-cta-pill"
          [class.visible]="scrolled">
          <span>Cotizar</span>
          <span class="cta-dot"></span>
        </a>
        <span class="nav-scroll-indicator" [class.hidden]="scrolled">
          SCROLL PARA EXPLORAR
        </span>
      </div>

    </nav>
  `,
  styles: [`
:host {
  display: block;
  width: 100%;
}

.nav-center-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-quick-links {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

.nav-quick-links.visible {
  display: flex;
}

.nav-link-pill {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-muted);
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;

  &:hover {
    color: var(--c-white);
    background: rgba(255, 255, 255, 0.06);
  }
}

.nav-link-pill.nav-link-highlight {
  color: var(--c-accent);
  background: rgba(200, 127, 53, 0.1);
  border: 1px solid rgba(200, 127, 53, 0.25);

  &:hover {
    background: rgba(200, 127, 53, 0.2);
    color: #ffffff;
  }
}

.nav-cta-pill {
  display: none;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.9rem;
  background: rgba(200, 127, 53, 0.15);
  border: 1px solid rgba(200, 127, 53, 0.4);
  border-radius: 9999px;
  color: var(--c-accent);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--c-accent);
    color: #080808;
    box-shadow: 0 0 15px rgba(200, 127, 53, 0.4);
  }
}

.nav-cta-pill.visible {
  display: inline-flex;
}

.cta-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #25d366;
  box-shadow: 0 0 6px #25d366;
}

/* ================================
   NAV RIGHT
================================ */

.nav-right {
  position: relative;
  min-width: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-right .nav-scroll-indicator {
  transition: opacity 0.4s ease;
  white-space: nowrap;
}

.nav-right .nav-scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

.nav-right .nav-pct {
  position: absolute;
  opacity: 0;
  transition: opacity 0.4s ease;
  font-size: 0.65rem;
}

.nav-right .nav-pct.visible {
  opacity: 1;
}

/* ================================
   PROGRESS
================================ */

.nav-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  width: clamp(140px, 20vw, 200px);
  min-width: 0;

  opacity: 0;
  transition: opacity 0.5s ease;
}

.nav-progress.visible {
  opacity: 1;
}

.nav-progress-track {
  width: 100%;
  height: 1px;
  background: rgba(240, 244, 248, 0.1);
  position: relative;
  overflow: hidden;
}

.nav-progress-fill {
  height: 100%;
  background: #b87d3a;
  box-shadow: 0 0 6px rgba(184, 125, 58, 0.4);
  transition: width 0.1s linear;
}

.nav-section-label {
  font-size: clamp(0.55rem, 0.5vw, 0.65rem);
  color: rgba(184, 125, 58, 0.65);
  letter-spacing: 0.18em;
  white-space: nowrap;
}

/* ================================
   TABLET
================================ */

@media (max-width: 768px) {

  .nav-progress {
    width: clamp(100px, 25vw, 160px);
  }

  .nav-right {
    min-width: 80px;
  }

  .nav-right .nav-scroll-indicator {
    font-size: 0.55rem;
  }

  .nav-logo {
    font-size: 0.7rem;
  }
}

/* ================================
   MOBILE
================================ */

@media (max-width: 600px) {

  .nav-progress {
    width: 100px;
  }

  .nav-section-label {
    font-size: 0.45rem;
    letter-spacing: 0.1em;
  }

  .nav-right {
    min-width: 40px;
  }

  /* Quitamos el texto largo */
  .nav-scroll-indicator {
    display: none;
  }

  .nav-right .nav-pct {
    position: static;
    font-size: 0.6rem;
  }

  .nav-logo {
    font-size: 0.6rem;
    letter-spacing: 0.08em;
  }
}

/* ================================
   MOBILE PEQUEÑO
================================ */

@media (max-width: 400px) {

  .nav-progress {
    width: 70px;
  }

  .nav-section-label {
    display: none;
  }

  .nav-logo {
    font-size: 0.55rem;
  }

  .nav-right {
    min-width: 30px;
  }
}
  `]
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('navRef') navRef!: ElementRef;

  scrolled = false;
  scrollProgress = 0;
  currentSection = 'APERTURA';
  Math = Math;

  private sections: { id: string; label: string; el?: Element }[] = [
    { id: 'section-opening', label: 'APERTURA' },
    { id: 'section-ocean', label: 'EL OCÉANO' },
    { id: 'section-temperature', label: 'TEMPERATURA' },
    { id: 'section-connected', label: 'CONECTADO' },
    { id: 'section-peru-map', label: 'PERÚ' },
    { id: 'section-coast', label: 'LA COSTA' },
    { id: 'section-rivers', label: 'RÍOS' },
    { id: 'section-impact', label: 'IMPACTO' },
    { id: 'section-climax', label: 'TENSIÓN' },
    { id: 'section-data', label: 'DATOS' },
    { id: 'section-alert', label: 'ALERTA' },
    { id: 'section-final', label: 'PREVENCIÓN' },
  ];

  ngOnInit() {
    // Detect sections after DOM is ready
    setTimeout(() => {
      this.sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) s.el = el;
      });
    }, 500);
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = Math.min(1, scrollY / docH);
    this.scrolled = scrollY > 80;

    // Find current section
    const viewMid = scrollY + window.innerHeight / 2;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const s = this.sections[i];
      if (s.el) {
        const top = (s.el as HTMLElement).offsetTop;
        if (viewMid >= top) {
          this.currentSection = s.label;
          break;
        }
      }
    }
  }

  scrollToSection(targetId: string) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() { }
}
