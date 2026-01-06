import React, { useState } from 'react';
import Hero from './sections/Hero';
import LineUp from './sections/LineUp';
import EventsGrid from './sections/EventsGrid';
import GetPasses from './sections/GetPasses'; // New Import
import Gallery from './sections/Gallery';     // New Import
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Shared Link Styles
  const navLinkStyles = "hover:text-amber-400 transition-all duration-300 cursor-pointer tracking-wider font-medium text-sm md:text-base relative group";
  
  // Custom Underline Effect Component
  const NavLink = ({ text, href = "#" }) => (
    <a href={href} className={navLinkStyles} onClick={() => setIsMobileMenuOpen(false)}>
      {text}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );

  return (
    <div className="bg-[#1a0505] min-h-screen text-slate-200 selection:bg-amber-500/30 overflow-x-hidden scroll-smooth">
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${isMobileMenuOpen ? 'backdrop-blur-xl bg-black/50': 'backdrop-blur-sm'}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Logo */}
          <div className="flex flex-col items-start cursor-pointer z-50 group select-none" onClick={() => window.scrollTo(0,0)}>
              <h1 className="mt-3 font-amita font-bold text-3xl md:text-4xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:brightness-125">
                  आROHAN
              </h1>
              <div className="flex items-center gap-2 w-full mt-[-4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                  <span className="text-[0.5rem] tracking-[0.4em] text-amber-400 uppercase font-sans font-medium">
                      The Ascent
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center gap-8 px-8 py-3 rounded-full border border-amber-500/10 bg-black/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] font-merriweather">
            <NavLink text="Home" href="#" />
            <NavLink text="Lineup" href="#lineup" />
            <NavLink text="Competitions" href="#competitions" />
            <NavLink text="Gallery" href="#gallery" />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden z-50 p-2 text-amber-100 hover:text-amber-400 transition-colors bg-white/5 rounded-lg border border-white/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 pt-20 bg-black/90"
          >
             {/* Decorative Elements */}
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
             <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

             {/* Links */}
             <div className="flex flex-col items-center gap-8 font-merriweather text-xl text-amber-100">
                <NavLink text="Home" href="#" />
                <NavLink text="Lineup" href="#lineup" />
                <NavLink text="Competitions" href="#competitions" />
                <NavLink text="Gallery" href="#gallery" />
                <a href="#passes" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded shadow-lg shadow-amber-900/50">
                  Buy Tickets
                </a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        
        {/* IDs added for Navigation Scrolling */}
        <div id="lineup">
          <LineUp />
        </div>
        
        {/* New Passes Section */}
        <div id="passes">
          <GetPasses />
        </div>

        <div id="competitions">
          <EventsGrid />
        </div>

        {/* New Gallery Section */}
        <Gallery />
      </main>

      <footer className="py-10 text-center text-slate-500 text-sm border-t border-white/5 bg-[#0f0303] relative z-10">
        <p className="font-merriweather">© 2026 Aarohan Cultural Fest. FISAT</p>
      </footer>
    </div>
  );
}

export default App;