import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BIRTHDAY_AGE, BIRTHDAY_DATE, YAMI_NAME, heroPortrait } from '../data/yamiPhotos';

export default function Hero() {
  const containerRef = useRef();
  const textRef = useRef();
  const subtitleRef = useRef();
  const portraitRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.6
      });

      gsap.from(portraitRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: 5,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8
      });
      
      // Floating animation for portrait
      gsap.to(portraitRef.current, {
        y: -15,
        rotation: -2,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.8
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div
        className="glass-panel glow-effect"
        style={{
          padding: '0.6rem 1.8rem',
          marginBottom: '1.5rem',
          background: 'rgba(255, 255, 255, 0.55)',
          fontSize: '1.1rem',
          fontWeight: 600,
          letterSpacing: '1px',
        }}
      >
        🎂 Today She Turns {BIRTHDAY_AGE}! · {BIRTHDAY_DATE}
      </div>

      <div 
        ref={portraitRef}
        className="glass-panel"
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          padding: '10px',
          marginBottom: '2rem',
          boxShadow: '0 0 40px rgba(255, 209, 220, 0.6)',
          position: 'relative'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'var(--cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={heroPortrait} 
            alt={`${YAMI_NAME} on her 1st birthday`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      <h1 ref={textRef} className="heading-gold" style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        Happy 1st Birthday, {YAMI_NAME}! ✨
      </h1>
      
      <p ref={subtitleRef} style={{ fontSize: '1.5rem', color: 'var(--dark-purple)', opacity: 0.8, maxWidth: '600px', lineHeight: 1.6 }}>
        One magical year of love, giggles, and stardust — welcome to {YAMI_NAME}&apos;s dreamy little world.
      </p>
    </section>
  );
}
