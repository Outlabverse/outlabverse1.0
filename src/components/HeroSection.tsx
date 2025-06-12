import React, { RefObject, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';
import MagneticButton from './MagneticButton';

interface HeroSectionProps {
  titleRef: RefObject<HTMLHeadingElement>;
  subtitleRef: RefObject<HTMLParagraphElement>;
  formRef?: RefObject<HTMLFormElement>;
  logoRef: RefObject<HTMLDivElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  titleRef,
  subtitleRef,
  formRef,
  logoRef,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Initialize animations on component mount
  useEffect(() => {
    if (!navRef.current || !heroContentRef.current || !heroImageRef.current) return;
    
    // Reveal animation for navigation
    gsap.fromTo(navRef.current.children, 
      { y: -30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.05, 
        duration: 0.8, 
        ease: "power3.out",
        delay: 0.5
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
        delay: 0.8
      }
    );
    
    // Reveal animation for hero image
    gsap.fromTo(heroImageRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: "power3.out",
        delay: 1
      }
    );
  }, []);
  
  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at top
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide navbar
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <section className="flex flex-col min-h-screen w-full relative z-10 overflow-hidden">
      {/* Navbar with liquid hover effect */}
      <header className={`fixed top-0 left-0 w-full px-8 md:px-16 py-6 flex justify-between items-center z-50 backdrop-blur-md bg-gradient-to-b from-[#0a0f0d]/20 via-[#0a0f0d]/10 to-transparent transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div ref={logoRef} className="relative group">
          <div className="border-gradient w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="border-gradient-content flex items-center justify-center w-full h-full">
              <span className="text-gradient font-bold text-xl">O</span>
            </div>
          </div>
          <div className="absolute -inset-2 bg-[#00d4aa]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div ref={navRef} className="flex items-center">
          <nav className="hidden md:flex items-center gap-10 mr-8">
            {["About", "Projects", "Contact"].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-white text-sm uppercase tracking-widest transition-colors relative overflow-hidden group"
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="relative z-10">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] transform scale-x-0 origin-left transition-transform duration-300 ${hoveredLink === index ? 'scale-x-100' : ''}`}></span>
              </a>
            ))}
          </nav>
          
          <div className="md:hidden ml-6">
            <button className="text-white relative group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="absolute -inset-3 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main hero content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen px-6 py-32 md:py-0">
        {/* Left side content */}
        <div 
          ref={heroContentRef}
          className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col items-start space-y-8 md:pr-8"
        >
          <div className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
            Coming soon — <span className="text-[#00d4aa]">Q3 2025</span>
          </div>
          
          <div className="overflow-hidden">
            <SplitText
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              text={<>
                <span className="block text-gradient">Outlab</span>
                <span className="block">verse</span>
              </>}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              animationDelay={0.5}
            />
          </div>
          
          <div className="overflow-hidden">
            <SplitText
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              text="Creating a new dimension for the digital world where innovation meets immersive experiences."
              className="text-lg text-white/70 max-w-md"
              animationDelay={0.8}
              wordByWord
            />
          </div>
          
          <form 
            ref={formRef}
            className="w-full max-w-md mt-8 space-y-3"
          >
            <p className="text-sm text-white/60 mb-4">Stay updated with our latest news</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00d4aa] text-white placeholder:text-white/30 transition-all duration-300"
                  required
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 group-focus-within:border-[#00d4aa] rounded-lg pointer-events-none transition-all duration-300"></div>
              </div>
              
              <MagneticButton strength={0.5}>
                <button 
                  type="submit" 
                  className="btn-modern text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </MagneticButton>
            </div>
            
            <p className="text-xs text-white/40 mt-2">By signing up, you agree to our <a href="#" className="text-white/60 hover:text-white underline">Terms</a> and <a href="#" className="text-white/60 hover:text-white underline">Privacy Policy</a>.</p>
          </form>
          
          <div className="flex items-center space-x-6 mt-6">
            {[
              { name: 'Twitter', path: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
              { name: 'Instagram', path: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
              { name: 'Discord', path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z' }
            ].map((social, index) => (
              <MagneticButton key={index} strength={0.3}>
                <a 
                  href="#" 
                  aria-label={social.name} 
                  className="text-white/50 hover:text-white transition-colors relative group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                  <div className="absolute -inset-3 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
        
        {/* Right side 3D mockup/image */}
        <div 
          ref={heroImageRef}
          className="w-full md:w-1/2 h-[400px] md:h-[600px] mt-12 md:mt-0 relative"
          style={{
            transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0px)`
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
            <div className="card w-full h-[400px] md:h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Modern 3D UI mockup with depth */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e1a]/90 to-[#15091d]/90 backdrop-blur-md"></div>
                
                {/* Glowing accent */}
                <div className="absolute top-[30%] right-[20%] w-32 h-32 bg-[#0066ff]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[20%] left-[30%] w-24 h-24 bg-[#00d4aa]/20 rounded-full blur-2xl"></div>
                
                {/* Mockup UI elements */}
                <div className="absolute top-0 left-0 w-full h-12 bg-[#0f1714]/80 backdrop-blur-sm flex items-center px-4 border-b border-white/5">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#00d4aa]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#0066ff]/50"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="ml-4 h-6 w-40 bg-white/5 rounded"></div>
                </div>
                
                {/* Mockup content with 3D-like depth */}
                <div className="absolute top-16 left-4 right-4 bottom-4 flex flex-col">
                  {/* Top section */}
                  <div className="mb-6">
                    <div className="h-6 w-1/3 bg-white/10 mb-4 rounded"></div>
                    <div className="h-40 w-full bg-gradient-to-br from-black/40 to-black/10 mb-6 rounded-lg overflow-hidden relative border border-white/10">
                      {/* Glass card with content */}
                      <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-[#00d4aa]/10 to-[#0066ff]/10"></div>
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 border border-white/20"></div>
                      <div className="absolute top-4 left-16 right-4">
                        <div className="h-3 w-1/2 bg-white/20 mb-2 rounded"></div>
                        <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                      </div>
                      
                      {/* Interactive elements */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="h-8 w-20 bg-white/10 rounded-md border border-white/10"></div>
                        <div className="h-8 w-8 bg-[#0066ff]/30 rounded-md border border-[#0066ff]/30"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card grid with depth */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-28 bg-black/20 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#00d4aa]/20 border border-[#00d4aa]/20"></div>
                      <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                    </div>
                    <div className="h-28 bg-black/20 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#0066ff]/20 border border-[#0066ff]/20"></div>
                      <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Text elements */}
                  <div className="h-4 w-full bg-white/5 mb-3 rounded"></div>
                  <div className="h-4 w-4/5 bg-white/5 mb-3 rounded"></div>
                  <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                  
                  {/* Bottom interactive element */}
                  <div className="mt-auto h-10 bg-gradient-to-r from-[#00d4aa]/20 to-[#0066ff]/20 rounded-lg border border-white/10 flex items-center justify-center">
                    <div className="h-3 w-16 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 border-gradient rounded-full overflow-hidden animate-spin-slow">
                <div className="border-gradient-content"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#00d4aa] rounded-full blur-lg opacity-30"></div>
              
              {/* Smaller floating elements for depth */}
              <div className="absolute top-[20%] -left-4 w-8 h-8 border border-white/20 rounded-md bg-white/5 backdrop-blur-sm transform rotate-12 animate-float"></div>
              <div className="absolute bottom-[30%] -right-4 w-6 h-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm transform -rotate-12 animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 