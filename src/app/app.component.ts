import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './components/nav/nav.component';
import { OpeningComponent } from './components/opening/opening.component';
import { OceanComponent } from './components/ocean/ocean.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { ConnectedComponent } from './components/connected/connected.component';
import { PeruMapComponent } from './components/peru-map/peru-map.component';
import { CoastComponent } from './components/coast/coast.component';
import { RiversComponent } from './components/rivers/rivers.component';
import { ImpactComponent } from './components/impact/impact.component';
import { ClimaxComponent } from './components/climax/climax.component';
import { DataSectionComponent } from './components/data-section/data-section.component';
import { AlertSectionComponent } from './components/alert-section/alert-section.component';
import { FinalSectionComponent } from './components/final-section/final-section.component';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { CatalogComponent } from './components/catalog/catalog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    OpeningComponent,
    OceanComponent,
    TemperatureComponent,
    ConnectedComponent,
    PeruMapComponent,
    CoastComponent,
    RiversComponent,
    ImpactComponent,
    ClimaxComponent,
    DataSectionComponent,
    AlertSectionComponent,
    FinalSectionComponent,
    CatalogComponent,
  ],
  template: `
    <!-- Loading Screen -->
    <div id="loading-screen" [class.hidden]="loaded">
      <div class="loading-brand">
        <span class="label-sci" style="font-size:0.7rem;letter-spacing:0.3em;color:#8099b0">
          CARGANDO...
        </span>
      </div>
      <div class="loading-bar-track" style="margin-top:1.5rem">
        <div class="loading-bar-fill" [style.width]="loadProgress + '%'"></div>
      </div>
      <div style="margin-top:0.75rem;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:rgba(122,148,170,0.7);letter-spacing:0.12em">
        {{ loadProgress }}%
      </div>
    </div>

    <!-- Navigation -->
    <app-nav></app-nav>

    <!-- Main cinematic scroll container -->
    <main class="main-container" [class.content-visible]="loaded">

      <!-- 01 — Opening -->
      <app-opening></app-opening>

      <!-- 02 — El Océano -->
      <!-- <app-ocean></app-ocean> -->

      <!-- 03 — La Temperatura Cambia -->
      <app-temperature></app-temperature>

      <!-- 04 — Todo Se Conecta (Sticky) -->
      <app-connected></app-connected>

      <!-- 05 — El Mapa del Perú -->
      <app-peru-map></app-peru-map>

      <!-- 06 — La Costa -->
      <app-coast></app-coast>

      <!-- 07 — Cuando los Ríos Responden -->
      <app-rivers></app-rivers>

      <!-- 08 — El Impacto (4 escenas) -->
      <app-impact></app-impact>

      <!-- 09 — Momento de Máxima Tensión -->
      <!-- <app-climax></app-climax> -->

      <!-- 10 — Los Datos Hablan -->
      <app-data-section></app-data-section>

      <!-- 11 — Alerta -->
      <!-- <app-alert-section></app-alert-section> -->

      <!-- 12 — Catálogo Oficial CIMAK -->
      <app-catalog></app-catalog>
    </main>

    <!-- Floating WhatsApp Advisor Pill (Sleek Rounded Button) -->
    <aside class="floating-advisor" [class.visible]="loaded">
      <a
        href="https://wa.me/51908801093?text=Hola,%20solicito%20asesor%C3%ADa%20t%C3%A9cnica%20para%20blindaje%20de%20techos%20ante%20El%20Ni%C3%B1o%202026-2027"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-advisor-btn"
        aria-label="Asesoría Técnica de Techos por WhatsApp">
        <span class="live-pulse-dot"></span>
        <svg class="wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <span class="btn-text">Cotizar Blindaje de Techos</span>
      </a>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }

    #loading-screen {
      position: fixed;
      inset: 0;
      background: #080808;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }

    #loading-screen.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .loading-bar-track {
      width: 220px;
      height: 2px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .loading-bar-fill {
      height: 100%;
      background: var(--c-accent);
      box-shadow: 0 0 10px rgba(200, 127, 53, 0.5);
      transition: width 0.3s ease;
    }

    /* Floating Advisor Button */
    .floating-advisor {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 900;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      pointer-events: none;
    }

    .floating-advisor.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .floating-advisor-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.4rem;
      background: rgba(14, 12, 10, 0.88);
      border: 1px solid rgba(200, 127, 53, 0.4);
      border-radius: 9999px;
      color: #f0ece6;
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(200, 127, 53, 0.15);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .floating-advisor-btn:hover {
      background: rgba(24, 20, 16, 0.95);
      border-color: var(--c-accent);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(200, 127, 53, 0.35);
      color: #ffffff;
    }

    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #25d366;
      box-shadow: 0 0 10px #25d366;
      animation: advisorPulse 2s ease-in-out infinite;
    }

    @keyframes advisorPulse {
      0%, 100% { opacity: 0.5; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.3); }
    }

    .wa-icon {
      width: 16px;
      height: 16px;
      color: #25d366;
    }

    @media (max-width: 600px) {
      .floating-advisor {
        bottom: 1rem;
        right: 1rem;
      }
      .floating-advisor-btn {
        padding: 0.65rem 1.1rem;
        font-size: 0.65rem;
      }
    }

    .loading-brand {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #f0f4f8;
      margin-bottom: 0.5rem;
    }

    .main-container {
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .main-container.content-visible {
      opacity: 1;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  loaded = false;
  loadProgress = 0;

  private loadInterval!: ReturnType<typeof setInterval>;

  constructor(private scrollAnim: ScrollAnimationService) { }

  ngOnInit() {
    this.simulateLoading();
  }

  ngAfterViewInit() {
    this.scrollAnim.init();
  }

  private simulateLoading() {
    let progress = 0;
    this.loadInterval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      this.loadProgress = Math.min(100, Math.round(progress));
      if (this.loadProgress >= 100) {
        clearInterval(this.loadInterval);
        setTimeout(() => {
          this.loaded = true;
          this.scrollAnim.refresh();
        }, 400);
      }
    }, 80);
  }

  ngOnDestroy() {
    if (this.loadInterval) clearInterval(this.loadInterval);
    this.scrollAnim.kill();
  }
}
