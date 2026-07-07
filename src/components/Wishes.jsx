import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wishes = [
  { text: "May your life be as magical as your smile.", author: "Grandma" },
  { text: "Dream big, little one. The stars are yours.", author: "Uncle" },
  { text: "You are our greatest adventure.", author: "Mom & Dad" },
  { text: "Wishing you endless joy and wonder.", author: "Auntie" }
];

export default function Wishes() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bubbles = gsap.utils.toArray('.wish-bubble');
      
      bubbles.forEach((bubble, i) => {
        gsap.from(bubble, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%"
          },
          scale: 0,
          opacity: 0,
          duration: 1 + Math.random(),
          ease: "elastic.out(1, 0.5)",
          delay: i * 0.2
        });

        // Floating animation
        gsap.to(bubble, {
          y: -20 + Math.random() * -30,
          x: -10 + Math.random() * 20,
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random()
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ minHeight: '80vh', padding: '4rem 2rem' }}>
      <h2 className="heading-gold" style={{ fontSize: '3.5rem', marginBottom: '4rem', textAlign: 'center' }}>
        Wishes From the Heart
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {wishes.map((wish, index) => (
          <div 
            key={index}
            className="wish-bubble glass-panel glow-effect"
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))`,
              boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.05), 0 10px 30px rgba(255,209,220,0.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.5 }}>
              "{wish.text}"
            </p>
            <span className="cursive" style={{ color: '#d4af37', fontSize: '1.3rem' }}>
              - {wish.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
