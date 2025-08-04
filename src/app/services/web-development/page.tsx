'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap/dist/gsap';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

export default function WebDevelopment() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Initialize animations on component mount
  useEffect(() => {
    if (!navRef.current || !heroContentRef.current) return;
    
    // Reveal animation for navigation
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
    
    // Reveal animation for hero content
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

  const technologies = [
    { name: 'Next.js', description: 'React framework for production' },
    { name: 'React', description: 'Modern component-based UI library' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Node.js', description: 'JavaScript runtime for server-side' },
    { name: 'PostgreSQL', description: 'Advanced relational database' },
  ];

  const caseStudies = [
    {
      title: 'E-commerce Platform',
      description: 'Built a scalable e-commerce solution with 99.9% uptime',
      metrics: ['50% faster load times', '200% increase in conversions', '1M+ products supported'],
      image: '🛍️'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Created an intuitive analytics dashboard for enterprise clients',
      metrics: ['95% user satisfaction', '40% reduction in support tickets', 'Real-time data processing'],
      image: '📊'
    },
    {
      title: 'Healthcare Portal',
      description: 'Developed HIPAA-compliant patient management system',
      metrics: ['100% compliance achieved', '60% faster appointment booking', '500+ healthcare providers'],
      image: '🏥'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0a0f0d] text-[#f8fafc] overflow-x-hidden">
      {/* Modern gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f1714] via-[#0a0f0d] to-[#001a33] -z-10"></div>
      
      {/* Navigation */}
      <Navigation logoRef={logoRef} navRef={navRef} />

      {/* Hero Section */}
      <section className="flex flex-col min-h-screen w-full relative z-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-32">
          <div 
            ref={heroContentRef}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm gap-2">
              <Link href="/services" className="text-white/40 hover:text-white/60 transition-colors">Services</Link>
              <span className="text-white/20">/</span>
              <span className="text-[#00d4aa]">Web Development</span>
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                text={<>
                  <span className="block">Modern Web</span>
                  <span className="block"><span className="text-gradient">Development</span></span>
                </>}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-center"
                animationDelay={0.5}
              />
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
                text="We build fast, scalable, and user-friendly web applications using cutting-edge technologies and best practices that drive business growth."
                className="text-lg md:text-xl text-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center"
                animationDelay={0.8}
                wordByWord
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Offer</h2>
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3 text-gradient">🚀 Performance First</h3>
                  <p className="text-white/70">Lightning-fast websites optimized for speed, SEO, and user experience with Core Web Vitals scores that rank.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3 text-gradient">📱 Responsive Design</h3>
                  <p className="text-white/70">Mobile-first approach ensuring your website looks and works perfectly on all devices and screen sizes.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3 text-gradient">🔒 Security & Scalability</h3>
                  <p className="text-white/70">Enterprise-grade security measures and scalable architecture that grows with your business needs.</p>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Technologies We Use</h3>
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="border border-white/10 rounded-xl p-4 hover:border-[#00d4aa]/30 transition-colors duration-300">
                    <h4 className="font-semibold text-[#00d4aa] mb-1">{tech.name}</h4>
                    <p className="text-white/60 text-xs">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Real results from real projects. See how we&apos;ve helped businesses transform their digital presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="card p-8 group hover:border-[#00d4aa]/30 transition-all duration-500">
                <div className="text-4xl mb-6">{study.image}</div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-gradient transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-white/70 mb-6">{study.description}</p>
                <div className="space-y-2">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]"></div>
                      <span className="text-white/60 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Development Process</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A proven methodology that ensures your web application is delivered on time and exceeds expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Requirements Analysis', description: 'Deep dive into your business needs and technical requirements' },
              { step: '02', title: 'Design & Prototyping', description: 'Create wireframes, mockups, and interactive prototypes' },
              { step: '03', title: 'Development & Testing', description: 'Build your application with rigorous testing at every stage' },
              { step: '04', title: 'Launch & Support', description: 'Deploy to production and provide ongoing maintenance' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="glass p-6 rounded-2xl mb-4 hover:border-[#00d4aa]/30 transition-all duration-300">
                  <div className="text-2xl font-bold text-gradient mb-4">{phase.step}</div>
                  <h3 className="text-lg font-bold mb-3">{phase.title}</h3>
                  <p className="text-white/70 text-sm">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Investment Options</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Transparent pricing for web development projects. Every project is unique, so let&apos;s discuss your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'From $5,000',
                description: 'Perfect for small businesses and startups',
                features: ['5-10 pages', 'Responsive design', 'Basic SEO', 'Contact forms', '3 months support']
              },
              {
                name: 'Professional',
                price: 'From $15,000',
                description: 'Ideal for growing businesses',
                features: ['Custom design', 'CMS integration', 'Advanced SEO', 'Analytics setup', '6 months support', 'Performance optimization'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom Quote',
                description: 'For complex applications and large organizations',
                features: ['Custom development', 'Third-party integrations', 'Advanced security', 'Scalable architecture', '12 months support', 'Dedicated team']
              }
            ].map((plan, index) => (
              <div key={index} className={`card p-8 ${plan.popular ? 'border-[#00d4aa]/50 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] text-white text-xs px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold text-gradient mb-4">{plan.price}</div>
                <p className="text-white/70 mb-6">{plan.description}</p>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]"></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <MagneticButton strength={0.3}>
                  <Link 
                    href="/contact"
                    className="btn-modern w-full text-center block"
                  >
                    Get Started
                  </Link>
                </MagneticButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Web Application?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project requirements and create a custom web solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.5}>
              <Link 
                href="/contact"
                className="btn-modern text-sm relative overflow-hidden group inline-block"
              >
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link 
                href="/portfolio"
                className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-3 rounded-xl transition-all duration-300 inline-block"
              >
                View Portfolio
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
} 