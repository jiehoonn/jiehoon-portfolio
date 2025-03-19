import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Disable scrolling when intro is shown or during animation
    if (showIntro || isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [showIntro, isAnimating]);

  const handleIntroComplete = () => {
    setIsAnimating(true);
    
    // Reveal main content after intro animation
    setTimeout(() => {
      setShowIntro(false);
      
      // Animation complete
      setTimeout(() => {
        setIsAnimating(false);
        // Force scroll to top
        window.scrollTo(0, 0);
      }, 1500);
    }, 500);
  };

  // Staggered appearance for main content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>
      
      {/* Background always renders */}
      <Background />
      
      <AnimatePresence>
        {!showIntro && (
          <motion.div 
            className="bg-transparent min-h-screen relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Navigation />
            </motion.div>
            
            <motion.main>
              <motion.div variants={itemVariants}>
                <Hero />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Projects />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Resume />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Contact />
              </motion.div>
            </motion.main>
            
            <motion.div variants={itemVariants}>
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;