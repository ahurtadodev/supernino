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
      <div class="nav-logo">
        <span>EL NIÑO</span>
        <span>·</span>
        <span>PERÚ 2026</span>
      </div>

      <!-- Center: progress indicator -->
      <div class="nav-progress" [class.visible]="scrollProgress > 0.02">
        <div class="nav-progress-track">
          <div class="nav-progress-fill" [style.width]="(scrollProgress * 100) + '%'"></div>
        </div>
        <span class="nav-section-label label-sci">{{ currentSection }}</span>
      </div>

      <!-- Right: scroll hint / scroll % -->
      <div class="nav-right">
        <span class="nav-scroll-indicator" [class.hidden]="scrolled">
          SCROLL PARA EXPLORAR
        </span>
        <span class="nav-pct label-sci" [class.visible]="scrolled">
          {{ Math.round(scrollProgress * 100) }}%
        </span>
      </div>

    </nav>
  `,
  styles: [`
:host {
  display: block;
  width: 100%;
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
  background: #4ab8d8;
  box-shadow: 0 0 8px rgba(74, 184, 216, 0.5);
  transition: width 0.1s linear;
}

.nav-section-label {
  font-size: clamp(0.65rem, 0.55vw, 0.75rem);
  color: #8099b0;
  letter-spacing: 0.15em;
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

  ngOnDestroy() { }
}
