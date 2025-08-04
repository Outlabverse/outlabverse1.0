'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';
import PopupModal from '@/components/PopupModal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });
  const [popup, setPopup] = useState<{ open: boolean; success: boolean; title: string; message: string }>({
    open: false,
    success: true,
    title: '',
    message: '',
  });
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://formspree.io/f/mjkrqgnn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          project: formData.project,
          budget: formData.budget,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setPopup({
          open: true,
          success: true,
          title: 'Message Sent!',
          message: 'Thank you for your message! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', company: '', project: '', budget: '', message: '' });
      } else {
        setPopup({
          open: true,
          success: false,
          title: 'Error',
          message: 'There was an error. Please try again.',
        });
      }
    } catch {
      setPopup({
        open: true,
        success: false,
        title: 'Error',
        message: 'There was an error. Please try again.',
      });
    }
  };

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
              Contact — <span className="text-[#00d4aa]">Let&apos;s Connect</span>
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                text={<>
                  <span className="block">Let&apos;s Build Something</span>
                  <span className="block text-gradient">Amazing Together</span>
                </>}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-center"
                animationDelay={0.5}
              />
            </div>
            
            <div className="overflow-hidden text-center">
              <SplitText
                ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
                text="Ready to start your next project? We&apos;re here to help bring your vision to life. Get in touch and let&apos;s discuss how we can work together."
                className="text-lg md:text-xl text-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center"
                animationDelay={0.8}
                wordByWord
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  We&apos;re always excited to hear about new projects and opportunities. 
                  Whether you have a specific idea in mind or just want to explore possibilities, 
                  we&apos;re here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-gradient transition-colors duration-300">
                      Email Us
                    </h3>
                    <p className="text-white/90 mb-1">team@outlabverse.com</p>
                    <p className="text-white/60 text-sm">Drop us a line anytime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white placeholder:text-white/30 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white placeholder:text-white/30 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white placeholder:text-white/30 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white transition-all duration-300"
                    >
                      <option value="" className="bg-[#0a0f0d] text-white/60">Project Type</option>
                      <option value="web-development" className="bg-[#0a0f0d] text-white">Web Development</option>
                      <option value="mobile-app" className="bg-[#0a0f0d] text-white">Mobile App</option>
                      <option value="ui-ux-design" className="bg-[#0a0f0d] text-white">UI/UX Design</option>
                      <option value="consulting" className="bg-[#0a0f0d] text-white">Consulting</option>
                      <option value="other" className="bg-[#0a0f0d] text-white">Other</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white transition-all duration-300"
                    >
                      <option value="" className="bg-[#0a0f0d] text-white/60">Budget Range</option>
                      <option value="under-5k" className="bg-[#0a0f0d] text-white">Under $5,000</option>
                      <option value="5k-15k" className="bg-[#0a0f0d] text-white">$5,000 - $15,000</option>
                      <option value="15k-50k" className="bg-[#0a0f0d] text-white">$15,000 - $50,000</option>
                      <option value="50k-plus" className="bg-[#0a0f0d] text-white">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white placeholder:text-white/30 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>

                <MagneticButton strength={0.5}>
                  <button 
                    type="submit" 
                    className="w-full btn-modern text-sm relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </section>
      <PopupModal
        open={popup.open}
        onClose={() => setPopup(prev => ({ ...prev, open: false }))}
        title={popup.title}
        message={popup.message}
        success={popup.success}
      />
    </div>
  );
} 