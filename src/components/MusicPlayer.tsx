import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Cybernetic Dreams",
    artist: "AI Synthwave",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/cyber/200/200"
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "Digital Ghost",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/neon/200/200"
  },
  {
    id: 3,
    title: "Data Stream",
    artist: "Neural Network",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/data/200/200"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="w-full max-w-[400px] p-6 bg-gray-900/80 backdrop-blur-md neon-border-pink rounded-xl">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={currentTrack.cover} 
          alt={currentTrack.title} 
          className="w-20 h-20 rounded-lg neon-border-pink object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 overflow-hidden">
          <h3 className="neon-text-pink font-bold text-lg truncate">{currentTrack.title}</h3>
          <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-neon-pink shadow-neon-pink transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button 
          onClick={prevTrack}
          className="p-2 neon-text-pink hover:scale-110 transition-all duration-300"
        >
          <SkipBack size={24} />
        </button>

        <button 
          onClick={togglePlay}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-neon-pink text-black shadow-neon-pink hover:scale-110 transition-all duration-300"
        >
          {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
        </button>

        <button 
          onClick={nextTrack}
          className="p-2 neon-text-pink hover:scale-110 transition-all duration-300"
        >
          <SkipForward size={24} />
        </button>

        <div className="flex items-center gap-2 neon-text-pink cursor-pointer hover:scale-110 transition-all duration-300">
          <Volume2 size={20} />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {TRACKS.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === currentTrackIndex ? 'w-4 bg-neon-pink' : 'w-1 bg-gray-700'}`}
          />
        ))}
      </div>
    </div>
  );
};
