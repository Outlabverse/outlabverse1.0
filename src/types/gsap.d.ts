/// <reference types="gsap" />

declare module 'gsap' {
  interface GSAPStatic {
    registerPlugin(...args: any[]): void;
  }

  interface GSAPTimeline {
    from(
      targets: any,
      vars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
    fromTo(
      targets: any,
      fromVars: gsap.TweenVars,
      toVars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
    to(
      targets: any,
      vars: gsap.TweenVars,
      position?: string | number
    ): gsap.core.Timeline;
  }
}

declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: any;
} 