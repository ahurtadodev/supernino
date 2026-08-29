import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImpactScene {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  textColor: string;
}

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="impact-wrapper" id="section-impact" #wrapperRef>

      <div class="impact-label-fixed">
        <span class="label-sci">08 — EL IMPACTO</span>
      </div>

      <div *ngFor="let scene of scenes; let i = index"
           class="impact-scene section-full"
           [attr.id]="'impact-' + scene.id"
           [attr.data-index]="i"
           #sceneElements>

        <!-- Background image -->
        <div class="impact-img-wrap">
          <img [src]="scene.image"
               [alt]="scene.imageAlt"
               class="cinematic-img impact-img"
               [attr.data-scene-img]="i" />
        </div>

        <!-- Colored overlay -->
        <div class="impact-overlay" [style.background]="getOverlay(scene.accentColor)"></div>
        <div class="noise-overlay"></div>

        <!-- Scene number bg -->
        <div class="scene-number-bg" [style.color]="scene.accentColor + '12'">
          {{ scene.number }}
        </div>

        <!-- Content -->
        <div class="impact-content">
          <div class="impact-scene-meta">
            <span class="label-sci" [style.color]="scene.accentColor">IMPACTO {{ scene.number }}</span>
          </div>
          <h2 class="headline-lg impact-title" [style.color]="scene.textColor">
            {{ scene.title }}
          </h2>
          <div class="impact-divider" [style.background]="scene.accentColor"></div>
          <p class="body-narrative impact-desc">{{ scene.description }}</p>
        </div>

        <!-- Scene progress dot -->
        <div class="scene-side-num label-sci" [style.color]="scene.accentColor">
          {{ (i + 1) | number:'2.0' }}/{{ scenes.length | number:'2.0' }}
        </div>

      </div>
    </div>
  `,
  styles: [`
    .impact-wrapper {
      position: relative;
    }

    .impact-label-fixed {
      position: sticky;
      top: 1.5rem;
      left: 5vw;
      z-index: 50;
      padding-left: 5vw;
      pointer-events: none;
    }

    .impact-scene {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 6vw;
      overflow: hidden;
    }

    .impact-img-wrap {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .impact-img {
      will-change: transform;
      transform-origin: center;
    }

    .impact-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
    }

    .scene-number-bg {
      position: absolute;
      right: -0.05em;
      bottom: -0.12em;
      font-family: var(--font-display);
      font-size: clamp(14rem, 32vw, 38rem);
      font-weight: 900;
      line-height: 1;
      pointer-events: none;
      z-index: 3;
      user-select: none;
      opacity: 0.07;
      letter-spacing: -0.03em;
    }

    .impact-content {
      position: relative;
      z-index: 10;
      max-width: 600px;
    }

    .impact-scene-meta {
      margin-bottom: 1.2rem;
      opacity: 0;
      transform: translateY(20px);
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      padding: 0.35rem 1rem;
      backdrop-filter: blur(8px);
    }

    .impact-title {
      opacity: 0;
      transform: translateX(-40px);
      will-change: transform, opacity;
      margin-bottom: 1.2rem;
    }

    .impact-divider {
      width: 48px;
      height: 3px;
      border-radius: 9999px;
      margin-bottom: 1.5rem;
      opacity: 0;
      box-shadow: 0 0 14px currentColor;
    }

    .impact-desc {
      opacity: 0;
      transform: translateY(20px);
      background: rgba(4, 12, 22, 0.55);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
      font-size: 0.92rem;
      line-height: 1.65;
      color: rgba(220, 232, 244, 0.88);
    }

    .scene-side-num {
      position: absolute;
      right: 5vw;
      bottom: 2rem;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
    }
  `]
})
export class ImpactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLElement>;

  scenes: ImpactScene[] = [
    {
      id: 'agriculture',
      number: '01',
      title: 'AGRICULTURA',
      description: 'Cambios drásticos en las lluvias pueden alterar los ciclos agrícolas, afectando cultivos de arroz, espárragos y caña de azúcar en las regiones costeras del norte del Perú.',
      image: 'assets/images/agriculture_rain.png',
      imageAlt: 'Campos agrícolas bajo lluvia intensa',
      accentColor: '#c87f35',
      textColor: '#f0ece6',
    },
    {
      id: 'infrastructure',
      number: '02',
      title: 'INFRAESTRUCTURA & TECHOS',
      description: 'Viviendas, almacenes y colegios quedan expuestos a colapsos. Las lluvias torrenciales saturan techos planos y calaminas precarias, provocando inundaciones interiores y pérdidas estructurales millonarias.',
      image: 'assets/images/road_extreme.png',
      imageAlt: 'Carretera y estructuras bajo condiciones extremas de lluvia',
      accentColor: '#b87d3a',
      textColor: '#f0f4f8',
    },
    {
      id: 'economy',
      number: '03',
      title: 'COMERCIO & ALMACENES',
      description: 'Cuando el agua penetra naves industriales y almacenes de acopio, la mercadería se destruye de inmediato. Blindar los techos con coberturas de alto drenaje es la única barrera real de protección.',
      image: 'assets/images/ocean_hero.png',
      imageAlt: 'Visualización de actividad económica costera',
      accentColor: '#c45c00',
      textColor: '#f0f4f8',
    },
    {
      id: 'health',
      number: '04',
      title: 'SALUD',
      description: 'Los cambios ambientales también pueden generar nuevos riesgos sanitarios. El aumento de humedad y agua estancada favorece vectores de enfermedades en zonas afectadas.',
      image: 'assets/images/coast_rain.png',
      imageAlt: 'Costa peruana bajo condiciones atmosféricas adversas',
      accentColor: '#e03000',
      textColor: '#f0f4f8',
    },
  ];

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.setupAnimations();
  }

  getOverlay(color: string): string {
    return `linear-gradient(to right, rgba(228, 128, 35, 0.42) 0%, rgba(4, 12, 20, 0.29) 55%, rgba(4,12,20,0.7) 100%)`;
  }

  private setupAnimations() {
    const scenes = this.wrapperRef.nativeElement.querySelectorAll('.impact-scene');

    scenes.forEach((scene, i) => {
      const img = scene.querySelector('.impact-img') as HTMLElement;
      const meta = scene.querySelector('.impact-scene-meta') as HTMLElement;
      const title = scene.querySelector('.impact-title') as HTMLElement;
      const divider = scene.querySelector('.impact-divider') as HTMLElement;
      const desc = scene.querySelector('.impact-desc') as HTMLElement;

      // Image parallax zoom
      if (img) {
        gsap.fromTo(img,
          { scale: 1.05 },
          {
            scale: 1.18,
            ease: 'none',
            scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      }

      // Content reveals
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scene, start: 'top 70%' }
      });

      if (meta) tl.to(meta, { opacity: 1, y: 0, duration: 0.7 });
      if (title) tl.to(title, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.3');
      if (divider) tl.to(divider, { opacity: 1, duration: 0.5 }, '-=0.5');
      if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
    });
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
