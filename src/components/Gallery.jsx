import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/baby_playing.png",
  "/baby_sleeping.png",
  "/baby_cake.png",
  "/baby_portrait.png",
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section ref={sectionRef} style={{ padding: '6rem 2rem', perspective: '1000px' }}>
      <h2 className="heading-gold" style={{ fontSize: '3.5rem', marginBottom: '3rem', textAlign: 'center' }}>
        Magical Memories
      </h2>

      <div 
        ref={carouselRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transformStyle: 'preserve-3d'
        }}
      >
        {images.map((src, index) => {
          // Calculate offset relative to active index
          let offset = index - activeIndex;
          // Handle wrap-around
          if (offset < -1) offset += images.length;
          if (offset > 1) offset -= images.length;
          
          // Only show 3 items
          if (Math.abs(offset) > 1) return null;

          const isActive = offset === 0;
          const translateX = offset * 250;
          const translateZ = isActive ? 0 : -200;
          const rotateY = offset * -25;
          const opacity = isActive ? 1 : 0.6;
          const zIndex = isActive ? 10 : 5;

          return (
            <div
              key={index}
              className="glass-panel"
              style={{
                position: 'absolute',
                width: '300px',
                height: '400px',
                padding: '1rem',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
                cursor: isActive ? 'default' : 'pointer'
              }}
              onClick={() => {
                if (offset === 1) nextSlide();
                if (offset === -1) prevSlide();
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={src} 
                  alt="Memory" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  color: '#fff'
                }}>
                  <h3 className="cursive" style={{ fontSize: '1.5rem', margin: 0 }}>Sweet Moment</h3>
                </div>
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <button 
          onClick={prevSlide}
          className="glass-panel"
          style={{
            position: 'absolute',
            left: '-2rem',
            zIndex: 20,
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--dark-purple)'
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="glass-panel"
          style={{
            position: 'absolute',
            right: '-2rem',
            zIndex: 20,
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--dark-purple)'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
