import React from 'react';
import { motion } from 'framer-motion';

const LiquidGlass = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.2)" }}
      className={`
        relative overflow-hidden
        bg-black/20 backdrop-blur-md 
        border border-white/5 
        shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        rounded-xl
        ${className}
      `}
      {...props}
    >
      {/* Warm Sheen Overlay instead of white/blue */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default LiquidGlass;