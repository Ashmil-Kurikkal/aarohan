import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, X, Check, ArrowRight, Loader2 } from 'lucide-react';
import LiquidGlass from '../components/ui/LiquidGlass';

const GetPasses = ({ isOpen, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Scroll Lock Hook ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 2000);
  };

  return (
    <>
      {/* --- Trigger Section (In-page) --- */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#1a0505] to-[#250808] border-y border-amber-500/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-amita font-bold text-white mb-2">
              Secure Your Entry
            </h2>
            <p className="text-amber-200/70 font-merriweather max-w-md">
              Limited early bird passes available for the cultural extravaganza. Don't miss the beat.
            </p>
          </div>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="group relative px-8 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold font-merriweather tracking-wider rounded-sm shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
               GRAB PASSES <Ticket size={20} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </section>


      {/* --- Animated Modal --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg"
            >
              <LiquidGlass className="p-8 md:p-10 border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-amber-200/50 hover:text-amber-400 transition-colors"
                >
                    <X size={24} />
                </button>

                {!isSuccess ? (
                    <>
                        <div className="text-center mb-8">
                            <Ticket className="mx-auto text-amber-500 mb-4" size={40} />
                            <h3 className="text-3xl font-amita text-white">General Access</h3>
                            <p className="text-slate-400 text-sm font-merriweather mt-2">Fill your details to reserve your spot.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">Full Name</label>
                                <input type="text" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-merriweather placeholder:text-white/10" placeholder="John Doe" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">College Email</label>
                                <input type="email" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-merriweather placeholder:text-white/10" placeholder="john@fisat.ac.in" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">Phone</label>
                                    <input type="tel" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-merriweather" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">Pass Type</label>
                                    <select className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:outline-none focus:border-amber-500 transition-colors font-merriweather [&>option]:bg-[#1a0505]">
                                        <option>Day 1 Only</option>
                                        <option>Day 2 Only</option>
                                        <option>All Access (3 Days)</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                disabled={isSubmitting}
                                className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-800 py-3 text-white font-bold tracking-wider rounded-sm hover:brightness-110 transition-all flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <>PROCEED TO PAY <ArrowRight size={16} /></>}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                            <Check size={40} className="text-green-400" />
                        </div>
                        <h3 className="text-2xl font-amita text-white mb-2">You're on the list!</h3>
                        <p className="text-slate-400 font-merriweather mb-6">Check your email for the QR code ticket.</p>
                        <button onClick={() => setIsOpen(false)} className="text-amber-400 underline underline-offset-4 hover:text-amber-200">Close Window</button>
                    </div>
                )}
              </LiquidGlass>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GetPasses;