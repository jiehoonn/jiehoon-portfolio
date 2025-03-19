import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

function Resume() {
  const experiences = [
    {
      title: 'Software Developer Intern',
      company: 'Accelerant',
      period: 'Feb. 2025 - Present',
      description: 'Developed advanced machine learning models to analyze customer data and predict churn, built API and ETL pipelines with Node.js/Express for real-time data integration into PostgreSQL, and supported scalable backend infrastructure using Prisma and AWS.',
    },
    {
      title: 'Web Developer',
      company: 'Arché Journal',
      period: 'Sep. 2024 - Present',
      description: 'Enhanced the user experience by implementing responsive React components with dynamic social media integration and distinctive publication sections, increasing engagement by 23%. Additionally, streamlined deployment by moving from manual FTP uploads to an automated Git-based workflow with AWS hosting, reducing page-load times by 35% and simplifying future content updates.',
    },
    {
      title: 'Software Engineer Fellow',
      company: 'BU Spark! Innovation Fellowship',
      period: 'Jan. 2024 - May 2024',
      description: 'Developed "chatsqrd," an adaptive educational app using conversational AI (OpenAI API) and speech recognition (ElevenLabs) to enhance accessibility for children. Presented at BU Spark Demo Day, the app incorporated Agile Lean UX feedback to boost engagement and satisfaction by 43%, ultimately winning the Audience Choice Award.',
    },
  ];

  const education = [
    {
      degree: 'B.A. Computer Science',
      institution: 'Boston University',
      year: 'Expected May 2026',
    },
  ];

  const skills = [
    'Python',
    'Java',
    'C',
    'JavaScript',
    'TypeScript',
    'OCaml',
    'HTML',
    'CSS',
    'SQL (Postgre / Lite)',
    'Git',
    'React.js',       
    'Node.js',
    'Express.js',
    'Three.js',
    'Framer Motion',
    'AWS',
    'Docker',
    'Flask',
    'Prisma',
    'MongoDB',
    'Firebase/Firestore',
    'Agile',
    'Figma',
    'Jira',
    'Blender',
  ];

  return (
    <section id="resume" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">Resume</h2>

          {/* Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-pink-500 mb-6">Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-pink-500 pl-6"
                >
                  <h4 className="text-xl font-medium text-white">{exp.title}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-300">{exp.company}</p>
                    <p className="text-gray-400">{exp.period}</p>
                  </div>
                  <p className="text-gray-400">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-pink-500 mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-pink-500 pl-6"
                >
                  <h4 className="text-xl font-medium text-white">{edu.degree}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">{edu.institution}</p>
                    <p className="text-gray-400">{edu.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-6">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-[#111111] text-pink-500 rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="/documents/resume.pdf"
              download="Jiehoon_Lee_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-pink-500 border-2 border-pink-500 rounded-lg hover:bg-pink-500 hover:text-[#050505] transition-colors"
            >
              <FileText size={20} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Resume; 