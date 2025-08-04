'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap/dist/gsap';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';
import React from 'react';

const ParallaxHero = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroContentRef.current) return;
    gsap.fromTo(heroContentRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <section className="flex flex-col min-h-screen w-full relative z-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-32">
        <div
          ref={heroContentRef}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
            About — <span className="text-[#00d4aa]">Our Story</span>
          </div>
          <div className="overflow-hidden text-center">
            <SplitText
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              text={<>
                <span className="block">Creating the</span>
                <span className="block text-gradient">Future of Digital</span>
              </>}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-center"
              animationDelay={0.5}
            />
          </div>
          <div className="overflow-hidden text-center">
            <SplitText
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              text="We are a team of passionate innovators, designers, and developers dedicated to pushing the boundaries of what&apos;s possible in the digital realm."
              className="text-lg md:text-xl text-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center"
              animationDelay={0.8}
              wordByWord
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function About() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current.children,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0f0d] text-[#f8fafc] overflow-x-hidden">
      {/* Modern gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f1714] via-[#0a0f0d] to-[#001a33] -z-10"></div>
      {/* Navigation */}
      <Navigation logoRef={logoRef} navRef={navRef} />
      {/* Hero Section */}
      <ParallaxHero />
      {/* About Content */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                At Outlabverse, we believe in creating digital experiences that transcend traditional boundaries. 
                Our mission is to develop innovative solutions that not only meet today&apos;s needs but anticipate 
                tomorrow&apos;s possibilities.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                We combine cutting-edge technology with human-centered design to deliver products that are 
                both functionally superior and emotionally engaging.
              </p>
            </div>
            <div className="relative">
              <div className="glass p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">5+</div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">5</div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">3</div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">Country Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">Passion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <TeamSection />

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and explore how we can bring your vision to life with our expertise and passion.
            </p>
            <MagneticButton strength={0.5}>
              <Link 
                href="/contact"
                className="btn-modern text-sm relative overflow-hidden group inline-block"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
} 

// Team data outside components
const TEAM_MEMBERS = [
  {
    name: "Siar Wei Yuan",
    role: "CO-Founder",
    bio: "Founder and chief executive, driving the company's mission and growth."
  },
  {
    name: "Bill Aung Pyae Soe",
    role: "CO-Founder",
    bio: "Tech visionary and architect, leading our technology strategy and execution."
  },
  {
    name: "Derick",
    role: "Dev Lead",
    bio: "Development team leader, ensuring code quality and project delivery."
  },
  {
    name: "BoBo",
    role: "Dev",
    bio: "Full-stack developer passionate about building robust digital solutions."
  },
  {
    name: "Fuku",
    role: "UI/UX",
    bio: "UI/UX specialist focused on creating delightful user experiences."
  }
];

// Memoized TeamCard component
const TeamCard = React.memo(function TeamCard({ name, role, bio }: { name: string, role: string, bio: string }) {
  return (
    <div className="group relative p-8 text-center min-w-[280px] max-w-[320px] text-white bg-gradient-to-br from-[#0f1714]/90 via-[#0a0f0d]/80 to-[#001a33]/70 border border-[#00d4aa]/20 rounded-3xl shadow-2xl hover:shadow-[#00d4aa]/20 hover:border-[#00d4aa]/60 transition-all duration-500 backdrop-blur-sm overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/5 to-[#0066ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00d4aa] transition-colors duration-300 mt-6">
          {name}
        </h3>
        
        <div className="text-[#00d4aa] text-sm font-semibold uppercase tracking-widest mb-4 opacity-90">
          {role}
        </div>
        
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00d4aa]/50 to-transparent mx-auto mb-4"></div>
        
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {bio}
        </p>
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00d4aa]/10 via-transparent to-[#0066ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
});

TeamCard.displayName = "TeamCard";

// Memoized TeamSection
const TeamSection = React.memo(() => {
  // First row: CEO, CTO
  const firstRow = TEAM_MEMBERS.slice(0, 2);
  // Second row: rest
  const secondRow = TEAM_MEMBERS.slice(2);
  return (
    <div className="mb-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Meet Our Team</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          The passionate individuals behind Outlabverse, dedicated to creating exceptional digital experiences.
        </p>
      </div>
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          {firstRow.map(member => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-8 justify-center items-center flex-wrap max-w-5xl">
          {secondRow.map(member => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
});
TeamSection.displayName = "TeamSection"; 