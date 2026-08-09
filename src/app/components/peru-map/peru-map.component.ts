import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-peru-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full peru-map-section" id="section-peru-map" #sectionRef>
      <div class="noise-overlay"></div>
      <div class="scanlines"></div>

      <!-- Background gradient -->
      <div class="map-bg-gradient"></div>

      <!-- Content layout -->
      <div class="map-layout">

        <!-- Left: Text -->
        <div class="map-text-col">
          <span class="label-sci reveal-opacity" #labelRef>05 — EL MAPA DEL PERÚ</span>

          <div class="map-title-block">
            <h2 class="headline-xl map-title" #titlePeruRef>PERÚ</h2>
            <div class="map-subtitle reveal-up" #subtitleRef>
              <p>¿QUÉ PASA CUANDO<br>EL CLIMA CAMBIA?</p>
            </div>
          </div>

          <!-- Region list -->
          <div class="region-list" #regionListRef>
            <div *ngFor="let region of regions"
                 class="region-item"
                 [class.active]="region.active"
                 (mouseenter)="highlightRegion(region.id)"
                 (mouseleave)="clearHighlight()">
              <div class="region-dot" [style.background]="region.active ? region.color : ''"></div>
              <span class="label-sci region-name" [style.color]="region.active ? region.color : ''">
                {{ region.name }}
              </span>
            </div>
          </div>

          <!-- Connection chain -->
          <div class="connection-chain reveal-up" #chainRef>
            <div *ngFor="let step of chain; let i = index"
                 class="chain-step"
                 [class.chain-step--active]="step.active">
              <span class="label-sci chain-text" [style.color]="step.active ? step.color : ''">
                {{ step.label }}
              </span>
              <div class="chain-arrow" *ngIf="i < chain.length - 1">→</div>
            </div>
          </div>
        </div>

        <!-- Right: SVG Map -->
        <div class="map-svg-col" #mapColRef>
          <svg class="peru-svg" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" #mapSvgRef>
            <!-- Peru simplified outline -->
            <!-- Norte coast -->
            <path id="region-norte"
              d="M80,20 L120,15 L145,25 L148,45 L140,65 L135,85 L130,105 L118,115 L105,110 L90,100 L80,85 L72,65 L70,45 Z"
              class="peru-map-region"
              [class.active-norte]="activeRegion === 'norte' || animPhase >= 1"
              (mouseenter)="highlightRegion('norte')" />

            <!-- Central coast -->
            <path id="region-central"
              d="M118,115 L130,105 L135,85 L140,65 L148,45 L155,55 L158,80 L155,100 L150,125 L142,145 L130,160 L118,165 L108,155 L110,135 Z"
              class="peru-map-region"
              [class.active-central]="activeRegion === 'central' || animPhase >= 2"
              (mouseenter)="highlightRegion('central')" />

            <!-- Sur coast -->
            <path id="region-sur"
              d="M130,160 L142,145 L150,125 L155,100 L162,115 L165,140 L162,165 L155,185 L145,200 L132,210 L118,205 L115,185 Z"
              class="peru-map-region"
              [class.active-central]="activeRegion === 'sur' || animPhase >= 2"
              (mouseenter)="highlightRegion('sur')" />

            <!-- Andes -->
            <path id="region-andes"
              d="M148,45 L190,30 L220,40 L235,70 L238,100 L232,130 L225,160 L215,190 L200,215 L185,230 L165,235 L155,185 L162,165 L165,140 L162,115 L155,100 L158,80 L155,55 L148,45 Z"
              class="peru-map-region"
              [class.active-andes]="activeRegion === 'andes' || animPhase >= 3"
              (mouseenter)="highlightRegion('andes')" />

            <!-- Selva Norte -->
            <path id="region-selva-norte"
              d="M190,30 L240,20 L275,35 L285,60 L280,90 L272,120 L260,140 L248,150 L238,100 L235,70 L220,40 Z"
              class="peru-map-region"
              [class.active-selva]="activeRegion === 'selva' || animPhase >= 4"
              (mouseenter)="highlightRegion('selva')" />

            <!-- Selva Central/Sur -->
            <path id="region-selva-sur"
              d="M238,100 L248,150 L260,140 L272,120 L280,90 L285,150 L278,200 L268,240 L255,270 L240,290 L220,295 L200,285 L185,265 L185,230 L200,215 L215,190 L225,160 L232,130 Z"
              class="peru-map-region"
              [class.active-selva]="activeRegion === 'selva' || animPhase >= 4"
              (mouseenter)="highlightRegion('selva')" />

            <!-- Sur extreme -->
            <path id="region-sur-ext"
              d="M132,210 L145,200 L155,185 L165,235 L185,230 L185,265 L178,290 L168,310 L155,325 L140,330 L125,320 L118,300 L120,275 L125,250 Z"
              class="peru-map-region"
              [class.active-andes]="activeRegion === 'andes' || animPhase >= 3"
              (mouseenter)="highlightRegion('andes')" />

            <!-- Glowing outline of full Peru -->
            <path
              d="M80,20 L120,15 L145,25 L190,30 L240,20 L275,35 L285,60 L280,90 L272,120 L285,150 L278,200 L268,240 L255,270 L240,290 L220,295 L200,285 L185,265 L185,230 L165,235 L155,325 L140,330 L125,320 L118,300 L120,275 L125,250 L132,210 L118,205 L115,185 L130,160 L142,145 L150,125 L155,100 L158,80 L155,55 L148,45 L140,65 L135,85 L130,105 L118,115 L105,110 L90,100 L80,85 L72,65 L70,45 Z"
              fill="none"
              stroke="rgba(42,111,168,0.5)"
              stroke-width="1.5"
              class="peru-outline" />

            <!-- Flow lines: Ocean -> Rain -> Rivers -> Cities -->
            <g class="flow-lines" #flowLinesRef>
              <path class="flow-line"
                d="M 20,50 Q 50,60 80,70"
                stroke="#4ab8d8" stroke-width="1.5" fill="none"
                stroke-dasharray="5,5" opacity="0" />
              <path class="flow-line"
                d="M 100,80 Q 115,100 118,115"
                stroke="#1a4a6e" stroke-width="1.5" fill="none"
                stroke-dasharray="5,5" opacity="0" />
              <path class="flow-line"
                d="M 95,120 Q 100,140 105,155"
                stroke="#c45c00" stroke-width="1.5" fill="none"
                stroke-dasharray="5,5" opacity="0" />
            </g>

            <!-- City dots -->
            <g class="city-dots" #cityDotsRef>
              <circle cx="95" cy="155" r="3" fill="#c45c00" opacity="0" class="city-dot" />
              <text x="85" y="152" font-size="6" fill="#8099b0" font-family="Space Mono" opacity="0" class="city-label">Lima</text>

              <circle cx="88" cy="58" r="3" fill="#f07a1a" opacity="0" class="city-dot" />
              <text x="78" y="55" font-size="6" fill="#8099b0" font-family="Space Mono" opacity="0" class="city-label">Piura</text>

              <circle cx="92" cy="35" r="3" fill="#f07a1a" opacity="0" class="city-dot" />
              <text x="82" y="32" font-size="6" fill="#8099b0" font-family="Space Mono" opacity="0" class="city-label">Tumbes</text>

              <circle cx="200" cy="135" r="3" fill="#4ab8d8" opacity="0" class="city-dot" />
              <text x="204" y="137" font-size="6" fill="#8099b0" font-family="Space Mono" opacity="0" class="city-label">Cusco</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .peru-map-section {
      background: #040c14;
      display: flex;
      align-items: center;
      min-height: 100vh;
      padding: 6rem 0;
    }

    .map-bg-gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 60% 80% at 70% 50%,
        rgba(13, 33, 55, 0.6) 0%,
        transparent 70%
      );
      z-index: 1;
    }

    .map-layout {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      width: 100%;
      padding: 0 5vw;
      align-items: center;
    }

    .map-text-col {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .map-title-block {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .map-title {
      color: #f0f4f8;
      font-size: clamp(5rem, 15vw, 14rem);
      opacity: 0;
      transform: translateX(-50px);
    }

    .map-subtitle {
      font-family: 'Space Mono', monospace;
      font-size: clamp(1rem, 2vw, 1.4rem);
      color: #8099b0;
      line-height: 1.5;
    }

    .region-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .region-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      padding: 0.4rem 0;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateX(-20px);
    }

    .region-item:hover {
      transform: translateX(4px);
    }

    .region-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(240, 244, 248, 0.2);
      transition: all 0.4s ease;
      flex-shrink: 0;
    }

    .region-item.active .region-dot {
      box-shadow: 0 0 8px currentColor;
    }

    .region-name {
      transition: color 0.3s ease;
    }

    .connection-chain {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      padding: 1rem;
      border: 1px solid rgba(42, 111, 168, 0.15);
      background: rgba(13, 33, 55, 0.3);
    }

    .chain-step {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0.4;
      transition: opacity 0.4s ease;
    }

    .chain-step--active { opacity: 1; }

    .chain-text {
      font-size: 0.65rem;
      transition: color 0.4s ease;
    }

    .chain-arrow {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      color: #8099b0;
    }

    /* SVG Map */
    .map-svg-col {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateX(50px) scale(0.9);
    }

    .peru-svg {
      width: 100%;
      max-width: 380px;
      height: auto;
      filter: drop-shadow(0 0 30px rgba(42, 111, 168, 0.2));
    }

    .peru-outline {
      filter: drop-shadow(0 0 8px rgba(42, 111, 168, 0.5));
      animation: outlinePulse 3s ease-in-out infinite;
    }

    @keyframes outlinePulse {
      0%, 100% { stroke-opacity: 0.3; }
      50% { stroke-opacity: 0.7; }
    }

    .peru-map-region {
      fill: transparent;
      stroke: rgba(42, 111, 168, 0.2);
      stroke-width: 0.5;
      cursor: pointer;
      transition: fill 0.6s ease, stroke 0.6s ease;
    }

    .active-norte {
      fill: rgba(196, 92, 0, 0.4);
      stroke: rgba(240, 122, 26, 0.8);
      filter: drop-shadow(0 0 6px rgba(196, 92, 0, 0.5));
    }

    .active-central {
      fill: rgba(224, 80, 0, 0.3);
      stroke: rgba(224, 80, 0, 0.6);
    }

    .active-andes {
      fill: rgba(42, 111, 168, 0.3);
      stroke: rgba(74, 184, 216, 0.6);
    }

    .active-selva {
      fill: rgba(30, 90, 50, 0.3);
      stroke: rgba(74, 184, 216, 0.4);
    }

    @media (max-width: 768px) {
      .map-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .map-svg-col {
        order: -1;
      }
    }
  `]
})
export class PeruMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('labelRef') labelRef!: ElementRef;
  @ViewChild('titlePeruRef') titlePeruRef!: ElementRef;
  @ViewChild('subtitleRef') subtitleRef!: ElementRef;
  @ViewChild('mapColRef') mapColRef!: ElementRef;
  @ViewChild('cityDotsRef') cityDotsRef!: ElementRef;
  @ViewChild('regionListRef') regionListRef!: ElementRef;
  @ViewChild('chainRef') chainRef!: ElementRef;

  activeRegion: string | null = null;
  animPhase = 0;

  regions = [
    { id: 'norte', name: 'COSTA NORTE · PIURA, TUMBES', color: '#f07a1a', active: false },
    { id: 'central', name: 'COSTA CENTRAL · LIMA', color: '#c45c00', active: false },
    { id: 'andes', name: 'ANDES · CUENCAS HIDROGRÁFICAS', color: '#4ab8d8', active: false },
    { id: 'selva', name: 'SELVA · AFLUENTES AMAZÓNICOS', color: '#7ec8e3', active: false },
  ];

  chain = [
    { label: 'OCÉANO', color: '#4ab8d8', active: false },
    { label: 'LLUVIA', color: '#1a4a6e', active: false },
    { label: 'RÍOS', color: '#c45c00', active: false },
    { label: 'CIUDADES', color: '#e03000', active: false },
  ];

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.setupAnimations();
  }

  highlightRegion(id: string) {
    this.activeRegion = id;
    this.regions.forEach(r => r.active = r.id === id);
  }

  clearHighlight() {
    this.activeRegion = null;
    this.regions.forEach(r => r.active = false);
  }

  private setupAnimations() {
    const section = this.sectionRef.nativeElement;

    // Label
    gsap.fromTo(this.labelRef.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 75%' }
      }
    );

    // PERÚ title
    gsap.to(this.titlePeruRef.nativeElement, {
      opacity: 1, x: 0, duration: 1.5, ease: 'power4.out',
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });

    // Subtitle
    gsap.fromTo(this.subtitleRef.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4,
        scrollTrigger: { trigger: section, start: 'top 70%' }
      }
    );

    // Map column
    gsap.to(this.mapColRef.nativeElement, {
      opacity: 1, x: 0, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.3,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });

    // Region list items stagger
    const regionItems = this.regionListRef.nativeElement.querySelectorAll('.region-item');
    gsap.to(regionItems, {
      opacity: 1, x: 0, duration: 0.7, stagger: 0.15, delay: 0.5,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });

    // Chain reveal
    gsap.fromTo(this.chainRef.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1,
        scrollTrigger: { trigger: section, start: 'top 60%' }
      }
    );

    // Animate anim phases for region auto-highlight
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      onEnter: () => {
        this.animateRegions();
        this.animateChain();
        this.animateCityDots();
      }
    });
  }

  private animateRegions() {
    const phases = [1, 2, 3, 4];
    phases.forEach((phase, i) => {
      setTimeout(() => {
        this.animPhase = phase;
      }, i * 600);
    });
    setTimeout(() => {
      this.animPhase = 0;
    }, phases.length * 600 + 800);
  }

  private animateChain() {
    this.chain.forEach((step, i) => {
      setTimeout(() => {
        step.active = true;
      }, i * 400 + 200);
    });
  }

  private animateCityDots() {
    const dots = this.cityDotsRef.nativeElement.querySelectorAll('.city-dot, .city-label');
    gsap.to(dots, { opacity: 1, duration: 0.5, stagger: 0.3, delay: 0.5 });
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
