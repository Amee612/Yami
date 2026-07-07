import { useState } from 'react';
import { Moon, Star, Heart, Volume2, VolumeX } from 'lucide-react';

export default function Footer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Audio logic would go here. We can use HTMLAudioElement
  };

  return (
    <footer style={{ 
      width: '100%', 
      padding: '4rem 2rem 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      background: 'linear-gradient(to top, rgba(45, 27, 54, 0.8), transparent)',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <Moon size={32} className="animate-float" color="#fffdd0" />
        <Star size={32} className="animate-float" color="#f2d184" style={{ animationDelay: '1s' }} />
        <Star size={24} className="animate-float" color="#ffd1dc" style={{ animationDelay: '2s' }} />
      </div>

      <button 
        onClick={toggleMusic}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.8rem 1.5rem',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        <span>{isPlaying ? "Pause Lullaby" : "Play Lullaby"}</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
        <span>Made with</span>
        <Heart size={16} color="#ff5252" style={{ fill: '#ff5252' }} />
        <span>for our little star</span>
      </div>
    </footer>
  );
}
