'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for client components
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/FloatingElements'), { ssr: false });

export function ClientComponents() {
  return (
    <>
      <div className="noise" aria-hidden="true"></div>
      <CustomCursor />
      <ParticleCanvas />
      <FloatingElements />
    </>
  );
} 