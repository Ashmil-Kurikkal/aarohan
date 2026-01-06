import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from '../components/ui/LiquidGlass';
import { Trophy, Crown, Palette, Music, X, Calendar, Clock, AlertCircle } from 'lucide-react';

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

const EventsGrid = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-4">
           <div>
             <h2 className="text-5xl font-amita font-bold text-white mb-2">Competitions</h2>
             <p className="text-amber-200/60 font-merriweather">Where talent meets tradition.</p>
           </div>
           <button className="text-amber-400 hover:text-amber-200 font-bold tracking-widest uppercase text-sm mt-6 md:mt-0 transition-colors">
             View Schedule →
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((evt, i) => (
            <div key={i} onClick={() => setSelectedEvent(evt)} className="cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur & Fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedEvent(null)}
            />
            
            {/* Modal Content with Scale & Fade */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[90vh] z-10"
            >
              <LiquidGlass className="w-full h-full overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-amber-900/40 border-amber-500/30">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white/70 hover:bg-amber-500 hover:text-black transition-colors backdrop-blur-sm"
                >
                  <X size={20} />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 md:hidden z-20">
                    <h3 className="text-3xl font-amita font-bold text-white">{selectedEvent.title}</h3>
                    <p className="text-amber-400 font-merriweather text-sm">{selectedEvent.subtitle}</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-black/40">
                  <div className="hidden md:block mb-6">
                    <h3 className="text-4xl font-amita font-bold text-white mb-1">{selectedEvent.title}</h3>
                    <p className="text-amber-400 font-merriweather">{selectedEvent.subtitle}</p>
                  </div>

                  {/* Meta Data Grid */}
                  <div className="flex flex-wrap gap-3 mb-6 text-sm text-slate-300">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <Calendar size={14} className="text-amber-500" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <Clock size={14} className="text-amber-500" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <Trophy size={14} className="text-amber-500" />
                      <span className="text-amber-200 font-bold">{selectedEvent.prize}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Description</h4>
                      <p className="text-slate-300 leading-relaxed font-merriweather text-sm">
                        {selectedEvent.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                        <AlertCircle size={14} /> Rules & Guidelines
                      </h4>
                      <ul className="space-y-2">
                        {selectedEvent.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest rounded transition-colors shadow-lg shadow-amber-900/20">
                      Register Now
                    </button>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventsGrid;