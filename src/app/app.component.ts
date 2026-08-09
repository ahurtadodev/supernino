import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent }           from './components/nav/nav.component';
import { OpeningComponent }        from './components/opening/opening.component';
import { OceanComponent }          from './components/ocean/ocean.component';
import { TemperatureComponent }    from './components/temperature/temperature.component';
import { ConnectedComponent }      from './components/connected/connected.component';
import { PeruMapComponent }        from './components/peru-map/peru-map.component';
import { CoastComponent }          from './components/coast/coast.component';
import { RiversComponent }         from './components/rivers/rivers.component';
import { ImpactComponent }         from './components/impact/impact.component';
import { ClimaxComponent }         from './components/climax/climax.component';
import { DataSectionComponent }    from './components/data-section/data-section.component';
import { AlertSectionComponent }   from './components/alert-section/alert-section.component';
import { FinalSectionComponent }   from './components/final-section/final-section.component';
import { ScrollAnimationService }  from './services/scroll-animation.service';

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
  ],
  template: `
    <!-- Loading Screen -->
    <div id="loading-screen" [class.hidden]="loaded">
      <div class="loading-brand">
        <span class="label-sci" style="font-size:0.7rem;letter-spacing:0.3em;color:#8099b0">
          CARGANDO EXPERIENCIA
        </span>
      </div>
      <div class="loading-bar-track" style="margin-top:1.5rem">
        <div class="loading-bar-fill" [style.width]="loadProgress + '%'"></div>
      </div>
      <div style="margin-top:0.75rem;font-family:'Space Mono',monospace;font-size:0.65rem;color:#8099b0;letter-spacing:0.1em">
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
      <app-ocean></app-ocean>

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
      <app-climax></app-climax>

      <!-- 10 — Los Datos Hablan -->
      <app-data-section></app-data-section>

      <!-- 11 — Alerta -->
      <app-alert-section></app-alert-section>

      <!-- 12 — Final -->
      <app-final-section></app-final-section>

    </main>
  `,
  styles: [`
    :host {
      display: block;
    }

    #loading-screen {
      position: fixed;
      inset: 0;
      background: #040c14;
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

    .loading-brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      color: #f0f4f8;
      letter-spacing: 0.1em;
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

  constructor(private scrollAnim: ScrollAnimationService) {}

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
