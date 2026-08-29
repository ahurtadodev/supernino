import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: string;
  image: string;
  name: string;
  code: string;
  category: string;
  amenazaTag: string;
  shortTagline: string;
  beneficioClave: string;
  specs?: string[];
  badge?: string;
  recommendedFor?: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="catalog-section section-full" id="catalog">

      <!-- DIAGNÓSTICO VISUAL Y CONCISO DE RIESGO DE TECHOS -->
      <div class="awareness-banner">
        <div class="awareness-badge-pill">
          <span class="pulse-dot"></span>
          <span class="pill-text">BLINDAJE ANTE EL NIÑO 2026&ndash;2027</span>
        </div>
        
        <h2 class="headline-lg awareness-title">
          ¿Por qué colapsan los techos comunes?
        </h2>
        
        <p class="awareness-intro">
          Lluvias de más de 80 mm/día saturan techos planos y perforan calaminas sin protección.
        </p>

        <!-- 3 Puntos Críticos Visuales (Cards Ovaladas con Sombras) -->
        <div class="failure-points-grid">
          
          <div class="failure-card">
            <div class="failure-icon-bubble">
              <span class="failure-num">01</span>
            </div>
            <div class="failure-content">
              <span class="failure-pill-tag">SOBRECARGA</span>
              <h4 class="failure-title">Empozamiento</h4>
              <p class="failure-desc">Poco peralte = acumulación de agua y colapso de la estructura.</p>
            </div>
          </div>

          <div class="failure-card">
            <div class="failure-icon-bubble">
              <span class="failure-num">02</span>
            </div>
            <div class="failure-content">
              <span class="failure-pill-tag">CORROSIÓN</span>
              <h4 class="failure-title">Salitre Marino</h4>
              <p class="failure-desc">La humedad costera perfora calaminas simples en pocas semanas.</p>
            </div>
          </div>

          <div class="failure-card">
            <div class="failure-icon-bubble">
              <span class="failure-num">03</span>
            </div>
            <div class="failure-content">
              <span class="failure-pill-tag">PÉRDIDA TOTAL</span>
              <h4 class="failure-title">Filtraciones</h4>
              <p class="failure-desc">Goteras que dañan mercadería, maquinaria y el interior del hogar.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- SIMULADOR INTERACTIVO DE BLINDAJE DE TECHOS -->
      <div class="simulator-card-wrap" id="simulador-riesgo">
        <div class="simulator-header">
          <div class="sim-pill-badge">EVALUADOR TÉCNICO INTERACTIVO</div>
          <h3 class="headline-md sim-title">Simulador de Riesgo y Blindaje para tu Inmueble</h3>
          <p class="sim-subtitle">Calcula el comportamiento de tu techo ante las lluvias torrenciales de El Niño 2026–2027.</p>
        </div>

        <div class="simulator-grid">
          <!-- Inputs Column -->
          <div class="sim-controls-col">
            <!-- Step 1: Region -->
            <div class="sim-step-group">
              <label class="sim-label"><span class="step-num">1</span> Ubicación Geográfica:</label>
              <div class="sim-pills-row">
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedRegion === 'norte'"
                  (click)="selectedRegion = 'norte'">
                  🌊 Costa Norte (Piura/Tumbes/Trujillo)
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedRegion === 'lima'"
                  (click)="selectedRegion = 'lima'">
                  🏙️ Costa Central (Lima/Áncash/Ica)
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedRegion === 'sierra'"
                  (click)="selectedRegion = 'sierra'">
                  ⛰️ Sierra Norte / Centro
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedRegion === 'selva'"
                  (click)="selectedRegion = 'selva'">
                  🌴 Selva & Cuencas
                </button>
              </div>
            </div>

            <!-- Step 2: Building Type -->
            <div class="sim-step-group">
              <label class="sim-label"><span class="step-num">2</span> Tipo de Inmueble:</label>
              <div class="sim-pills-row">
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedBuilding === 'almacen'"
                  (click)="selectedBuilding = 'almacen'">
                  🏭 Almacén / Nave Industrial
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedBuilding === 'vivienda'"
                  (click)="selectedBuilding = 'vivienda'">
                  🏡 Casa / Vivienda Familiar
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedBuilding === 'comercio'"
                  (click)="selectedBuilding = 'comercio'">
                  🏪 Local Comercial / Tienda
                </button>
              </div>
            </div>

            <!-- Step 3: Current Roof -->
            <div class="sim-step-group">
              <label class="sim-label"><span class="step-num">3</span> Techo Instalado Actualmente:</label>
              <div class="sim-pills-row">
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedCurrentRoof === 'calamina'"
                  (click)="selectedCurrentRoof = 'calamina'">
                  🔩 Calamina Metálica Simple
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedCurrentRoof === 'concreto'"
                  (click)="selectedCurrentRoof = 'concreto'">
                  🧱 Losa / Techo Plano de Concreto
                </button>
                <button
                  type="button"
                  class="sim-selector-btn"
                  [class.active]="selectedCurrentRoof === 'eternit'"
                  (click)="selectedCurrentRoof = 'eternit'">
                  📄 Fibrocemento / Eternit Antiguo
                </button>
              </div>
            </div>
          </div>

          <!-- Result Column (Calculated in real-time) -->
          <div class="sim-result-col">
            <div class="result-box-inner" [ngClass]="currentSimulation.riskClass">
              <div class="result-top-badge">
                <span class="sim-pulse-dot"></span>
                <span class="result-badge-text">{{ currentSimulation.riskBadge }}</span>
              </div>

              <h4 class="result-headline">{{ currentSimulation.headline }}</h4>
              
              <p class="result-vulnerability-desc">
                {{ currentSimulation.description }}
              </p>

              <div class="recommended-solution-box">
                <span class="rec-solution-label">🛡️ COBERTURA RECOMENDADA:</span>
                <strong class="rec-solution-name">{{ currentSimulation.solutionName }}</strong>
                <p class="rec-solution-reason">{{ currentSimulation.solutionReason }}</p>
              </div>

              <div class="sim-action-row">
                <a
                  [href]="getSimulatorWhatsAppLink()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="sim-quote-btn">
                  <span>💬 Solicitar Cotización de este Blindaje</span>
                  <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DEL CATÁLOGO DE SOLUCIONES -->
      <div class="catalog-header" id="soluciones-tecnicas">
        <div class="header-pill">SOLUCIONES CERTIFICADAS</div>
        <h3 class="headline-md catalog-title">Coberturas de Alta Resistencia</h3>
        <p class="catalog-subtitle">
          Elige la protección recomendada según el riesgo de tu zona.
        </p>
      </div>

      <!-- Filtros en Píldoras Ovaladas -->
      <div class="filter-bar-pill">
        <button
          *ngFor="let cat of categories"
          class="pill-btn"
          [class.active]="activeCategory === cat.id"
          (click)="filterBy(cat.id)"
          [id]="'filter-' + cat.id">
          {{ cat.label }}
        </button>
      </div>

      <!-- Products grid (Tarjetas Redondeadas con Sombras) -->
      <div class="products-grid">
        <div
          *ngFor="let product of filteredProducts; trackBy: trackById"
          class="product-card"
          [id]="'product-' + product.id">

          <!-- Badge Flotante Ovalado -->
          <div class="product-badge-pill" *ngIf="product.badge">{{ product.badge }}</div>

          <!-- Image Wrap Ovalado -->
          <div class="product-img-wrap" (click)="openModal(product)">
            <img
              [src]="product.image"
              [alt]="product.name"
              class="product-img"
              loading="lazy" />
            <div class="product-overlay">
              <span class="overlay-pill">Ver Ficha →</span>
            </div>
          </div>

          <!-- Info Redondeada -->
          <div class="product-info">
            <div class="product-meta-row">
              <span class="product-code-pill">{{ product.code }}</span>
              <span class="threat-pill">{{ product.amenazaTag }}</span>
            </div>
            
            <h3 class="product-name" (click)="openModal(product)">{{ product.name }}</h3>
            
            <div class="benefit-pill-box">
              <span class="benefit-icon">🛡️</span>
              <span class="benefit-text">{{ product.beneficioClave }}</span>
            </div>

            <!-- Botón de Cotización WhatsApp Ovalado con Sombra -->
            <div class="card-actions">
              <a
                [href]="getWhatsAppLink(product)"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-pill-quote"
                (click)="$event.stopPropagation()">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Cotizar por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      <!-- Banner Ovalado Flotante de Asesoría -->
      <div class="advisory-pill-box">
        <div class="advisory-content">
          <span class="advisory-pill-tag">¿DUDAS SOBRE TU TECHO?</span>
          <h4 class="advisory-title">Asesoría Técnica de Selección</h4>
          <p class="advisory-desc">Calculamos el peralte y material ideal según tu ciudad y tipo de proyecto.</p>
        </div>
        <div class="advisory-actions">
          <a
            [href]="getGeneralWhatsAppLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="advisory-main-btn"
            id="advisory-quote-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Consultar con Asesor
          </a>
        </div>
      </div>

      <!-- Modal con Formas Suaves y Ovaladas -->
      <div class="modal-backdrop" [class.open]="modalOpen" (click)="closeModal()">
        <div class="modal-card" (click)="$event.stopPropagation()" *ngIf="selectedProduct">
          <button class="modal-close-pill" (click)="closeModal()" id="modal-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="modal-body">
            <div class="modal-img-wrap">
              <img [src]="selectedProduct.image" [alt]="selectedProduct.name" class="modal-img" />
            </div>
            <div class="modal-details">
              <div class="product-meta-row">
                <span class="product-code-pill">{{ selectedProduct.code }}</span>
                <span class="threat-pill">{{ selectedProduct.amenazaTag }}</span>
              </div>
              <h3 class="modal-name headline-md">{{ selectedProduct.name }}</h3>
              
              <div class="modal-benefit-pill">
                <span class="benefit-icon">🛡️</span>
                <p class="modal-recommended">{{ selectedProduct.recommendedFor }}</p>
              </div>

              <ul class="modal-specs-list" *ngIf="selectedProduct.specs?.length">
                <li *ngFor="let s of selectedProduct.specs">
                  <span class="spec-check">✓</span>
                  {{ s }}
                </li>
              </ul>

              <div class="modal-actions-bar">
                <a
                  [href]="getWhatsAppLink(selectedProduct)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta-pill-quote modal-quote">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    /* ── Section Container ────────────────────── */
    .catalog-section {
      background: #040910;
      min-height: 100vh;
      padding: 6rem 6vw 7rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4rem;
      position: relative;
    }

    .catalog-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 40% at 50% 10%, rgba(184, 125, 58, 0.08) 0%, transparent 70%),
        radial-gradient(ellipse 60% 30% at 50% 90%, rgba(18, 140, 126, 0.06) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Awareness Card (Ovalada con Sombras) ── */
    .awareness-banner {
      width: 100%;
      max-width: 1140px;
      background: rgba(10, 22, 38, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 32px;
      padding: 3.5rem 3rem;
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(184, 125, 58, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .awareness-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.45rem 1.2rem;
      background: rgba(184, 125, 58, 0.15);
      border: 1px solid rgba(184, 125, 58, 0.35);
      border-radius: 9999px;
      margin-bottom: 1.2rem;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #cc1a00;
      box-shadow: 0 0 10px #cc1a00;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.3); opacity: 1; }
    }

    .pill-text {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      color: var(--c-accent);
      font-weight: 600;
    }

    .awareness-title {
      color: var(--c-white);
      margin-bottom: 0.8rem;
      font-size: clamp(1.8rem, 3.2vw, 2.7rem);
      letter-spacing: -0.01em;
    }

    .awareness-intro {
      font-family: var(--font-body);
      font-size: clamp(0.95rem, 1.2vw, 1.1rem);
      color: var(--c-muted);
      max-width: 650px;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }

    .failure-points-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      width: 100%;
    }

    .failure-card {
      background: rgba(18, 15, 12, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 24px;
      padding: 2rem 1.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.8rem;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .failure-card:hover {
      transform: translateY(-4px);
      border-color: rgba(212, 139, 56, 0.3);
    }

    .failure-icon-bubble {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(212, 139, 56, 0.12);
      border: 1px solid rgba(212, 139, 56, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px rgba(212, 139, 56, 0.15);
    }

    .failure-num {
      font-family: var(--font-body);
      font-size: 1rem;
      font-weight: 700;
      color: var(--c-accent);
    }

    .failure-pill-tag {
      font-family: var(--font-body);
      font-size: 0.6rem;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: #ff6b5b;
      background: rgba(255, 107, 91, 0.12);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      display: inline-block;
      margin-bottom: 0.3rem;
    }

    .failure-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--c-white);
    }

    .failure-desc {
      font-family: var(--font-body);
      font-size: 0.84rem;
      color: var(--c-muted);
      line-height: 1.45;
    }

    /* ── Simulator Card Styles ───────────────── */
    .simulator-card-wrap {
      width: 100%;
      max-width: 1200px;
      background: rgba(18, 15, 12, 0.9);
      border: 1px solid rgba(212, 139, 56, 0.25);
      border-radius: 32px;
      padding: 3rem;
      box-shadow:
        0 30px 70px rgba(0, 0, 0, 0.75),
        0 0 0 1px rgba(255, 255, 255, 0.03),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .simulator-header {
      text-align: center;
      max-width: 750px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .sim-pill-badge {
      font-family: var(--font-body);
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      font-weight: 700;
      color: var(--c-accent);
      background: rgba(212, 139, 56, 0.12);
      border: 1px solid rgba(212, 139, 56, 0.3);
      padding: 0.35rem 1.1rem;
      border-radius: 9999px;
    }

    .sim-title {
      color: var(--c-white);
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    }

    .sim-subtitle {
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--c-muted);
      line-height: 1.6;
    }

    .simulator-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 2.5rem;
      align-items: stretch;
    }

    .sim-controls-col {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .sim-step-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .sim-label {
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--c-white);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .step-num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--c-accent);
      color: #0a0908;
      font-size: 0.75rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .sim-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .sim-selector-btn {
      padding: 0.6rem 1.1rem;
      background: rgba(28, 23, 19, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      color: var(--c-muted);
      font-family: var(--font-body);
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        border-color: rgba(212, 139, 56, 0.4);
        color: var(--c-white);
        background: rgba(38, 30, 24, 0.9);
      }

      &.active {
        background: rgba(212, 139, 56, 0.2);
        border-color: var(--c-accent);
        color: #ffffff;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(212, 139, 56, 0.2);
      }
    }

    /* Result Box Column */
    .sim-result-col {
      display: flex;
    }

    .result-box-inner {
      background: rgba(24, 18, 14, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      transition: all 0.3s ease;
    }

    .result-box-inner.risk-critico {
      border-color: rgba(204, 26, 0, 0.4);
      background: linear-gradient(180deg, rgba(38, 14, 10, 0.95) 0%, rgba(20, 14, 12, 0.95) 100%);
    }

    .result-box-inner.risk-alto {
      border-color: rgba(212, 139, 56, 0.4);
      background: linear-gradient(180deg, rgba(36, 22, 12, 0.95) 0%, rgba(20, 14, 12, 0.95) 100%);
    }

    .result-top-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.9rem;
      border-radius: 9999px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: fit-content;
    }

    .sim-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #cc1a00;
      box-shadow: 0 0 8px #cc1a00;
      animation: enfenPulse 1.5s infinite;
    }

    .result-badge-text {
      font-family: var(--font-body);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #ff6b5b;
    }

    .result-headline {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--c-white);
      line-height: 1.25;
    }

    .result-vulnerability-desc {
      font-family: var(--font-body);
      font-size: 0.88rem;
      color: rgba(247, 244, 238, 0.85);
      line-height: 1.6;
    }

    .recommended-solution-box {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(212, 139, 56, 0.3);
      border-radius: 16px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .rec-solution-label {
      font-family: var(--font-body);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--c-accent);
    }

    .rec-solution-name {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: #ffffff;
    }

    .rec-solution-reason {
      font-family: var(--font-body);
      font-size: 0.82rem;
      color: var(--c-muted);
      line-height: 1.5;
    }

    .sim-action-row {
      margin-top: auto;
      padding-top: 0.5rem;
    }

    .sim-quote-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      width: 100%;
      padding: 0.9rem 1.4rem;
      background: var(--c-accent);
      color: #0a0908;
      border-radius: 9999px;
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(212, 139, 56, 0.35);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: #e59942;
        transform: translateY(-2px);
        box-shadow: 0 15px 35px rgba(212, 139, 56, 0.5);
      }
    }

    @media (max-width: 900px) {
      .simulator-grid { grid-template-columns: 1fr; }
      .simulator-card-wrap { padding: 2rem 1.5rem; }
    }
    .catalog-header {
      text-align: center;
      max-width: 650px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header-pill {
      font-family: var(--font-body);
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      font-weight: 600;
      color: var(--c-accent);
      background: rgba(212, 139, 56, 0.1);
      border: 1px solid rgba(212, 139, 56, 0.25);
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      margin-bottom: 0.8rem;
    }

    .catalog-title {
      color: var(--c-white);
      margin-bottom: 0.5rem;
      font-size: clamp(1.8rem, 3vw, 2.5rem);
    }

    .catalog-subtitle {
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--c-muted);
    }

    /* ── Filter Bar Pills ────────────────────── */
    .filter-bar-pill {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      justify-content: center;
      max-width: 1000px;
    }

    .pill-btn {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.6rem 1.4rem;
      background: rgba(14, 12, 10, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      color: var(--c-muted);
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .pill-btn:hover {
      border-color: rgba(184, 125, 58, 0.4);
      color: var(--c-white);
      transform: translateY(-2px);
    }

    .pill-btn.active {
      background: linear-gradient(135deg, rgba(184, 125, 58, 0.35) 0%, rgba(140, 58, 0, 0.45) 100%);
      border-color: var(--c-accent);
      color: #fff;
      box-shadow: 0 10px 25px rgba(184, 125, 58, 0.3);
      transform: translateY(-2px);
    }

    /* ── Products Grid ───────────────────────── */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
    }

    /* ── Product Card (Curva Suave + Sombra Profunda) ── */
    .product-card {
      background: rgba(16, 13, 10, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 28px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 20px 50px -12px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.03),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
    }

    .product-card:hover {
      transform: translateY(-10px);
      border-color: rgba(200, 127, 53, 0.35);
      box-shadow:
        0 35px 70px -15px rgba(0, 0, 0, 0.85),
        0 0 30px rgba(200, 127, 53, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .product-badge-pill {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      z-index: 5;
      font-family: var(--font-mono);
      font-size: 0.52rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 0.3rem 0.8rem;
      background: rgba(184, 125, 58, 0.95);
      color: #fff;
      border-radius: 9999px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }

    .product-img-wrap {
      width: 100%;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      background: #081420;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .product-card:hover .product-img {
      transform: scale(1.06);
    }

    .product-overlay {
      position: absolute;
      inset: 0;
      background: rgba(4, 10, 18, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      border-radius: 20px;
      transition: opacity 0.3s ease;
    }

    .product-card:hover .product-overlay {
      opacity: 1;
    }

    .overlay-pill {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      color: var(--c-accent);
      background: rgba(10, 24, 42, 0.85);
      border: 1px solid rgba(184, 125, 58, 0.5);
      padding: 0.5rem 1.1rem;
      border-radius: 9999px;
      backdrop-filter: blur(4px);
    }

    .product-info {
      padding: 1.25rem 0.5rem 0.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 0.75rem;
    }

    .product-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .product-code-pill {
      font-family: var(--font-mono);
      font-size: 0.55rem;
      letter-spacing: 0.15em;
      color: var(--c-accent);
    }

    .threat-pill {
      font-family: var(--font-mono);
      font-size: 0.52rem;
      letter-spacing: 0.1em;
      color: rgba(74, 184, 216, 0.9);
      background: rgba(30, 90, 130, 0.25);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      border: 1px solid rgba(74, 184, 216, 0.2);
    }

    .product-name {
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--c-white);
      line-height: 1.2;
      cursor: pointer;
    }

    .product-name:hover {
      color: var(--c-accent);
    }

    .benefit-pill-box {
      background: rgba(6, 16, 28, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 0.65rem 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .benefit-icon {
      font-size: 1rem;
      flex-shrink: 0;
    }

    .benefit-text {
      font-family: var(--font-body);
      font-size: 0.8rem;
      color: rgba(220, 235, 248, 0.9);
      line-height: 1.35;
    }

    /* ── Botón WhatsApp Ovalado con Glow ─────── */
    .card-actions {
      margin-top: auto;
      padding-top: 0.5rem;
    }

    .cta-pill-quote {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #1fa855 0%, #128c7e 100%);
      color: #ffffff;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.8rem 1.2rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(31, 168, 85, 0.35);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cta-pill-quote:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
      color: #ffffff;
    }

    /* ── Banner Asesoría Ovalado ─────────────── */
    .advisory-pill-box {
      width: 100%;
      max-width: 1140px;
      background: linear-gradient(135deg, rgba(16, 36, 60, 0.8) 0%, rgba(8, 20, 36, 0.9) 100%);
      border: 1px solid rgba(184, 125, 58, 0.25);
      border-radius: 36px;
      padding: 3rem 3.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(184, 125, 58, 0.1);
    }

    .advisory-content {
      max-width: 600px;
    }

    .advisory-pill-tag {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      letter-spacing: 0.18em;
      color: var(--c-accent);
      background: rgba(184, 125, 58, 0.15);
      padding: 0.3rem 0.8rem;
      border-radius: 9999px;
      display: inline-block;
      margin-bottom: 0.6rem;
    }

    .advisory-title {
      color: var(--c-white);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }

    .advisory-desc {
      font-family: var(--font-body);
      font-size: 0.9rem;
      color: var(--c-muted);
    }

    .advisory-main-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, #1fa855 0%, #128c7e 100%);
      color: #fff;
      text-decoration: none;
      padding: 0.95rem 1.8rem;
      border-radius: 9999px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0 12px 30px rgba(31, 168, 85, 0.4);
      transition: all 0.3s ease;
    }

    .advisory-main-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 40px rgba(37, 211, 102, 0.55);
    }

    /* ── Modal Redondeado ────────────────────── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 10, 18, 0.85);
      backdrop-filter: blur(12px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .modal-backdrop.open {
      opacity: 1;
      pointer-events: all;
    }

    .modal-card {
      background: #0a1828;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 32px;
      max-width: 860px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      position: relative;
      box-shadow: 0 35px 80px rgba(0,0,0,0.85), 0 0 40px rgba(184, 125, 58, 0.12);
    }

    .modal-close-pill {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 10;
      background: rgba(10, 26, 46, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--c-white);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-close-pill:hover {
      background: var(--c-accent);
      color: #000;
    }

    .modal-body {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
    }

    .modal-img-wrap {
      background: #06101c;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      max-height: 420px;
      border-radius: 20px;
    }

    .modal-details {
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      justify-content: center;
    }

    .modal-name {
      color: var(--c-white);
      font-size: 1.5rem;
      line-height: 1.2;
    }

    .modal-benefit-pill {
      background: rgba(184, 125, 58, 0.1);
      border: 1px solid rgba(184, 125, 58, 0.25);
      border-radius: 16px;
      padding: 0.75rem 1rem;
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }

    .modal-recommended {
      font-family: var(--font-body);
      font-size: 0.85rem;
      color: rgba(220, 235, 250, 0.95);
    }

    .modal-specs-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .modal-specs-list li {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-body);
      font-size: 0.85rem;
      color: var(--c-muted);
    }

    .spec-check {
      color: #25d366;
      font-weight: bold;
    }

    /* ── Responsive ──────────────────────────── */
    @media (max-width: 768px) {
      .catalog-section { padding: 5rem 4vw 5rem; gap: 3rem; }
      .awareness-banner { padding: 2rem 1.5rem; border-radius: 24px; }
      .products-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }
      .modal-body { grid-template-columns: 1fr; }
      .modal-details { padding: 1.5rem; }
      .advisory-pill-box { padding: 2rem 1.5rem; border-radius: 24px; }
    }

    @media (max-width: 480px) {
      .products-grid { grid-template-columns: 1fr; gap: 1.25rem; }
    }
  `]
})
export class CatalogComponent implements OnInit {

  private whatsappNumber = '51908801093';

  categories = [
    { id: 'all', label: 'Todas las Coberturas' },
    { id: 'lluvia', label: '🌧️ Lluvias Torrenciales' },
    { id: 'salitre', label: '🌊 Costa & Salitre' },
    { id: 'termo', label: '☀️ Aislamiento & Ruido' },
    { id: 'losa', label: '🏗️ Losas Estructurales' },
    { id: 'luz', label: '💡 Iluminación Cenital' },
  ];

  selectedRegion = 'norte';
  selectedBuilding = 'almacen';
  selectedCurrentRoof = 'calamina';

  get currentSimulation() {
    // 1. Costa Norte + Calamina -> Crítico
    if (this.selectedRegion === 'norte' && this.selectedCurrentRoof === 'calamina') {
      return {
        riskBadge: '95% · RIESGO CRÍTICO DE COLAPSO',
        riskClass: 'risk-critico',
        headline: 'Vulnerabilidad Extrema por Lluvia Torrencial y Salitre',
        description: 'En el norte, lluvias de más de 90 mm/día rebasarán la capacidad de la calamina y la brisa marina oxidará las fijaciones, provocando colapso y filtración masiva sobre su mercadería.',
        solutionName: 'Plancha TR-4 Aluzinc Anticorrosivo (AZ-150)',
        solutionReason: 'Peralte de 50 mm con máxima tasa de desagüe y capa protectora contra salinidad marina extrema.'
      };
    }
    // 2. Concreto plano
    if (this.selectedCurrentRoof === 'concreto') {
      return {
        riskBadge: '85% · ALTO RIESGO DE EMPOZAMIENTO',
        riskClass: 'risk-alto',
        headline: 'Acumulación de Agua y Sobrecarga Estructural',
        description: 'Los techos planos acumulan charcos de agua pesada que filtran hacia la losa, agrietando el concreto y deteriorando techos falsos y sistemas eléctricos.',
        solutionName: 'Sobretecho con Panel Termoacústico PUR / TR-4',
        solutionReason: 'Crea una pendiente de evacuación rápida e impermeabiliza al 100% la losa existente.'
      };
    }
    // 3. Eternit / Fibrocemento
    if (this.selectedCurrentRoof === 'eternit') {
      return {
        riskBadge: '80% · RIESGO DE FRACTURA POR GRANIZO O VIENTO',
        riskClass: 'risk-alto',
        headline: 'Fragilidad y Desprendimiento por Ráfagas',
        description: 'El fibrocemento antiguo se vuelve poroso y quebradizo. Ráfagas de viento y cambios térmicos fracturan las planchas provocando goteras incontrolables.',
        solutionName: 'Panel UPVC Termoacústico Multicapa',
        solutionReason: 'Ultra-resistente al impacto, liviano, no se quiebra y aísla el calor y el ruido de la lluvia.'
      };
    }
    // 4. Default
    return {
      riskBadge: '90% · ALTO RIESGO DE FILTRACIÓN',
      riskClass: 'risk-alto',
      headline: 'Filtración y Saturación de Humedad',
      description: 'Las condiciones climáticas anómalas proyectadas para 2026 sobrepasarán los límites de drenaje de coberturas tradicionales.',
      solutionName: 'Panel Sandwich TR-4 Poliuretano CIMAK',
      solutionReason: 'Blindaje térmico y estructural con estanqueidad absoluta y garantía ante lluvias severas.'
    };
  }

  getSimulatorWhatsAppLink(): string {
    const regionNames: Record<string, string> = {
      norte: 'Costa Norte (Piura/Tumbes/Trujillo)',
      lima: 'Costa Central (Lima/Áncash/Ica)',
      sierra: 'Sierra Norte/Centro',
      selva: 'Selva'
    };
    const buildingNames: Record<string, string> = {
      almacen: 'Almacén/Nave Industrial',
      vivienda: 'Casa/Vivienda',
      comercio: 'Local Comercial'
    };
    const roofNames: Record<string, string> = {
      calamina: 'Calamina Simple',
      concreto: 'Losa Plana de Concreto',
      eternit: 'Fibrocemento/Eternit'
    };

    const sim = this.currentSimulation;
    const msg = `Hola, realicé el diagnóstico de blindaje para mi ${buildingNames[this.selectedBuilding] || 'Inmueble'} en ${regionNames[this.selectedRegion] || 'mi zona'} (techo actual: ${roofNames[this.selectedCurrentRoof] || 'tradicional'}). El resultado arrojó ${sim.riskBadge}. Deseo cotizar la cobertura recomendada: ${sim.solutionName}.`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  activeCategory = 'all';
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  modalOpen = false;

  products: Product[] = [
    // --- Lluvias Torrenciales (Aluzinc) ---
    {
      id: 'tr4-aluzinc',
      image: 'assets/catalog/products/tr4_aluzinc.png',
      name: 'Plancha TR-4 Aluzinc',
      code: 'CIM-ALZ-TR4',
      category: 'lluvia',
      amenazaTag: 'Lluvias Extremas',
      shortTagline: 'Peralte alto de 50 mm para máxima evacuación pluvial.',
      beneficioClave: 'Evita reboses y filtraciones bajo tormentas continuas.',
      recommendedFor: 'Naves industriales, almacenes y techos con gran caída de agua.',
      specs: ['Acero AZ-150 galvanizado', 'Espesor: 0.30 - 0.60 mm', 'Ancho útil: 1.00 m', 'Peralte: 50 mm'],
      badge: 'Más Recomendado',
    },
    {
      id: 'tr5-aluzinc',
      image: 'assets/catalog/products/tr5_aluzinc.png',
      name: 'Plancha TR-5 Aluzinc',
      code: 'CIM-ALZ-TR5',
      category: 'lluvia',
      amenazaTag: 'Lluvias Fuertes',
      shortTagline: '5 crestas de rigidez continua contra vientos y lluvia.',
      beneficioClave: 'Estructura rígida que soporta ráfagas de viento y aguaceros.',
      recommendedFor: 'Comercios, colegios, almacenes medianos y residencias.',
      specs: ['Acero AZ-150', 'Espesor: 0.40 - 0.80 mm', 'Ancho útil: 1.00 m', 'Peralte: 30 mm'],
    },
    {
      id: 'tr6-aluzinc',
      image: 'assets/catalog/products/tr6_aluzinc.png',
      name: 'Plancha TR-6 Aluzinc',
      code: 'CIM-ALZ-TR6',
      category: 'lluvia',
      amenazaTag: 'Viento & Tormenta',
      shortTagline: 'Peralte de 39 mm para cubiertas de gran envergadura.',
      beneficioClave: 'Distribución uniforme de cargas de agua y viento.',
      recommendedFor: 'Complejos agroindustriales y centros logísticos.',
      specs: ['Acero AZ-150', 'Espesor: 0.40 - 1.00 mm', 'Ancho útil: 0.96 m'],
    },
    {
      id: 'tr3-aluzinc',
      image: 'assets/catalog/products/tr3_aluzinc.png',
      name: 'Plancha TR-3 Aluzinc',
      code: 'CIM-ALZ-TR3',
      category: 'lluvia',
      amenazaTag: 'Drenaje Rápido',
      shortTagline: 'Peralte de 120 mm para pendientes pronunciadas.',
      beneficioClave: 'Gran canalización de agua en techos inclinados.',
      recommendedFor: 'Tinglados y techos con caída vertical.',
      specs: ['Acero AZ-150', 'Espesor: 0.30 - 0.50 mm', 'Ancho útil: 0.90 m'],
    },
    {
      id: 'tr4-curvo',
      image: 'assets/catalog/products/tr4_curvo.png',
      name: 'Plancha TR-4 Curva',
      code: 'CIM-ALZ-TR4C',
      category: 'lluvia',
      amenazaTag: 'Techo en Arco',
      shortTagline: 'Cubiertas curvadas que deslizan el agua sin estancamiento.',
      beneficioClave: 'Elimina pozas de agua por su forma parabólica natural.',
      recommendedFor: 'Hangares, coliseos, losas deportivas y naves en arco.',
      specs: ['Radio a medida', 'Peralte 50 mm / Ancho 1.00 m'],
    },

    // --- Costa & Salitre (UPVC & Fibra) ---
    {
      id: 'upvc-tr5',
      image: 'assets/catalog/products/upvc_tr5.png',
      name: 'UPVC TR-5 Termoacústica',
      code: 'CIM-UPVC-TR5',
      category: 'salitre',
      amenazaTag: '100% Inoxidable',
      shortTagline: 'Inmune al salitre marino con reducción acústica de 30 dB.',
      beneficioClave: 'Cero óxido en zona marina + silencio bajo lluvia intensa.',
      recommendedFor: 'Viviendas en la costa, plantas pesqueras y granjas.',
      specs: ['Tricapa coextruida', 'Inmune a la niebla salina', 'Silencio bajo lluvia (-30 dB)', 'Ancho: 1.00 m'],
      badge: 'Anti-Salitre',
    },
    {
      id: 'teja-aluzinc',
      image: 'assets/catalog/products/teja_aluzinc.png',
      name: 'Aluzinc Modelo Teja',
      code: 'CIM-ALZ-TEJA',
      category: 'salitre',
      amenazaTag: 'Residencial',
      shortTagline: 'Estética de teja colonial con durabilidad de acero.',
      beneficioClave: 'Elegancia tradicional sin roturas ni filtraciones.',
      recommendedFor: 'Casas de campo, condominios, hoteles y viviendas.',
      specs: ['Acero recubierto AZ-150', 'Peralte 49 mm / Ancho 1.075 m', 'Vida útil +30 años'],
    },
    {
      id: 'tr4-fibra',
      image: 'assets/catalog/products/tr4_fibra.png',
      name: 'Fibra de Vidrio TR-4',
      code: 'CIM-FV-TR4',
      category: 'salitre',
      amenazaTag: 'Anticorrosivo',
      shortTagline: 'Resina de poliéster reforzada inerte al salitre y químicos.',
      beneficioClave: 'No se pudre ni oxida en ambientes húmedos agresivos.',
      recommendedFor: 'Industria pesquera, minería y zonas litorales.',
      specs: ['Resina reforzada', 'Peralte 50 mm / Ancho 1.00 m', 'Protección UV'],
    },

    // --- Aislamiento & Ruido (Paneles Térmicos) ---
    {
      id: 'panel-poliuretano',
      image: 'assets/catalog/products/panel_poliuretano.png',
      name: 'Termotecho Poliuretano',
      code: 'CIM-PNL-PUR',
      category: 'termo',
      amenazaTag: 'Aislamiento Total',
      shortTagline: 'Núcleo de poliuretano inyectado de máxima densidad.',
      beneficioClave: 'Reduce el calor hasta 8°C y amortigua el ruido pluvial.',
      recommendedFor: 'Almacenes de alimentos, cámaras de frío y oficinas.',
      specs: ['Núcleo PUR densidad 40 kg/m³', 'Techo TR-4 (1.00 m) / Muro (1.15 m)', 'Espesores: 50 a 150 mm'],
      badge: 'Premium',
    },
    {
      id: 'panel-poliestireno',
      image: 'assets/catalog/products/panel_poliestireno.png',
      name: 'Termotecho Poliestireno',
      code: 'CIM-PNL-EPS',
      category: 'termo',
      amenazaTag: 'Confort Térmico',
      shortTagline: 'Panel sándwich con EPS autoextinguible accesible.',
      beneficioClave: 'Aislamiento liviano para cerramientos y ampliaciones.',
      recommendedFor: 'Campamentos, módulos habitables y galpones.',
      specs: ['Núcleo EPS autoextinguible', 'Techo TR-4 / Muro Modular', 'Espesores: 50 a 100 mm'],
    },
    {
      id: 'accesorios-techo',
      image: 'assets/catalog/products/accesorios_techo.png',
      name: 'Accesorios Herméticos',
      code: 'CIM-ACC-ROOF',
      category: 'termo',
      amenazaTag: 'Sellado Total',
      shortTagline: 'Cumbreras, canaletas y tornillos con arandela EPDM.',
      beneficioClave: '100% de estanqueidad en uniones contra goteras.',
      recommendedFor: 'Complemento indispensable en techos metálicos.',
      specs: ['Cumbrera troquelada', 'Tornillos con arandela EPDM', 'Canaleta tipo U'],
    },

    // --- Losas & Estructuras (Steel Deck) ---
    {
      id: 'deck38',
      image: 'assets/catalog/products/deck38.png',
      name: 'Steel Deck 38',
      code: 'CIM-SDK-38',
      category: 'losa',
      amenazaTag: 'Refuerzo Rápido',
      shortTagline: 'Losa colaborante para vaciado rápido de techos.',
      beneficioClave: 'Techa losas de concreto en 1/3 del tiempo habitual.',
      recommendedFor: 'Entrepisos y techos de concreto aligerado.',
      specs: ['Nervio: 38 mm', 'Ancho útil: 0.90 m', 'Acero galvanizado G90'],
    },
    {
      id: 'deck60',
      image: 'assets/catalog/products/deck60.png',
      name: 'Steel Deck 60',
      code: 'CIM-SDK-60',
      category: 'losa',
      amenazaTag: 'Grandes Luces',
      shortTagline: 'Losa colaborante para mayores distancias entre vigas.',
      beneficioClave: 'Mayor resistencia para techos transitables.',
      recommendedFor: 'Edificios comerciales y estacionamientos.',
      specs: ['Nervio: 60 mm', 'Ancho útil: 0.90 m', 'Luces de hasta 5 m'],
      badge: 'Más Vendido',
    },
    {
      id: 'deck75',
      image: 'assets/catalog/products/deck75.png',
      name: 'Steel Deck 75',
      code: 'CIM-SDK-75',
      category: 'losa',
      amenazaTag: 'Carga Pesada',
      shortTagline: 'Máxima rigidez estructural para naves y losas pesadas.',
      beneficioClave: 'Grandes luces con mínimo uso de puntales.',
      recommendedFor: 'Naves industriales pesadas y varios niveles.',
      specs: ['Nervio: 75 mm', 'Ancho útil: 0.915 m'],
    },
    {
      id: 'accesorios-deck',
      image: 'assets/catalog/products/accesorios_deck.png',
      name: 'Accesorios Steel Deck',
      code: 'CIM-ACC-DECK',
      category: 'losa',
      amenazaTag: 'Fijación Segura',
      shortTagline: 'Topes de borde, cierre y pernos conectores Nelson.',
      beneficioClave: 'Evita derrames de concreto y afianza la estructura.',
      recommendedFor: 'Montaje de losas colaborantes sobre vigas.',
      specs: ['Topes a medida', 'Pernos conectores de cortante'],
    },

    // --- Iluminación Hermética (Policarbonato) ---
    {
      id: 'tr4-difusor',
      image: 'assets/catalog/products/tr4_difusor.png',
      name: 'Policarbonato TR-4 Blanco',
      code: 'CIM-PC-TR4D',
      category: 'luz',
      amenazaTag: 'Luz sin Calor',
      shortTagline: 'Paso de luz natural con encaje hermético en perfil TR-4.',
      beneficioClave: '75% de luz natural sin goteras en el traslape.',
      recommendedFor: 'Tragaluces en techos industriales TR-4.',
      specs: ['Protección UV multicapa', 'Peralte 50 mm / Ancho 1.00 m'],
    },
    {
      id: 'tr5-difusor',
      image: 'assets/catalog/products/tr5_difusor.png',
      name: 'Policarbonato TR-5 Blanco',
      code: 'CIM-PC-TR5D',
      category: 'luz',
      amenazaTag: 'Tragaluz Hermético',
      shortTagline: 'Iluminación continua compatible con planchas TR-5.',
      beneficioClave: 'Luz cenital uniforme y resistente al granizo.',
      recommendedFor: 'Almacenes, talleres y naves comerciales.',
      specs: ['Protección UV', 'Peralte 28 mm / Ancho 1.00 m'],
    },
  ];

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  filterBy(catId: string) {
    this.activeCategory = catId;
    if (catId === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === catId);
    }
  }

  getWhatsAppLink(product: Product): string {
    const text = encodeURIComponent(
      `Hola, deseo cotizar la cobertura *${product.name}* (Código: ${product.code}) para blindar mi techo ante el Fenómeno El Niño.`
    );
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }

  getGeneralWhatsAppLink(): string {
    const text = encodeURIComponent(
      `Hola, deseo asesoría técnica para elegir el techo adecuado para mi proyecto ante la temporada de lluvias de El Niño.`
    );
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => { this.selectedProduct = null; }, 300);
  }

  trackById(_: number, p: Product) { return p.id; }
}
