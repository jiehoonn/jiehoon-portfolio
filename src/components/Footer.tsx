import { motion } from 'framer-motion';
import blurTextSvg from '../assets/svg/blur-text.svg';

function Footer() {
  return (
    <footer className="py-0 mt-0 overflow-hidden" style={{ marginBottom: '-50px' }}>
      <div className="px-0 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
          style={{ marginTop: '-80px', marginBottom: '-35px' }}
        >
          <img 
            src={blurTextSvg} 
            alt="Blur Text Logo" 
            style={{ height: '700px', width: 'auto', maxHeight: '700px' }}
            className="object-contain"
          />
        </motion.div>
        <div className="text-center mt-0 mb-0 text-gray-500 text-sm">
          © {new Date().getFullYear()} • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer; 