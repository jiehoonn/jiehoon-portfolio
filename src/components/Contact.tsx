import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say 
            hi, I'll try my best to get back to you!
          </p>
          <a
            href="https://calendly.com/jiehoonn-bu"
            className="inline-block px-8 py-3 text-lg font-medium text-pink-500 border-2 border-pink-500 rounded-lg hover:bg-pink-500 hover:text-[#050505] transition-colors mb-8"
          >
            Schedule a Meeting
          </a>
          
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://github.com/jiehoonn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/jiehoonlee2002/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:jiehoonn@bu.edu"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;