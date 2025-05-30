import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { createNoiseEffect, initMarquee } from '@/utils/animations';

interface AnimationRefs {
  containerRef: RefObject<HTMLDivElement>;
  logoRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  subtitleRef: RefObject<HTMLParagraphElement>;
  formRef: RefObject<HTMLFormElement>;
  accentRef: RefObject<HTMLDivElement>;
  flourishRef: RefObject<HTMLDivElement>;
  projectsSectionRef: RefObject<HTMLDivElement>;
}

export const useMainAnimations = ({
  containerRef,
  logoRef,
  titleRef,
  subtitleRef,
  formRef,
  accentRef,
  flourishRef,
  projectsSectionRef
}: AnimationRefs) => {
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize GSAP animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });
    
    // Animate logo box
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
    })
    .from('.line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      stagger: 0.2,
    }, '-=0.8')
    .from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    }, '-=1')
    .from('.title-letter', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.04,
    }, '-=0.7')
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.6')
    .from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.4')
    .from('.social-icon', {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.1,
    }, '-=0.2')
    .from(accentRef.current, {
      opacity: 0, 
      rotation: -5,
      duration: 0.8
    }, '-=0.2')
    .from(flourishRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
    }, '-=0.6')
    .from('.marquee-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.4')
    .from(projectsSectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
    }, '-=0.2')
    .from('.project-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
    }, '-=0.6');
    
    // Create background noise/grain effect
    const noiseEffect = createNoiseEffect(containerRef);
    noiseEffect.init();
    
    // Initialize the marquee
    initMarquee();
    
    return () => {
      noiseEffect.destroy();
    };
  }, [
    containerRef,
    logoRef,
    titleRef,
    subtitleRef,
    formRef,
    accentRef,
    flourishRef,
    projectsSectionRef
  ]);
}; 