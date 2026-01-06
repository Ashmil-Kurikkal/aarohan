import React from 'react';
import { motion } from 'framer-motion';
import { Play, Instagram, Image as ImageIcon } from 'lucide-react';
import LiquidGlass from '../components/ui/LiquidGlass';

const images = [
  // Placeholders - using abstract/cultural imagery
  { span: "col-span-1 md:col-span-2 row-span-2", url: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" },
  { span: "col-span-1", url: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=400" },
  { span: "col-span-1", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400" },
  { span: "col-span-1 md:col-span-2", url: "https://images.unsplash.com/photo-1514525253440-b393452e233e?auto=format&fit=crop&q=80&w=800" },
  { span: "col-span-1", url: "https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&q=80&w=400" },
];

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

      {/* 1. Huge Wide Video Component */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.15)] group mb-12"
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-20 h-20 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Play fill="currentColor" className="text-amber-100 ml-1" size={32} />
           </div>
        </div>

        {/* Video Placeholder */}
        <video 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-105"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1600"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-lights-2089-large.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-6 left-8 z-20">
            <h3 className="text-3xl font-amita text-white">Aftermovie '25</h3>
            <p className="text-amber-200/80 font-merriweather text-sm">Directed by Media Cell</p>
        </div>
      </motion.div>

      {/* 2. Photo Wall Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative group rounded-2xl overflow-hidden border border-white/5 ${img.span}`}
          >
            <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
            <img 
              src={img.url} 
              alt="Gallery" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
            />
            
            {/* Hover Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-400">
                    <ImageIcon size={16} />
                    <span className="font-merriweather text-xs uppercase tracking-widest">View Full</span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors font-merriweather text-sm">
            <Instagram size={18} /> View more on Instagram
        </button>
      </div>
    </section>
  );
};

export default Gallery;