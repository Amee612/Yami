import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Gift } from 'lucide-react';

export default function Birthday() {
  const [candleBlown, setCandleBlown] = useState(false);
  const containerRef = useRef();
  const flameRef = useRef();
  const confettiRef = useRef();

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);

    gsap.to(flameRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });

    createConfetti();
  };

  const createConfetti = () => {
    const colors = ['#ffd1dc', '#b0e0e6', '#f2d184', '#e6e6fa'];
    for (let i = 0; i < 100; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'absolute';
      conf.style.width = '10px';
      conf.style.height = '10px';
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = '50%';
      conf.style.top = '50%';
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      conf.style.zIndex = 100;
      confettiRef.current.appendChild(conf);

      gsap.to(conf, {
        x: (Math.random() - 0.5) * window.innerWidth,
        y: (Math.random() - 0.5) * window.innerHeight + 200,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 2 + Math.random() * 2,
        ease: "power1.out",
        onComplete: () => conf.remove()
      });
    }
  };

  return (
    <section ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div ref={confettiRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
      
      <h2 className="heading-gold" style={{ fontSize: '3.5rem', marginBottom: '2rem', textAlign: 'center', zIndex: 10 }}>
        The Big Celebration
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        {/* Cake Container */}
        <div style={{ position: 'relative', marginTop: '4rem', cursor: 'pointer' }} onClick={handleBlowCandle}>
          {/* Flame */}
          {!candleBlown && (
            <div 
              ref={flameRef}
              style={{
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '15px',
                height: '25px',
                background: 'linear-gradient(to bottom, #ffeb3b, #ff9800)',
                borderRadius: '50% 50% 20% 20%',
                boxShadow: '0 0 20px #ff9800',
                animation: 'flicker 0.1s infinite alternate'
              }}
            />
          )}
          
          {/* Candle */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '10px',
            height: '40px',
            background: 'repeating-linear-gradient(45deg, #fff, #fff 5px, #ff5252 5px, #ff5252 10px)',
            borderRadius: '5px'
          }} />

          {/* Cake Tiers */}
          <div className="glass-panel" style={{ width: '150px', height: '60px', background: '#ffd1dc', borderRadius: '10px 10px 0 0', position: 'relative', zIndex: 3 }} />
          <div className="glass-panel" style={{ width: '200px', height: '70px', background: '#fffdd0', borderRadius: '10px 10px 0 0', marginTop: '-10px', position: 'relative', zIndex: 2 }} />
          <div className="glass-panel" style={{ width: '250px', height: '80px', background: '#b0e0e6', borderRadius: '10px', marginTop: '-10px', position: 'relative', zIndex: 1 }} />
        </div>

        <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.8, textAlign: 'center' }}>
          {candleBlown ? "Yay! Make a wish! 🎊" : "Click the cake to blow out the candle! 🎂"}
        </p>

        {/* Gift Boxes */}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="glass-panel animate-float"
              style={{
                padding: '1.5rem',
                animationDelay: `${i * 0.3}s`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: i === 2 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)'
              }}
              onClick={(e) => {
                gsap.to(e.currentTarget, {
                  y: -50,
                  rotation: i % 2 === 0 ? 10 : -10,
                  opacity: 0,
                  duration: 0.5
                });
              }}
            >
              <Gift size={48} color={i === 2 ? "#d4af37" : "#b0e0e6"} />
              <span style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Open Me</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          100% { transform: translateX(-50%) scale(1.1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
