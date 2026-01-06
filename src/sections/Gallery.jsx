import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram, Image as ImageIcon, Pause, Volume2, VolumeX } from 'lucide-react';

// --- Data Configuration ---

// 1. Video Playlist (Sequential Loop)
const videoPlaylist = [
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-lights-2089-large.mp4",
    title: "The Awakening",
    subtitle: "Day 1 • Inauguration & Pro Show"
  },
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-party-4369-large.mp4",
    title: "Rhythm of Night",
    subtitle: "Day 2 • DJ & Dance Battle"
  },
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-at-a-conference-2997-large.mp4",
    title: "The Grand Finale",
    subtitle: "Day 3 • Awards & Closing Ceremony"
  }
];

// 2. Updated Image Grid URLs
const galleryImages = [
  { 
    span: "col-span-1 md:col-span-2 row-span-2", 
    url: "./a.webp", // Large Concert Crowd
    caption: "Main Stage Energy"
  },
  { 
    span: "col-span-1", 
    url: "./b.jpg", // Guitarist/Singer
    caption: "Live Acoustics"
  },
  { 
    span: "col-span-1", 
    url: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=400", // Spotlights
    caption: "Spotlight Moments"
  },
  { 
    span: "col-span-1 md:col-span-2", 
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", // Confetti/Celebration
    caption: "Victory Lap"
  },
  { 
    span: "col-span-1", 
    url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400", // Festival Art/Colors
    caption: "Art Installations"
  },
];


// --- Sub-Component: Themed Video Loop ---
const VideoShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videoPlaylist.length);
  };

  const currentVideo = videoPlaylist[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.15)] group mb-12 bg-black"
    >
      {/* 1. Video Player with Crossfade */}
      <AnimatePresence mode='wait'>
        <motion.video
          key={currentIndex} // Forces remount for fresh start
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Slow cinematic crossfade
          
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
          autoPlay 
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnd}
        >
          <source src={currentVideo.src} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* 2. Overlays & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
      
      {/* 3. Controls (Mute Toggle) */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-amber-400 hover:bg-black/50 transition-all"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* 4. Text Content (Dynamic) */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-end">
        <motion.div
           key={`text-${currentIndex}`}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.5 }}
        >
            <h3 className="text-3xl md:text-5xl font-amita text-white mb-2 drop-shadow-lg">
              {currentVideo.title}
            </h3>
            <p className="text-amber-400 font-merriweather text-sm md:text-base tracking-wider uppercase font-bold">
              {currentVideo.subtitle}
            </p>
        </motion.div>

        {/* 5. Progress Indicators */}
        <div className="flex gap-2 mb-2">
            {videoPlaylist.map((_, idx) => (
                <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 shadow-lg ${
                        idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-white/20'
                    }`}
                />
            ))}
        </div>
      </div>
    </motion.div>
  );
};


// --- Main Component ---
const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-amita font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 mb-4">
          Visual Chronicle
        </h2>
        <p className="text-amber-200/60 font-merriweather tracking-widest uppercase text-sm">
          Relive the moments
        </p>
      </div>

      {/* 1. Sequential Loop Video Component */}
      <VideoShowcase />

      {/* 2. Photo Wall Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative group rounded-2xl overflow-hidden border border-white/5 ${img.span}`}
          >
            {/* Color Overlay */}
            <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
            
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
            />
            
            {/* Hover Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                    <span className="text-white font-amita text-lg">{img.caption}</span>
                    <div className="flex items-center gap-2 text-amber-400">
                        <ImageIcon size={16} />
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors font-merriweather text-sm group">
            <Instagram size={18} className="group-hover:scale-110 transition-transform" /> 
            View more on Instagram
        </button>
      </div>
    </section>
  );
};

export default Gallery;