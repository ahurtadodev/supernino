import { Injectable, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParticleConfig {
  count: number;
  color: string;
  maxSize: number;
  speed: number;
  opacity: number;
}

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private reducedMotion = false;

  constructor(private ngZone: NgZone) {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Setup ScrollTrigger defaults */
  init() {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });
  }

  /** Reveal element from opacity 0 + translateY */
  revealUp(
    elements: string | Element | Element[],
    options: Partial<{ delay: number; duration: number; stagger: number; start: string }> = {}
  ) {
    if (this.reducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }
    const { delay = 0, duration = 1, stagger = 0.15, start = 'top 80%' } = options;
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: elements as Element, start },
      }
    );
  }

  /** Reveal element with opacity only */
  revealFade(
    elements: string | Element | Element[],
    options: Partial<{ delay: number; duration: number; start: string }> = {}
  ) {
    if (this.reducedMotion) {
      gsap.set(elements, { opacity: 1 });
      return;
    }
    const { delay = 0, duration = 1.5, start = 'top 85%' } = options;
    return gsap.fromTo(
      elements,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: elements as Element, start },
      }
    );
  }

  /** Parallax scroll effect */
  parallax(
    element: string | Element,
    trigger: string | Element,
    speed: number = 0.3,
    direction: 'y' | 'x' = 'y'
  ) {
    if (this.reducedMotion) return;
    const prop = direction === 'y' ? 'yPercent' : 'xPercent';
    return gsap.to(element, {
      [prop]: speed * 30,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger as Element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /** Zoom image on scroll */
  zoomOnScroll(
    element: string | Element,
    trigger: string | Element,
    from: number = 1,
    to: number = 1.15
  ) {
    if (this.reducedMotion) return;
    return gsap.fromTo(
      element,
      { scale: from },
      {
        scale: to,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger as Element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  /** Clip-path reveal */
  clipReveal(
    element: string | Element,
    options: Partial<{ duration: number; start: string; delay: number }> = {}
  ) {
    if (this.reducedMotion) {
      gsap.set(element, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });
      return;
    }
    const { duration = 1.4, start = 'top 80%', delay = 0 } = options;
    return gsap.fromTo(
      element,
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: { trigger: element as Element, start },
      }
    );
  }

  /** Character stagger reveal */
  charsReveal(
    chars: Element[],
    options: Partial<{ duration: number; stagger: number; delay: number; start: string }> = {}
  ) {
    if (this.reducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }
    const { duration = 0.8, stagger = 0.04, delay = 0, start = 'top 80%' } = options;
    return gsap.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'back.out(1.2)',
        scrollTrigger: chars[0]
          ? { trigger: chars[0].closest('.headline-xl, .headline-lg, section') || chars[0], start }
          : undefined,
      }
    );
  }

  /** Counter animation */
  countUp(
    element: Element,
    target: number,
    options: Partial<{ duration: number; prefix: string; suffix: string; start: string }> = {}
  ) {
    const { duration = 2, prefix = '', suffix = '', start = 'top 80%' } = options;
    const obj = { val: 0 };
    return gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: element, start, toggleActions: 'play none none none' },
      onUpdate: () => {
        element.textContent = prefix + Math.round(obj.val).toLocaleString('es-PE') + suffix;
      },
    });
  }

  /** Refresh ScrollTrigger (call after route changes or DOM updates) */
  refresh() {
    ScrollTrigger.refresh();
  }

  /** Kill all */
  kill() {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
