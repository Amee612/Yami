import { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Birthday from './components/Birthday';
import Wishes from './components/Wishes';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cinematic loading screen simulation
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #ffd1dc, #e6e6fa)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2d1b36'
      }}>
        <div className="animate-float" style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '4rem' }}>✨</span>
        </div>
        <h2 className="cursive" style={{ fontSize: '3rem', letterSpacing: '2px' }}>
          Preparing the Magic...
        </h2>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              style={{
                width: '15px',
                height: '15px',
                background: '#d4af37',
                borderRadius: '50%',
                animation: `float 1s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Background3D />
      
      {/* Main Content Overlay */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Gallery />
        <Timeline />
        <Birthday />
        <Wishes />
        <Footer />
      </main>
    </>
  );
}

export default App;
