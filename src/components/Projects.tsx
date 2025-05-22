import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectsProps {}

const projects = [
  {
    title: 'Ocat – ORAS Simplified',
    description: 'A web application that simplifies the ORAS process, making container registry management more accessible.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSql'],
    github: 'https://github.com/krishsah01/ocat',
    live: '#'
  },
  {
    title: 'Inventory Management Software',
    description: 'A comprehensive solution for tracking inventory, managing stock levels, and generating reports.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070',
    techStack: ['Python', 'MySQL'],
    github: '#',
    live: '#'
  },
  {
    title: 'Explore Nepal Tourism Website',
    description: 'A responsive website showcasing Nepal\'s tourism destinations, culture, and travel information.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    live: '#'
  }
];

const Projects = forwardRef<HTMLElement, ProjectsProps>((props, ref) => {
  return (
    <section ref={ref} className="section relative" id="projects">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent"></div>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading text-center">Projects</h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
            Here are some of my recent projects that showcase my skills and expertise
            in software development.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className="h-48 overflow-hidden relative">
                  {/* Project image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                  
                  {/* Tech stack badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-x-3">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-primary-400 hover:text-primary-300"
                      >
                        <FaGithub className="mr-1" /> Code
                      </a>
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-primary-400 hover:text-primary-300"
                      >
                        <FaExternalLinkAlt className="mr-1" /> Demo
                      </a>
                    </div>
                    
                    <motion.div 
                      whileHover={{ 
                        x: 5, 
                        transition: { duration: 0.2 } 
                      }} 
                      className="text-primary-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;