import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { ArrowRight, Sparkles } from 'lucide-react';
import FestivalTotem from '../components/canvas/FestivalTotem';
import LiquidGlass from '../components/ui/LiquidGlass';

// Receive prop here
const Hero = ({ setIsBookingOpen }) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a0505]">
      
      {/* --- 1. Background 3D Layer --- */}
      <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.1} />
              <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#f59e0b" />
              <Environment preset="night" />
              <FestivalTotem />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </Suspense>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.4)_0%,_transparent_70%)] pointer-events-none" />

      {/* --- 2. Foreground Content Layer --- */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl px-6 space-y-8 text-center mt-12">
        
        <div className="inline-block px-8 py-2 border-y border-amber-500/30 bg-black/60 backdrop-blur-sm shadow-lg">
          <span className="font-merriweather text-lg md:text-xl text-amber-200 tracking-[0.2em] uppercase drop-shadow-md">
            March 24 - 26 • 2026
          </span>
        </div>
        
        <h1 className="font-amita font-bold text-7xl md:text-8xl lg:text-9xl leading-tight text-gradient-gold drop-shadow-[0_5px_5px_rgba(0,0,0,1)] filter brightness-110">
          आROHAN
        </h1>
        <p className="font-merriweather font-light text-xl md:text-2xl text-amber-100/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
          The Rising Rhythm. 
          <span className="block mt-4 text-sm md:text-base font-sans text-amber-500 font-semibold tracking-widest uppercase shadow-black drop-shadow-sm">
            Cultural Extravaganza at FISAT
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 w-full">
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-8 py-4 rounded-sm bg-gradient-to-r from-amber-600 to-amber-800 text-white font-merriweather font-bold tracking-wider flex items-center justify-center gap-2 hover:scale-105 shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all duration-300 border border-amber-500/50 z-20"
          >
            <Sparkles size={18} />
            GET PASSES
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;