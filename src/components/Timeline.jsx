import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Heart, Music, Cake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { id: 1, title: "First Smile", date: "2 Months", icon: <Heart size={32} color="#ffd1dc" />, text: "The day the whole world lit up with just one little smile." },
  { id: 2, title: "First Word", date: "7 Months", icon: <Music size={32} color="#b0e0e6" />, text: "A sweet babble that sounded just like magic to our ears." },
  { id: 3, title: "First Step", date: "11 Months", icon: <Star size={32} color="#f2d184" />, text: "Wobbly but determined, taking steps into a big new world." },
  { id: 4, title: "First Birthday", date: "12 Months", icon: <Cake size={32} color="#e6e6fa" />, text: "A whole year of love, laughter, and endless joy." }
];

export default function Timeline() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          rotation: i % 2 === 0 ? -5 : 5,
          duration: 1.2,
          ease: "back.out(1.7)"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '4rem 2rem', background: 'transparent' }}>
      <h2 className="heading-gold" style={{ fontSize: '3.5rem', marginBottom: '4rem', textAlign: 'center' }}>
        Memory Universe
      </h2>

      <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '4px',
          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5), transparent)',
          transform: 'translateX(-50%)',
          borderRadius: '2px'
        }}></div>

        {milestones.map((m, i) => (
          <div 
            key={m.id} 
            className="timeline-item"
            style={{
              display: 'flex',
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'center',
              marginBottom: '4rem',
              width: '100%'
            }}
          >
            {/* Content Box */}
            <div style={{ flex: 1, display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', padding: '0 2rem' }}>
              <div 
                className="glass-panel animate-float"
                style={{
                  padding: '2rem',
                  maxWidth: '350px',
                  animationDelay: `${i * 0.5}s`,
                  textAlign: i % 2 === 0 ? 'right' : 'left'
                }}
              >
                <h3 className="cursive" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{m.title}</h3>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>{m.date}</div>
                <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{m.text}</p>
              </div>
            </div>

            {/* Icon Center */}
            <div 
              className="glass-panel glow-effect"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {m.icon}
            </div>

            {/* Empty space for balance */}
            <div style={{ flex: 1 }}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
