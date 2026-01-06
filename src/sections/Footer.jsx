import React from 'react';
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone, Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0303] pt-24 pb-10 border-t border-white/10 relative overflow-hidden font-merriweather">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div>
              <h2 className="font-amita text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 mb-2">
                आROHAN
              </h2>
              <p className="text-amber-500/60 text-xs tracking-[0.2em] uppercase font-sans font-bold">The Rising Rhythm</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              FISAT's grandest cultural extravaganza since a decade.
            </p>
            <div className="flex items-start gap-3 text-slate-400 text-sm mt-4">
              <MapPin size={18} className="text-amber-600 shrink-0 mt-1" />
              <span>Federal Institute of Science and Technology (FISAT), Hormis Nagar, Mookkannoor, Kerala 683577</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-amber-100 font-bold uppercase tracking-widest text-sm mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-amber-800 group-hover:bg-amber-400 transition-colors"/> Home</a></li>
              <li><a href="#lineup" className="hover:text-amber-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-amber-800 group-hover:bg-amber-400 transition-colors"/> Star Lineup</a></li>
              <li><a href="#competitions" className="hover:text-amber-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-amber-800 group-hover:bg-amber-400 transition-colors"/> Competitions</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-amber-800 group-hover:bg-amber-400 transition-colors"/> Gallery</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-amber-100 font-bold uppercase tracking-widest text-sm mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Rule Book</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sponsorship Brochure</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div>
            <h3 className="text-amber-100 font-bold uppercase tracking-widest text-sm mb-6">Stay Connected</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-black hover:border-amber-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>

            {/* Mini Newsletter */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-300 p-1">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Aarohan Cultural Fest. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed and Developed by</span>
            <a href="https://github.com/Ashmil-Kurikkal" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-300 transition-colors">Ashmil Kurikkal</a><Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
