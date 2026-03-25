import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 blur-[120px] rounded-full" />
      
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter neon-text-blue mb-2">
          NEON BEATS
        </h1>
        <p className="text-gray-500 font-mono tracking-widest text-xs uppercase">
          Retro Arcade // Synthwave Experience
        </p>
      </motion.header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Info/Decoration */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-6"
        >
          <div className="p-4 neon-border-blue bg-gray-900/50 rounded-lg">
            <h4 className="neon-text-blue text-xs font-mono mb-2">SYSTEM STATUS</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span>CPU_LOAD</span>
                <span className="text-neon-green">24%</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>MEM_SYNC</span>
                <span className="text-neon-green">ACTIVE</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>AUDIO_BIT</span>
                <span className="text-neon-blue">320KBPS</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-800 rounded-lg">
            <h4 className="text-gray-500 text-[10px] font-mono mb-2 uppercase">Instructions</h4>
            <ul className="text-[10px] font-mono text-gray-400 space-y-2">
              <li>• ARROWS TO NAVIGATE</li>
              <li>• SPACE TO PAUSE</li>
              <li>• EAT PINK ORBS TO GROW</li>
              <li>• DON'T HIT THE WALLS</li>
            </ul>
          </div>
        </motion.div>

        {/* Center: Snake Game */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Side: Music Player */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 flex justify-center"
        >
          <MusicPlayer />
        </motion.div>
      </main>

      <footer className="mt-12 text-gray-600 font-mono text-[10px] tracking-widest uppercase">
        &copy; 2026 NEON_ARCADE_OS // VERSION 1.0.4
      </footer>
    </div>
  );
}
