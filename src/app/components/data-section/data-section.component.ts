import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DataStat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  source: string;
  color: string;
}

interface CronogramaItem {
  mes: string;
  riesgo: 'MEDIO' | 'MEDIO-ALTO' | 'ALTO' | 'MUY ALTO' | 'MÁXIMO';
  descripcion: string;
  efectos: string;
  icon: string;
  badgeBg: string;
  badgeColor: string;
  isMax?: boolean;
}

@Component({
  selector: 'app-data-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-full data-section" id="section-data" #sectionRef>

      <div class="noise-overlay"></div>

      <!-- Grid lines background -->
      <div class="data-grid-bg">
        <div class="grid-line" *ngFor="let n of gridLines" [style.left]="(n * 100 / (gridLines.length-1)) + '%'"></div>
      </div>

      <div class="data-content">

        <!-- Header -->
        <div class="data-header" #headerRef>
          <span class="label-sci">10 — MONITOREO Y DATOS</span>
          <h2 class="headline-lg data-title">LOS DATOS<br>HABLAN.</h2>
          <p class="body-narrative" style="max-width:560px;">
            Estadísticas históricas reales e informes climáticos oficiales.
            El conocimiento científico y el monitoreo oportuno son las herramientas para transformar el riesgo en prevención.
          </p>
        </div>

        <!-- Official ENFEN 2026-2027 Schedule Section -->
        <div class="cronograma-container" #cronogramaRef>
          <div class="cronograma-header">
            <div class="crono-title-block">
              <span class="badge-official">DOCUMENTO DE ALERTA OFICIAL</span>
              <h3 class="headline-sm crono-title">CRONOGRAMA DE EVOLUCIÓN DEL NIÑO 2026–2027 EN PERÚ</h3>
              <p class="crono-sub font-mono">ENFEN / SENAMHI / NOAA / OMM · PERIODO JULIO 2026 – ABRIL 2027</p>
            </div>
          </div>

          <!-- Month Cards Grid / Timeline -->
          <div class="cronograma-grid">
            <div *ngFor="let item of cronograma; let i = index"
                 class="crono-card"
                 [class.crono-max]="item.isMax"
                 [attr.data-risk]="item.riesgo">

              <div class="crono-card-top">
                <span class="crono-mes font-mono">{{ item.mes }}</span>
                <span class="crono-risk-badge" [style.background]="item.badgeBg" [style.color]="item.badgeColor">
                  <span *ngIf="item.isMax" class="max-pulsing-dot"></span>
                  {{ item.riesgo }}
                </span>
              </div>

              <div class="crono-card-body">
                <div class="crono-icon">{{ item.icon }}</div>
                <div class="crono-texts">
                  <p class="crono-desc">{{ item.descripcion }}</p>
                  <div class="crono-effect-box">
                    <span class="label-sci effect-label">EFECTOS CLAVE:</span>
                    <p class="crono-efectos">{{ item.efectos }}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="crono-footer font-mono">
            <span>ℹ️ Fuente: ENFEN – Comunicado Oficial N° 07-2025, SENAMHI, NOAA, OMM.</span>
            <span>📅 Periodo: Julio 2026 – Abril 2027</span>
          </div>
        </div>

        <!-- Historical Stats grid -->
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of stats; let i = index"
               [attr.data-index]="i"
               #statCards>
            <div class="stat-number">
              <span class="stat-prefix">{{ stat.prefix }}</span>
              <span class="counter-display stat-val" [style.color]="stat.color" #counterEls>0</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-bar-wrap">
              <div class="stat-bar" [style.background]="stat.color + '20'">
                <div class="stat-bar-fill"
                     [style.background]="stat.color"
                     [style.boxShadow]="'0 0 8px ' + stat.color"
                     [attr.data-pct]="stat.pct"
                     #barFills>
                </div>
              </div>
            </div>
            <p class="counter-label">{{ stat.label }}</p>
            <p class="counter-source">{{ stat.source }}</p>
          </div>
        </div>

        <!-- Horizontal timeline -->
        <div class="event-timeline" #timelineRef>
          <div class="timeline-title label-sci">EVENTOS HISTÓRICOS SIGNIFICATIVOS EN PERÚ</div>
          <div class="timeline-track">
            <div class="timeline-line"></div>
            <div *ngFor="let ev of events" class="timeline-event" [style.left]="ev.pos + '%'">
              <div class="ev-dot" [style.background]="ev.color"></div>
              <div class="ev-year label-sci" [style.color]="ev.color">{{ ev.year }}</div>
              <div class="ev-label">{{ ev.label }}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .data-section {
      background: #040c14;
      display: flex;
      align-items: center;
      padding: 8rem 0;
      min-height: 100vh;
    }

    .data-grid-bg {
      position: absolute;
      inset: 0;
      display: flex;
      pointer-events: none;
      z-index: 1;
    }

    .grid-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: rgba(42, 111, 168, 0.06);
    }

    .data-content {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 0 6vw;
      display: flex;
      flex-direction: column;
      gap: 5rem;
    }

    /* Header */
    .data-header {
      opacity: 0;
      transform: translateY(30px);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .data-title {
      color: #f0f4f8;
    }

    /* Cronograma 2026-2027 styling */
    .cronograma-container {
      background: rgba(10, 22, 38, 0.65);
      border: 1px solid rgba(42, 111, 168, 0.3);
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }

    .cronograma-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(42, 111, 168, 0.2);
      padding-bottom: 1.5rem;
    }

    .badge-official {
      display: inline-block;
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      color: #f07a1a;
      background: rgba(240, 122, 26, 0.15);
      border: 1px solid rgba(240, 122, 26, 0.4);
      padding: 0.3rem 0.8rem;
      letter-spacing: 0.15em;
      margin-bottom: 0.8rem;
    }

    .crono-title {
      color: #f0f4f8;
      font-size: clamp(1.4rem, 2.8vw, 2.4rem);
    }

    .crono-sub {
      color: #7ec8e3;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      margin-top: 0.4rem;
    }

    .cronograma-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .crono-card {
      background: rgba(4, 12, 20, 0.7);
      border: 1px solid rgba(42, 111, 168, 0.2);
      padding: 1.25rem;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &:hover {
        border-color: rgba(74, 184, 216, 0.5);
        transform: translateY(-3px);
      }
    }

    .crono-card.crono-max {
      border: 2px solid #ff0033;
      background: rgba(60, 0, 15, 0.5);
      box-shadow: 0 0 25px rgba(255, 0, 51, 0.3);
    }

    .crono-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .crono-mes {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f0f4f8;
    }

    .crono-risk-badge {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 2px;
      letter-spacing: 0.1em;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    .max-pulsing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 8px #ffffff;
      animation: alertBlink 1s ease-in-out infinite;
    }

    .crono-card-body {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .crono-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .crono-texts {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .crono-desc {
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #d0e0f0;
      line-height: 1.4;
    }

    .crono-effect-box {
      background: rgba(13, 33, 55, 0.4);
      padding: 0.5rem 0.75rem;
      border-left: 2px solid rgba(74, 184, 216, 0.4);
    }

    .effect-label {
      font-size: 0.55rem;
      color: #7ec8e3;
    }

    .crono-efectos {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: #8099b0;
      margin-top: 0.2rem;
      line-height: 1.35;
    }

    .crono-footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(42, 111, 168, 0.2);
      font-size: 0.7rem;
      color: #8099b0;
    }

    /* Stats grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2px;
    }

    .stat-card {
      padding: 2.5rem 2rem;
      border: 1px solid rgba(42, 111, 168, 0.1);
      background: rgba(13, 33, 55, 0.2);
      opacity: 0;
      transform: translateY(30px);
      transition: background 0.4s ease, border-color 0.4s ease;
    }

    .stat-card:hover {
      background: rgba(13, 33, 55, 0.4);
      border-color: rgba(42, 111, 168, 0.3);
    }

    .stat-number {
      display: flex;
      align-items: baseline;
      gap: 0.2rem;
      margin-bottom: 1.5rem;
    }

    .stat-prefix, .stat-suffix {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(1.5rem, 3vw, 3rem);
      color: #8099b0;
    }

    .stat-val {
      font-size: clamp(3rem, 7vw, 7rem);
    }

    .stat-bar-wrap {
      margin-bottom: 1rem;
    }

    .stat-bar {
      height: 3px;
      width: 100%;
      border-radius: 2px;
      overflow: hidden;
    }

    .stat-bar-fill {
      height: 100%;
      width: 0%;
      border-radius: 2px;
      transition: width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Timeline */
    .event-timeline {
      opacity: 0;
      transform: translateY(20px);
      padding: 2rem 0;
    }

    .timeline-title {
      margin-bottom: 2rem;
    }

    .timeline-track {
      position: relative;
      height: 80px;
    }

    .timeline-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(42, 111, 168, 0.3);
    }

    .timeline-event {
      position: absolute;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }

    .ev-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .ev-year {
      font-size: 0.65rem;
      white-space: nowrap;
    }

    .ev-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      color: #8099b0;
      white-space: nowrap;
      position: absolute;
      top: calc(100% + 0.3rem);
    }

    @media (max-width: 768px) {
      .cronograma-container { padding: 1.5rem; }
      .cronograma-grid { grid-template-columns: 1fr; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 480px) {
      .stats-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DataSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('headerRef') headerRef!: ElementRef;
  @ViewChild('cronogramaRef') cronogramaRef!: ElementRef;
  @ViewChild('timelineRef') timelineRef!: ElementRef;
  @ViewChildren('statCards') statCards!: QueryList<ElementRef>;
  @ViewChildren('counterEls') counterEls!: QueryList<ElementRef>;
  @ViewChildren('barFills') barFills!: QueryList<ElementRef>;

  gridLines = Array.from({ length: 8 }, (_, i) => i);

  cronograma: CronogramaItem[] = [
    {
      mes: 'Julio 2026',
      riesgo: 'MEDIO',
      descripcion: 'Mar más cálido de lo normal, primeras alteraciones en la pesca.',
      efectos: 'Cambios en la temperatura del mar, primeras afectaciones en la pesca.',
      icon: '⚓',
      badgeBg: 'rgba(240, 192, 32, 0.2)',
      badgeColor: '#f0c020',
    },
    {
      mes: 'Agosto 2026',
      riesgo: 'MEDIO-ALTO',
      descripcion: 'Incremento de la temperatura del aire y del mar.',
      efectos: 'Aumento de temperaturas, condiciones más cálidas y húmedas.',
      icon: '🌡️',
      badgeBg: 'rgba(240, 144, 32, 0.2)',
      badgeColor: '#f09020',
    },
    {
      mes: 'Septiembre 2026',
      riesgo: 'ALTO',
      descripcion: 'Mayor probabilidad de lluvias en la costa norte.',
      efectos: 'Lluvias en la costa norte, mayor humedad atmosférica.',
      icon: '🌧️',
      badgeBg: 'rgba(240, 96, 26, 0.25)',
      badgeColor: '#f0601a',
    },
    {
      mes: 'Octubre 2026',
      riesgo: 'ALTO',
      descripcion: 'Lluvias más frecuentes, activación de quebradas en zonas vulnerables.',
      efectos: 'Lluvias intensas, activación de quebradas y deslizamientos.',
      icon: '⚡',
      badgeBg: 'rgba(240, 96, 26, 0.25)',
      badgeColor: '#f0601a',
    },
    {
      mes: 'Noviembre 2026',
      riesgo: 'MUY ALTO',
      descripcion: 'Inundaciones localizadas, impactos en agricultura y pesca.',
      efectos: 'Inundaciones en zonas bajas, afectación a cultivos y pesca.',
      icon: '🌾',
      badgeBg: 'rgba(224, 48, 0, 0.3)',
      badgeColor: '#ff4422',
    },
    {
      mes: 'Diciembre 2026',
      riesgo: 'MUY ALTO',
      descripcion: 'Inicio del verano con lluvias intensas en la costa norte.',
      efectos: 'Lluvias intensas y persistentes, mayor riesgo de inundaciones.',
      icon: '🌩️',
      badgeBg: 'rgba(224, 48, 0, 0.3)',
      badgeColor: '#ff4422',
    },
    {
      mes: 'Enero 2027',
      riesgo: 'MUY ALTO',
      descripcion: 'Uno de los meses de mayor riesgo de desbordes e inundaciones.',
      efectos: 'Desbordes de ríos, inundaciones y daños a infraestructura.',
      icon: '🌊',
      badgeBg: 'rgba(208, 0, 0, 0.35)',
      badgeColor: '#ff2233',
    },
    {
      mes: 'Febrero 2027',
      riesgo: 'MÁXIMO',
      descripcion: 'Históricamente suele ser el mes de mayor impacto si el evento es fuerte.',
      efectos: 'Mayor impacto histórico: inundaciones severas, huaicos y daños generalizados.',
      icon: '🚨',
      badgeBg: '#ff0033',
      badgeColor: '#ffffff',
      isMax: true,
    },
    {
      mes: 'Marzo 2027',
      riesgo: 'MUY ALTO',
      descripcion: 'Continúan lluvias intensas y huaicos en zonas expuestas.',
      efectos: 'Persisten lluvias intensas, huaicos y afectación en infraestructura y agricultura.',
      icon: '🏔️',
      badgeBg: 'rgba(208, 0, 0, 0.35)',
      badgeColor: '#ff2233',
    },
    {
      mes: 'Abril 2027',
      riesgo: 'MEDIO',
      descripcion: 'Disminución gradual de la intensidad del fenómeno.',
      efectos: 'Lluvias menos frecuentes, efectos residuales en algunas zonas.',
      icon: '🌤️',
      badgeBg: 'rgba(240, 122, 26, 0.2)',
      badgeColor: '#f07a1a',
    },
  ];

  stats: (DataStat & { pct: number })[] = [
    {
      value: 3500,
      prefix: '$',
      suffix: 'M',
      label: 'PÉRDIDAS ECONÓMICAS · EL NIÑO 1997–98',
      source: 'Fuente: CEPAL, 2000',
      color: '#c45c00',
      pct: 85,
    },
    {
      value: 1.2,
      prefix: '',
      suffix: 'M',
      label: 'PERSONAS AFECTADAS · EL NIÑO 2017',
      source: 'Fuente: INDECI, 2017',
      color: '#4ab8d8',
      pct: 60,
    },
    {
      value: 140,
      prefix: '+',
      suffix: '',
      label: 'RÍOS EN SITUACIÓN DE ALERTA · 2017',
      source: 'Fuente: ANA / SENAMHI, 2017',
      color: '#f07a1a',
      pct: 70,
    },
    {
      value: 600,
      prefix: '+',
      suffix: '%',
      label: 'SOBRE PROMEDIO HISTÓRICO DE LLUVIA · PIURA 1998',
      source: 'Fuente: SENAMHI, 1998',
      color: '#e03000',
      pct: 95,
    },
  ];

  events = [
    { year: '1982', label: 'El Niño severo', pos: 5, color: '#c45c00' },
    { year: '1997', label: 'El Niño extraordinario', pos: 35, color: '#e03000' },
    { year: '1998', label: 'Lluvias extremas', pos: 45, color: '#e03000' },
    { year: '2017', label: 'Niño costero', pos: 72, color: '#f07a1a' },
    { year: '2023', label: 'Evento moderado', pos: 90, color: '#c45c00' },
  ];

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.setupAnimations();
  }

  private setupAnimations() {
    const section = this.sectionRef.nativeElement;

    // Header
    gsap.to(this.headerRef.nativeElement, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%' }
    });

    // Cronograma reveal
    gsap.fromTo(this.cronogramaRef.nativeElement,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: this.cronogramaRef.nativeElement, start: 'top 80%' }
      }
    );

    // Stat cards stagger + counters
    const cardsArr = this.statCards.toArray();
    const counterArr = this.counterEls.toArray();
    const barsArr = this.barFills.toArray();

    this.triggers.push(ScrollTrigger.create({
      trigger: this.statCards.first.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        cardsArr.forEach((card, i) => {
          gsap.to(card.nativeElement, {
            opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
          });
        });

        counterArr.forEach((el, i) => {
          const stat = this.stats[i];
          if (!stat) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2.5,
            delay: i * 0.2 + 0.3,
            ease: 'power2.out',
            onUpdate: () => {
              const v = stat.value % 1 === 0
                ? Math.round(obj.val).toLocaleString('es-PE')
                : obj.val.toFixed(1);
              el.nativeElement.textContent = v;
            },
            onComplete: () => {
              const bar = barsArr[i];
              if (bar) bar.nativeElement.style.width = stat.pct + '%';
            }
          });
        });
      }
    }));

    // Timeline
    gsap.to(this.timelineRef.nativeElement, {
      opacity: 1, y: 0, duration: 1,
      scrollTrigger: { trigger: this.timelineRef.nativeElement, start: 'top 80%' }
    });
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
