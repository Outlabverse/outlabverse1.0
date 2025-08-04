'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap/dist/gsap';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

export default function Services() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = () => {
      // Mouse move handler intentionally left blank (no-op)
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
  


  const services = [
    {
      id: '01',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like Next.js, React, and TypeScript.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Ready', 'Progressive Web Apps'],
      icon: '🌐',
      detailedDescription: 'We create fast, scalable, and user-friendly web applications using cutting-edge technologies. Our development process focuses on performance, security, and user experience.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      deliverables: ['Custom web application', 'Responsive design', 'Admin dashboard', 'Documentation', '3 months support'],
      timeline: '4-12 weeks',
      startingPrice: 'From $5,000'
    },
    {
      id: '02',
      title: 'AI Solutions',
      description: 'Cutting-edge artificial intelligence solutions including machine learning models and AI-powered applications.',
      features: ['Machine Learning', 'Computer Vision', 'Natural Language Processing', 'Custom AI Models'],
      icon: '🤖',
      detailedDescription: 'We develop custom AI solutions that transform business processes and drive innovation through intelligent automation.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Hugging Face', 'AWS SageMaker'],
      deliverables: ['AI model development', 'API integration', 'Training data preparation', 'Model deployment', '6 months support'],
      timeline: '6-16 weeks',
      startingPrice: 'From $15,000'
    },
    {
      id: '03',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: ['React Native', 'Native iOS & Android', 'App Store Optimization', 'Push Notifications'],
      icon: '📱',
      detailedDescription: 'We build high-performance mobile applications that deliver exceptional user experiences across all devices.',
      technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'App Store Connect'],
      deliverables: ['Mobile application', 'App store submission', 'Push notifications', 'Analytics setup', '6 months support'],
      timeline: '8-20 weeks',
      startingPrice: 'From $10,000'
    },
    {
      id: '04',
      title: 'UI/UX Design',
      description: 'User-centered design solutions that create intuitive and engaging digital experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      icon: '🎨',
      detailedDescription: 'We create beautiful, functional designs that prioritize user experience and drive business results.',
      technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision', 'Miro', 'Hotjar'],
      deliverables: ['Design system', 'Interactive prototypes', 'User research report', 'Design handoff', '3 months revisions'],
      timeline: '4-10 weeks',
      startingPrice: 'From $3,000'
    },
    {
      id: '05',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
      features: ['AWS/Azure/GCP', 'DevOps', 'Microservices', 'Container Orchestration'],
      icon: '☁️',
      detailedDescription: 'We architect and deploy scalable cloud infrastructure that grows with your business needs.',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Monitoring Tools'],
      deliverables: ['Cloud architecture', 'CI/CD pipelines', 'Infrastructure monitoring', 'Documentation', '12 months support'],
      timeline: '2-8 weeks',
      startingPrice: 'From $8,000'
    },
    {
      id: '06',
      title: 'Consulting',
      description: 'Strategic technology consulting to help businesses make informed digital transformation decisions.',
      features: ['Technology Audit', 'Digital Strategy', 'Architecture Planning', 'Team Training'],
      icon: '💡',
      detailedDescription: 'We provide expert guidance to help you make informed technology decisions and accelerate your digital transformation.',
      technologies: ['Various based on needs', 'Industry best practices', 'Agile methodologies', 'Strategic planning'],
      deliverables: ['Technology audit report', 'Strategic roadmap', 'Architecture recommendations', 'Team training', 'Ongoing guidance'],
      timeline: '2-12 weeks',
      startingPrice: 'From $2,000'
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
            className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-8"
          >
            <div className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
              Services — <span className="text-[#00d4aa]">What We Offer</span>
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                text={<>
                  <span className="block">Transforming Ideas</span>
                  <span className="block">into <span className="text-gradient">Digital Reality</span></span>
                </>}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-center"
                animationDelay={0.5}
              />
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
                text="From concept to deployment, we provide comprehensive digital solutions that drive innovation and deliver exceptional results for businesses of all sizes."
                className="text-lg md:text-xl text-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center"
                animationDelay={0.8}
                wordByWord
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="p-8 group text-white bg-[#0f1714]/80 border border-[#00d4aa33] rounded-2xl shadow-lg hover:shadow-cyan-500/20 hover:border-[#00d4aa] transition-shadow transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="text-white/40 font-mono text-sm">{service.id}</div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]"></div>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <MagneticButton strength={0.3}>
                    <Link 
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-[#00d4aa] text-sm font-medium hover:text-white transition-colors duration-300 flex items-center gap-2 group/btn"
                    >
                      Learn More
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </MagneticButton>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Transparent pricing for web development projects. Every project is unique, so let&apos;s discuss your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We understand your business goals and technical requirements through detailed consultation.'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Creating user-centered designs and technical architecture that align with your vision.'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Building your solution using best practices and cutting-edge technologies.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Deploying your solution and providing ongoing support for optimal performance.'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="glass p-6 rounded-2xl mb-4 group-hover:border-[#00d4aa]/30 transition-all duration-300 h-48 flex flex-col justify-between">
                  <div className="text-3xl font-bold text-gradient mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-white/70 text-sm flex-1 flex items-center justify-center">{phase.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/20">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your requirements and create a custom solution that drives your business forward.
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
              <Link href="/" className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center">
                View Portfolio
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}