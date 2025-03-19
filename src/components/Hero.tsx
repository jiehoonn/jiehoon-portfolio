import { motion } from 'framer-motion';
import spinningStarGif from '../assets/images/spinning-star.gif';

function Hero() {
  return (
    <div id="home" className="h-screen flex items-center relative overflow-hidden">
      {/* GIF Background Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Use animation to make the star slightly pulsate for more visual impact */}
        <motion.div
          className="relative"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "110vmin", height: "110vmin" }}
        >
          {/* Spinning star GIF */}
          <img 
            src={spinningStarGif} 
            alt="Spinning silver star" 
            className="w-full h-full object-contain"
            style={{ 
              mixBlendMode: 'screen', 
              filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: -5
            }} 
          />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Hi, I'm <span className="text-pink-500">Jiehoon Lee</span>
          </h1>
          <h2 className="text-3xl text-gray-300 mb-6">Aspiring Software Engineer</h2>
          <p className="text-xl text-gray-400 mb-8">
          I enjoy building dynamic and responsive web applications. I’m always eager to learn new technologies like artificial intelligence to enhance my skills and stay at the forefront of the industry.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;