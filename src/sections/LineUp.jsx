import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // IMPORT PORTAL
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from '../components/ui/LiquidGlass';
import { Music2, Mic, X, Clock, MapPin, Instagram, Youtube, Sparkles } from 'lucide-react';

const artists = [
  { 
    name: "Project Mishram", 
    role: "Carnatic Fusion", 
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000&h=1000",
    time: "7:00 PM - 8:30 PM",
    stage: "Main Audi",
    bio: "A progressive Carnatic fusion band that blends traditional Indian classical music with modern metal, jazz, and electronic elements. Known for their high-energy performances and complex rhythmic structures.",
    tracks: ["Kanakana", "Nalinakanthi", "Mishra Pilu"]
  },
  { 
    name: "The Raghu Dixit Project", 
    role: "Folk Rock", 
    img: "./raghu.jpg",
    time: "8:45 PM - 10:30 PM",
    stage: "Open Air Theatre",
    bio: "India's highest-selling non-film music export. Raghu Dixit's music is a seamless amalgamation of Indian ethnic music and styles from different parts of the world. Infectious, happy, and soul-stirring.",
    tracks: ["Jag Changa", "Hey Bhagwan", "Lokada Kalaji"]
  },
  { 
    name: "Atif Aslam", 
    role: "Playback singer & Songwriter", 
    img: "./atif-aslam.jpg",
    time: "5:30 PM - 6:45 PM",
    stage: "Heritage Courtyard",
    bio: "Born in Wazirabad, Punjab, Atif Aslam started his music career in early 2000s. He released his debut album, Jal Pari, in 2004. He went on to sing songs in both Indian (Bollywood) and Pakistani (Lollywood) film industries.",
    tracks: ["Raag Yaman", "Thumri in Mishra Khamaj", "Tarana"]
  },
];

const LineUp = ({ onModalChange }) => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  // --- STRICT SCROLL LOCK (LENIS COMPATIBLE) & NAV HIDE ---
  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedArtist);
    }

    if (selectedArtist) {
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
  }, [selectedArtist, onModalChange]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-[#0a0400] to-black pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-6xl font-amita font-bold text-white mb-4">Star Performers</h2>
          <p className="text-amber-200/60 font-merriweather italic">Witness the legends of rhythm!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {artists.map((artist, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedArtist(artist)}
            >
              <LiquidGlass className="p-0 group cursor-pointer h-full border-amber-500/20 hover:border-amber-400/50 hover:-translate-y-2 transition-transform duration-500 bg-black/20">
                <div className="h-96 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2e0202] via-black/20 to-transparent z-10" />
                  
                  <img 
                    src={artist.img} 
                    alt={artist.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:sepia-[.2]"
                  />
                  
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 border border-amber-400/30 w-fit px-2 py-1 rounded-sm bg-black/60 backdrop-blur-md">
                      <Music2 size={12} /> {artist.role}
                    </span>
                    <h3 className="text-3xl font-amita font-bold text-white drop-shadow-lg">{artist.name}</h3>
                    <p className="text-white/60 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Click for bio <Sparkles size={10} />
                    </p>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- PORTAL WRAPPER FOR MODAL --- */}
      {createPortal(
        <AnimatePresence>
          {selectedArtist && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md" 
                onClick={() => setSelectedArtist(null)}
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl max-h-[85vh] z-10"
              >
                {/* UPDATED: Added md:min-h-[500px] to regularize modal size 
                  so image or text doesn't collapse or stretch oddly 
                */}
                <LiquidGlass className="w-full h-full md:min-h-[500px] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-amber-900/50 border-amber-500/30">
                  <button 
                    onClick={() => setSelectedArtist(null)}
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 text-white/70 hover:bg-amber-500 hover:text-black transition-colors backdrop-blur-sm"
                  >
                    <X size={20} />
                  </button>

                  <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                    {/* UPDATED: Image is now absolute inset-0.
                      This stops the image from 'pushing' the height. It will simply fill the container.
                    */}
                    <img 
                      src={selectedArtist.img} 
                      alt={selectedArtist.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 md:hidden z-20">
                      <h3 className="text-3xl font-amita font-bold text-white">{selectedArtist.name}</h3>
                      <p className="text-amber-400 font-merriweather text-sm">{selectedArtist.role}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto bg-black/40 flex flex-col justify-center">
                    <div className="hidden md:block mb-4">
                      <div className="flex items-center gap-2 text-amber-500 mb-2">
                         <Mic size={18} />
                         <span className="uppercase tracking-widest text-xs font-bold">{selectedArtist.role}</span>
                      </div>
                      <h3 className="text-4xl font-amita font-bold text-white mb-2">{selectedArtist.name}</h3>
                    </div>

                    <div className="flex flex-col gap-2 mb-6 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-amber-500" />
                        <span className="font-merriweather">{selectedArtist.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-amber-500" />
                        <span className="font-merriweather">{selectedArtist.stage}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">About the Artist</h4>
                      <p className="text-slate-300 leading-relaxed font-merriweather text-sm">
                        {selectedArtist.bio}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Popular Tracks</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.tracks.map((track, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-900/30 border border-amber-500/20 rounded-full text-amber-100/70 text-xs">
                            {track}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/10">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm font-bold uppercase tracking-wider">
                        <Instagram size={18} /> Instagram
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider">
                        <Youtube size={18} /> YouTube
                      </button>
                    </div>
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

export default LineUp;