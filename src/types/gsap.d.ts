/// <reference types="gsap" />

declare module 'gsap' {
  interface GSAPStatic {
    registerPlugin(...args: gsap.Plugin[]): void;
  }

  interface GSAPTimeline {
    from(
      targets: Element | Element[] | string,
      vars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
    fromTo(
      targets: Element | Element[] | string,
      fromVars: gsap.TweenVars,
      toVars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
    to(
      targets: Element | Element[] | string,
      vars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
  }
}

declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: gsap.Plugin;
} 