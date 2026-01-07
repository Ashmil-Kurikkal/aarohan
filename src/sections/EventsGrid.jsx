import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // IMPORT PORTAL
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from '../components/ui/LiquidGlass';
import { Trophy, Crown, Palette, Music, X, AlertCircle } from 'lucide-react';

const events = [
  { 
    title: "Mridangam", 
    subtitle: "Battle of Bands", 
    prize: "₹50k Pool", 
    date: "Day 1", 
    time: "10:00 AM - 4:00 PM",
    icon: <Music size={24} />,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop",
    description: "The ultimate clash of musical titans. Fusion, rock, or classical – bring your best sound to the stage. Bands will be judged on harmony, stage presence, and crowd interaction.",
    rules: ["Time limit: 15 minutes (including setup)", "Minimum 3 members per band", "No backing tracks allowed"]
  },
  { 
    title: "Nritya", 
    subtitle: "Group Dance", 
    prize: "₹30k Pool", 
    date: "Day 2", 
    time: "2:00 PM - 6:00 PM",
    icon: <Crown size={24} />,
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop",
    description: "Sync your steps and rhythm in this high-energy group dance battle. From classical Bharatanatyam to contemporary Hip-Hop, showcase your choreography.",
    rules: ["Time limit: 8 minutes", "Team size: 6-12 members", "Props are allowed but must be cleared"]
  },
  { 
    title: "Chitra", 
    subtitle: "Live Art", 
    prize: "₹20k Pool", 
    date: "Day 1-2", 
    time: "Ongoing",
    icon: <Palette size={24} />,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    description: "Let your canvas speak. Artists will capture the essence of the festival live. The theme will be given on the spot.",
    rules: ["Canvas provided by organizers", "Bring your own paints/brushes", "Digital art is not permitted"]
  },
  { 
    title: "Natya", 
    subtitle: "Street Play", 
    prize: "₹15k Pool", 
    date: "Day 3", 
    time: "11:00 AM - 1:00 PM",
    icon: <Trophy size={24} />,
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    description: "Voices that echo change. Perform compelling street plays that touch upon social issues with satire, humor, and emotion.",
    rules: ["Time limit: 12 minutes", "No microphones allowed", "Language: English or Hindi"]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 
    }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const EventsGrid = ({ onModalChange }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --- STRICT SCROLL LOCK (LENIS COMPATIBLE) & NAV HIDE ---
  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedEvent);
    }

    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
      if (onModalChange) onModalChange(false);
    };
  }, [selectedEvent, onModalChange]);

  return (
    <section className="py-24 px-6 relative bg-[#1a0505]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 border-b border-white/10 pb-4"
        >
           <div>
             <h2 className="text-4xl md:text-5xl font-amita font-bold text-white mb-2">Competitions</h2>
             <p className="text-amber-200/60 font-merriweather">Where talent meets tradition.</p>
           </div>
           <button className="text-amber-400 hover:text-amber-200 font-bold tracking-widest uppercase text-sm mt-6 md:mt-0 transition-colors">
             View Schedule →
           </button>
        </motion.div>

        {/* Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {events.map((evt, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              onClick={() => setSelectedEvent(evt)} 
              className="cursor-pointer"
            >
              <LiquidGlass className="p-6 h-full hover:bg-amber-900/20 transition-all duration-300 border-amber-500/10 group hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-full bg-amber-600/10 text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                    {evt.icon}
                  </div>
                  <span className="text-xs font-bold bg-white/5 px-3 py-1 rounded-full text-amber-100/50 font-sans tracking-wide">
                    {evt.date}
                  </span>
                </div>
                <h3 className="text-2xl font-amita font-bold text-white mb-1">{evt.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{evt.subtitle}</p>
                <div className="h-px w-full bg-white/10 mb-4" />
                <p className="text-amber-200/80 text-sm font-merriweather">
                  Prize: <span className="text-white font-bold">{evt.prize}</span>
                </p>
                <p className="text-xs text-amber-500/60 mt-4 font-bold uppercase tracking-wider group-hover:text-amber-400">
                  Tap for details &rarr;
                </p>
              </LiquidGlass>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- PORTAL WRAPPER FOR MODAL --- */}
      {createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={() => setSelectedEvent(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-2xl max-h-[85vh] z-10"
              >
                {/* UPDATED: md:min-h-[450px] forces a standard size 
                   so the modal feels substantial even if text is short. 
                */}
                <LiquidGlass className="w-full h-full md:min-h-[450px] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-amber-900/40 border-amber-500/30">
                   <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white/70 hover:bg-amber-500 hover:text-black transition-colors backdrop-blur-sm"
                  >
                    <X size={20} />
                  </button>
                  <div className="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
                    {/* UPDATED: absolute inset-0 to prevent image intrinsic height from breaking layout
                    */}
                    <img src={selectedEvent.image} alt={selectedEvent.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 md:hidden z-20">
                       <h3 className="text-3xl font-amita font-bold text-white">{selectedEvent.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto bg-black/40">
                    <div className="hidden md:block">
                        <h3 className="text-3xl font-amita font-bold text-white mb-1">{selectedEvent.title}</h3>
                        <p className="text-amber-400 font-merriweather mb-6 text-sm">{selectedEvent.subtitle}</p>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-merriweather text-sm mb-6">{selectedEvent.description}</p>
                    <div className="mb-6">
                      <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                        <AlertCircle size={14} /> Rules & Guidelines
                      </h4>
                      <ul className="space-y-2">
                        {selectedEvent.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                     <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest rounded transition-colors shadow-lg shadow-amber-900/20 text-sm">
                        Register Now
                      </button>
                  </div>
                </LiquidGlass>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default EventsGrid;