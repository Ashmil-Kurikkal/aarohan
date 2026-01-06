import React, { useState, useEffect } from 'react';
import Hero from './sections/Hero';
import LineUp from './sections/LineUp';
import EventsGrid from './sections/EventsGrid';
import GetPasses from './sections/GetPasses';
import Gallery from './sections/Gallery';
import { Menu, X, Ticket } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './sections/Footer';
import Lenis from 'lenis';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // --- LENIS SMOOTH SCROLL (Updated to Expose Instance) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Attach to window so child components can pause it
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const navLinkStyles = "hover:text-amber-400 transition-all duration-300 cursor-pointer tracking-wider font-medium text-sm md:text-base relative group";
  
  const NavLink = ({ text, href = "#" }) => (
    <a 
      href={href} 
      className={navLinkStyles} 
      onClick={(e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {text}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#1a0505] text-slate-200 selection:bg-amber-500/30 min-h-screen w-full no-scrollbar">
        
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${isMobileMenuOpen ? 'backdrop-blur-xl bg-black/50': 'backdrop-blur-sm'}`}>
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex flex-col items-start cursor-pointer z-50 group select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <h1 className="mt-3 font-amita font-bold text-3xl md:text-4xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    आROHAN
                </h1>
            </div>

            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center gap-8 px-8 py-3 rounded-full border border-amber-500/10 bg-black/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] font-merriweather">
              <NavLink text="Home" href="#hero" />
              <NavLink text="Lineup" href="#lineup" />
              <NavLink text="Competitions" href="#competitions" />
              <NavLink text="Gallery" href="#gallery" />
            </div>

            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-merriweather text-xs uppercase tracking-widest px-6 py-3 rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Ticket size={16} /> Book Now
                </button>

                <button onClick={toggleMenu} className="md:hidden z-50 p-2 text-amber-100 hover:text-amber-400 transition-colors bg-white/5 rounded-lg border border-white/10">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 pt-20 bg-black/90"
            >
               <div className="flex flex-col items-center gap-8 font-merriweather text-xl text-amber-100">
                  <NavLink text="Home" href="#hero" />
                  <NavLink text="Lineup" href="#lineup" />
                  <NavLink text="Competitions" href="#competitions" />
                  <NavLink text="Gallery" href="#gallery" />
                  <button 
                    onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}
                    className="mt-4 px-8 py-3 bg-amber-600 text-black font-bold uppercase tracking-widest rounded shadow-lg shadow-amber-900/40"
                  >
                    Get Passes
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* HERO: Passes `setIsBookingOpen` to the Hero component */}
          <div id="hero" className="relative z-10 bg-[#1a0505]">
             <Hero setIsBookingOpen={setIsBookingOpen} />
          </div>
          
          <div 
            id="lineup" 
            className="relative z-0 min-h-screen flex flex-col justify-center bg-[#1a0505] md:sticky md:top-0 md:h-screen md:overflow-hidden"
          >
            <LineUp />
          </div>
          
          <div className="relative z-10 bg-[#1a0505] border-t border-white/10 md:shadow-[0_-50px_100px_rgba(0,0,0,0.9)]">
            
            <div id="passes">
              <GetPasses isOpen={isBookingOpen} setIsOpen={setIsBookingOpen} />
            </div>

            <div id="competitions">
              <EventsGrid />
            </div>

            <div id="gallery">
               <Gallery />
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;