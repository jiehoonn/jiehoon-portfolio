import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useRef, useEffect } from 'react';

const projects = [
  {
    title: 'chatsqrd',
    description: 'Personalized AI-powered chatbot avatar for children with attention struggles',
    image: 'https://www.bu.edu/spark/files/2024/05/2J3A9245-e1714995585575-768x522.jpg',
    github: 'https://github.com/miloopark/chatchat/tree/dev',
    live: 'https://www.bu.edu/spark/2024/05/06/demo-day-spring-2024-inspires-crowd-with-groundbreaking-innovation/',
    tech: ['React.js', 'Express.js', 'Node.js', 'OpenAI API', 'ElevenLabs', 'Firebase', 'Blender'],
  },
  {
    title: 'Stock Trading Platform',
    description: 'Stock trading simulator with real-time data from Alpha Vantage API',
    image: 'https://learn.g2.com/hubfs/G2CM_FI682_Learn_Article_Images_%5BStock_Trading_Apps_and_Usage_Statistics%5D_V1b.png',
    github: 'https://github.com/jiehoonn/411-finalproject/tree/temp',
    // live: 'https://example.com',
    tech: ['Python', 'Javascript', 'SQL', 'React.js', 'Flask', 'Docker', 'Alpha Vantage API'],
  },
  {
    title: 'ALEA',
    description: 'Polkadot Hackathon blockchain-based esports betting platform',
    image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/08/polkadot_logo-1.png',
    github: 'https://github.com/miloopark/ALEA',
    // live: 'https://example.com',
    tech: ['React.js', 'Node.js', 'Express.js', 'Apollo', 'Mongoose', 'Ethers.js', 'Solidity', 'Hardhat', 'Polkadot'],
  },
  {
    title: 'NBA MVP ML Algorithm',
    description: 'Work-in-progress',
    image: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/sehphfnxxietcg4ckjio',
    github: 'https://github.com/jiehoonn/NBA-ML-Data-Scraping',
    // live: 'https://example.com',
    tech: ['Python', 'Pandas', 'beautifulsoup', 'Selenium'],
  },
  // {
  //   title: 'Project Five',
  //   description: 'Blockchain-based voting system',
  //   image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
  //   github: 'https://github.com',
  //   live: 'https://example.com',
  //   tech: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
  // },
];

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let progress = 0;
    let animationFrame: number;
    const totalScroll = container.scrollWidth - window.innerWidth + 100; // Extra padding
    const sectionHeight = window.innerHeight * 2; // Make section taller for smooth scroll

    const updateScroll = () => {
      if (!section || !container) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const scrollPercentage = sectionTop / (sectionHeight - window.innerHeight);
      const targetProgress = Math.max(0, Math.min(1, scrollPercentage));
      
      // Smooth interpolation
      progress += (targetProgress - progress) * 0.1;
      
      // Apply transform
      const x = -(totalScroll * progress);
      container.style.transform = `translate3d(${x}px, 0, 0)`;
      
      animationFrame = requestAnimationFrame(updateScroll);
    };

    // Start animation loop
    updateScroll();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{ height: '200vh' }} // Taller section for smooth scroll
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="pt-12 mb-4">
          {/* <h2 className="text-4xl font-bold text-white text-center">
            Featured Projects
          </h2> */}
        </div>

        <div
          ref={containerRef}
          className="absolute left-0 w-full flex items-center pl-[10vw]"
          style={{ willChange: 'transform', top: '120px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[500px] flex-shrink-0 mr-8"
            >
              <div className="bg-[#111111] rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-[1.02] aspect-square">
                <div className="relative h-1/2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm text-pink-500 bg-pink-500/10 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;