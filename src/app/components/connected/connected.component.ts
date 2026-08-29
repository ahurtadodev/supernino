import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-connected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sticky-container connected-wrapper" id="section-connected" #wrapperRef
         [style.height]="totalHeight + 'vh'">

      <div class="sticky-panel" #stickyPanel>
        <!-- Background images cross-fade layer -->
        <div class="scene-images-wrap">
          <div *ngFor="let scene of scenes; let i = index"
               class="scene-img-layer"
               [class.active-img]="i === currentSceneIndex"
               [style.opacity]="i === currentSceneIndex ? 1 : 0">
            <img [src]="scene.image" [alt]="scene.title" class="cinematic-img scene-bg-photo" />
            <div class="scene-gradient-overlay" [style.background]="getOverlayGradient(scene.color)"></div>
          </div>
        </div>

        <!-- Noise + scanlines -->
        <div class="noise-overlay"></div>
        <div class="scanlines"></div>

        <!-- Scene content -->
        <div class="scene-container">

          <!-- Top section label -->
          <div class="connected-label">
            <span class="label-sci tracking-widest text-cyan">04 — TODO SE CONECTA</span>
          </div>

          <!-- Top scene counter -->
          <div class="scene-counter" #counterRef>
            <span class="counter-num">{{ currentSceneIndex + 1 | number:'2.0' }}</span>
            <span class="counter-sep">/</span>
            <span class="counter-total">{{ scenes.length | number:'2.0' }}</span>
          </div>

          <!-- Scene content area -->
          <div class="scene-area">
            <div *ngFor="let scene of scenes; let i = index"
                 class="scene-item"
                 [class.scene-active]="i === currentSceneIndex"
                 [attr.data-scene]="i"
                 #sceneItems>

              <!-- Scientific Tag Badge instead of simple Emoji -->
              <div class="scene-tag-badge" [style.borderColor]="scene.color" [style.color]="scene.color">
                <span class="badge-dot" [style.background]="scene.color"></span>
                <span class="label-sci">{{ scene.tag }}</span>
              </div>

              <div class="scene-title-wrap">
                <div class="scene-label-sm label-sci" [style.color]="scene.color">
                  ESCENA {{ scene.number }}
                </div>
                <h2 class="headline-lg scene-title">{{ scene.title }}</h2>
                <div class="scene-divider" [style.background]="scene.color"></div>
                <p class="scene-subtitle">{{ scene.subtitle }}</p>
                <p class="body-narrative scene-desc">{{ scene.description }}</p>
              </div>
            </div>
          </div>

          <!-- Arrow chain visual (horizontal progress) -->
          <div class="chain-visual" #chainRef>
            <div *ngFor="let scene of scenes; let i = index"
                 class="chain-node"
                 [class.chain-active]="i <= currentSceneIndex"
                 [style.--node-color]="scene.color">
              <div class="chain-dot"></div>
              <span class="chain-step-num font-mono">{{ scene.number }}</span>
              <div class="chain-line" *ngIf="i < scenes.length - 1"></div>
            </div>
          </div>

          <!-- Side progress dots -->
          <div class="scene-indicator">
            <div *ngFor="let scene of scenes; let i = index"
                 class="scene-dot"
                 [class.active]="i === currentSceneIndex"
                 [style.background]="i === currentSceneIndex ? scene.color : ''">
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .connected-wrapper {
      position: relative;
    }

    .scene-images-wrap {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .scene-img-layer {
      position: absolute;
      inset: 0;
      transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1);
      will-change: opacity;
    }

    .scene-bg-photo {
      transform: scale(1.08);
      transition: transform 1.5s ease-out;
      filter: saturate(0.85) brightness(0.65);
    }

    .scene-img-layer.active-img .scene-bg-photo {
      transform: scale(1.15);
    }

    .scene-gradient-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
    }

    .scene-container {
      position: relative;
      z-index: 10;
      height: 100vh;
      display: flex;
      align-items: center;
      padding: 0 6vw;
    }

    .connected-label {
      position: absolute;
      top: 2.5rem;
      left: 6vw;
    }

    .scene-counter {
      position: absolute;
      top: 2.5rem;
      right: 6vw;
      font-family: 'Space Mono', monospace;
      color: #8099b0;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
    }

    .counter-num {
      color: #f0f4f8;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .counter-sep { margin: 0 0.4rem; opacity: 0.5; }

    .scene-area {
      flex: 1;
      position: relative;
      max-width: 650px;
    }

    .scene-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: translateY(40px);
      pointer-events: none;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .scene-item.scene-active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      position: relative;
    }

    .scene-tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.4rem 0.9rem;
      background: rgba(4, 12, 20, 0.75);
      border: 1px solid currentColor;
      backdrop-filter: blur(8px);
      margin-bottom: 1.5rem;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0 0 8px currentColor;
    }

    .scene-label-sm {
      display: block;
      margin-bottom: 0.75rem;
      letter-spacing: 0.2em;
    }

    .scene-title {
      margin-bottom: 1.25rem;
      color: #f0f4f8;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      font-size: clamp(3.5rem, 8vw, 7.5rem);
    }

    .scene-divider {
      width: 80px;
      height: 2px;
      margin-bottom: 1.5rem;
      box-shadow: 0 0 12px currentColor;
    }

    .scene-subtitle {
      font-family: 'Space Mono', monospace;
      font-size: clamp(1rem, 1.6vw, 1.35rem);
      color: #f0f4f8;
      margin-bottom: 1.25rem;
      letter-spacing: 0.02em;
      line-height: 1.4;
    }

    .scene-desc {
      max-width: 540px;
      color: #b0c4d8;
      line-height: 1.7;
    }

    /* Chain visual (horizontal line) */
    .chain-visual {
      position: absolute;
      bottom: 3.5rem;
      left: 6vw;
      right: 6vw;
      display: flex;
      align-items: center;
      gap: 0;
    }

    .chain-node {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }

    .chain-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(240, 244, 248, 0.15);
      border: 1px solid rgba(240, 244, 248, 0.2);
      flex-shrink: 0;
      transition: all 0.5s ease;
    }

    .chain-step-num {
      font-size: 0.65rem;
      color: rgba(240, 244, 248, 0.4);
      transition: color 0.5s ease;
    }

    .chain-node.chain-active .chain-dot {
      background: var(--node-color);
      border-color: var(--node-color);
      box-shadow: 0 0 12px var(--node-color);
    }

    .chain-node.chain-active .chain-step-num {
      color: #f0f4f8;
    }

    .chain-line {
      flex: 1;
      height: 1px;
      background: rgba(240, 244, 248, 0.1);
      margin-right: 0.5rem;
      transition: background 0.5s ease;
    }

    .chain-node.chain-active .chain-line {
      background: rgba(240, 244, 248, 0.35);
    }

    @media (max-width: 768px) {
      .scene-area { max-width: 100%; }
      .chain-visual { display: none; }
      .scene-counter { display: none; }
    }
  `]
})
export class ConnectedComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('stickyPanel') stickyPanel!: ElementRef;

  scenes: Scene[] = [
    {
      id: 'ocean',
      number: '01',
      title: 'OCÉANO',
      subtitle: 'La temperatura superficial aumenta de forma anómala.',
      description: 'Las aguas del Pacífico acumulan una cantidad masiva de energía térmica. Esta anomalía en la superficie marina es el detonante de la cadena de eventos que alcanzará el territorio peruano.',
      tag: '01 · PACÍFICO TROPICAL',
      image: 'assets/images/ocean_hero.png',
      color: '#a87d10',
    },
    {
      id: 'atmosphere',
      number: '02',
      title: 'ATMÓSFERA',
      subtitle: 'Se alteran los patrones de vientos y presión.',
      description: 'El calor del océano modifica la circulación de los vientos alisios y la presión atmosférica, alterando el equilibrio climático de todo el continente sudamericano.',
      tag: '02 · CIRCULACIÓN ATMOSFÉRICA',
      image: 'assets/images/scene_atmosphere.png',
      color: '#c87f35',
    },
    {
      id: 'rain',
      number: '03',
      title: 'PRECIPITACIONES',
      subtitle: 'Las lluvias se intensifican extraordinariamente.',
      description: 'La inmensa evaporación marina asciende y se desplaza hacia la costa. En las regiones del norte, las precipitaciones superan con frecuencia los promedios históricos.',
      tag: '03 · EVAPORACIÓN Y NUBOSIDAD',
      image: 'assets/images/scene_rain.png',
      color: '#c45c00',
    },
    {
      id: 'rivers',
      number: '04',
      title: 'RÍOS',
      subtitle: 'Las cuencas superan su capacidad de saturación.',
      description: 'El volumen de agua transportado por los ríos sobrepasa su cauce natural. Las cuencas de la costa norte y central sufren crecidas repentinas y desbordamientos.',
      tag: '04 · DESBORDE DE CUENCAS',
      image: 'assets/images/river_flooding.png',
      color: '#d4621a',
    },
    {
      id: 'territory',
      number: '05',
      title: 'TERRITORIO',
      subtitle: 'El impacto alcanza carreteras, cultivos y comunidades.',
      description: 'Lo que comenzó como una anomalía en el Pacífico se manifiesta en el suelo peruano: infraestructura dañada, campos anegados y ciudades en situación de emergencia.',
      tag: '05 · IMPACTO TERRITORIAL',
      image: 'assets/images/road_extreme.png',
      color: '#cc1a00',
    },
  ];

  totalHeight = 400; // 400vh for 5 scenes
  currentSceneIndex = 0;

  private trigger!: ScrollTrigger;

  ngAfterViewInit() {
    this.setupStickyScroll();
  }

  getOverlayGradient(accentColor: string): string {
    return `linear-gradient(to right, rgba(107, 107, 107, 0.14) 0%, rgba(206, 206, 206, 0.31) 50%, rgba(4, 12, 20, 0.85) 100%),
            linear-gradient(to top, rgba(4, 12, 20, 0.95) 0%, transparent 60%)`;
  }

  private setupStickyScroll() {
    const wrapper = this.wrapperRef.nativeElement;

    this.trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        const sceneIndex = Math.floor(self.progress * this.scenes.length);
        const clampedIndex = Math.min(sceneIndex, this.scenes.length - 1);
        if (clampedIndex !== this.currentSceneIndex) {
          this.currentSceneIndex = clampedIndex;
        }
      }
    });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
