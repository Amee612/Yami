import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryPhotos } from '../data/yamiPhotos';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const ORBIT_COUNT = 8;
const ORBIT_RADIUS = 280;

function getOrbitPosition(slot, total = ORBIT_COUNT) {
  const angle = (slot / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * ORBIT_RADIUS,
    z: Math.sin(angle) * ORBIT_RADIUS,
    rotateY: (angle * 180) / Math.PI + 90,
  };
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const spotlightRef = useRef(null);
  const tunnelRef = useRef(null);

  const total = galleryPhotos.length;
  const active = galleryPhotos[activeIndex];

  const goTo = useCallback((index) => {
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, next]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(stageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.gallery-tunnel-card', {
        scrollTrigger: { trigger: tunnelRef.current, start: 'top 85%' },
        y: 60,
        opacity: 0,
        rotateX: 30,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tunnel = tunnelRef.current;
    if (!tunnel) return;

    const cards = tunnel.querySelectorAll('.gallery-tunnel-card');
    const updateTunnel3D = () => {
      const rect = tunnel.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = (cardCenter - center) / (rect.width / 2);
        const clamped = Math.max(-1, Math.min(1, dist));
        const rotateY = clamped * -35;
        const translateZ = (1 - Math.abs(clamped)) * 50;
        const scale = 1 - Math.abs(clamped) * 0.12;
        const opacity = 1 - Math.abs(clamped) * 0.35;

        card.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
        card.style.opacity = opacity;
      });
    };

    updateTunnel3D();
    tunnel.addEventListener('scroll', updateTunnel3D, { passive: true });
    window.addEventListener('resize', updateTunnel3D);
    return () => {
      tunnel.removeEventListener('scroll', updateTunnel3D);
      window.removeEventListener('resize', updateTunnel3D);
    };
  }, []);

  useEffect(() => {
    const tunnel = tunnelRef.current;
    if (!tunnel) return;
    const card = tunnel.children[activeIndex];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIndex]);

  const handleMouseMove = (e) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const orbitPhotos = Array.from({ length: ORBIT_COUNT }, (_, slot) => {
    const photoIndex = (activeIndex + slot + 1) % total;
    return { slot, photoIndex, photo: galleryPhotos[photoIndex] };
  });

  return (
    <section ref={sectionRef} className="gallery-section">
      <div className="gallery-header">
        <h2 className="heading-gold" style={{ fontSize: '3.5rem' }}>
          Yami&apos;s Magical Memories
        </h2>
        <p>A year of precious moments floating in a dreamy 3D universe</p>
      </div>

      <div
        ref={stageRef}
        className="gallery-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="gallery-sparkle">✨</span>
        <span className="gallery-sparkle">⭐</span>
        <span className="gallery-sparkle">💫</span>
        <span className="gallery-sparkle">🌟</span>

        <div className="gallery-orbit-ring">
          {orbitPhotos.map(({ slot, photoIndex, photo }) => {
            const pos = getOrbitPosition(slot);
            const isNear = slot <= 2 || slot >= ORBIT_COUNT - 2;

            return (
              <button
                key={`orbit-${photoIndex}-${slot}`}
                className={`gallery-orbit-card ${isNear ? 'is-near' : 'is-far'}`}
                style={{
                  transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg)`,
                }}
                onClick={() => goTo(photoIndex)}
                aria-label={`View ${photo.caption}`}
              >
                <div className="gallery-orbit-card-inner">
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                </div>
              </button>
            );
          })}
        </div>

        <div
          ref={spotlightRef}
          className="gallery-spotlight"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <div className="gallery-spotlight-glow" />
          <div className="gallery-spotlight-frame">
            <span className="gallery-spotlight-badge">
              {activeIndex + 1} / {total}
            </span>
            <img src={active.src} alt={active.caption} />
            <div className="gallery-spotlight-info">
              <h3 className="cursive">{active.caption}</h3>
              <p>{active.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-nav">
        <button className="gallery-nav-btn" onClick={prev} aria-label="Previous photo">
          <ChevronLeft size={24} />
        </button>

        <span className="gallery-counter">
          {activeIndex + 1} of {total}
        </span>

        <button
          className={`gallery-auto-btn ${autoPlay ? 'is-active' : ''}`}
          onClick={() => setAutoPlay((v) => !v)}
        >
          <Sparkles size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          {autoPlay ? 'Auto' : 'Manual'}
        </button>

        <button className="gallery-nav-btn" onClick={next} aria-label="Next photo">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="gallery-tunnel-wrap">
        <p className="gallery-tunnel-label">Scroll the memory tunnel — tap any moment to spotlight it</p>
        <div ref={tunnelRef} className="gallery-tunnel">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.src}
              className={`gallery-tunnel-card ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Spotlight ${photo.caption}`}
            >
              <div className="gallery-tunnel-card-inner">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <div className="gallery-tunnel-card-overlay">{photo.caption}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
