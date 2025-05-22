import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';

interface ExperienceProps {}

const experiences = [
  {
    title: "Quality Assurance Analyst and Software Developer",
    company: "ITSC",
    period: "Jan 2023 - Present",
    description: "Leading software testing initiatives and contributing to frontend development using modern JavaScript frameworks.",
    responsibilities: [
      "Developed and maintained test plans for web applications",
      "Contributed to frontend development using React and TypeScript",
      "Collaborated with cross-functional teams to improve software quality"
    ]
  },
  {
    title: "Membership Services Staff",
    company: "University of Cincinnati",
    period: "Aug 2021 - Dec 2022",
    description: "Managed membership services and improved data management processes.",
    responsibilities: [
      "Managed member database systems",
      "Provided technical support for facility management software",
      "Improved service processes through data-driven insights"
    ]
  }
];

const Experience = forwardRef<HTMLElement, ExperienceProps>((props, ref) => {
  return (
    <section ref={ref} className="section relative" id="experience">
      {/* Decorative elements */}
      <div className="absolute top-24 right-24 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-24 left-24 w-64 h-64 rounded-full bg-secondary-500/10 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading text-center">Experience</h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
            My professional journey in software development and quality assurance
          </p>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="max-w-4xl mx-auto"
              >
                <div className="glass-card p-8 relative overflow-hidden">
                  {/* Timeline dot and line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-8 top-full w-px h-12 bg-gradient-to-b from-primary-500/50 to-transparent"></div>
                  )}
                  <div className="absolute left-8 top-8 w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="ml-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-display font-bold text-white">{exp.title}</h3>
                      <div className="text-primary-400 flex items-center mt-2 md:mt-0">
                        <FaCalendar className="mr-2" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-lg text-secondary-400 mb-4">
                      <FaBriefcase className="mr-2" />
                      <span>{exp.company}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{exp.description}</p>
                    
                    <div className="space-y-2">
                      {exp.responsibilities.map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 mr-2"></div>
                          <p className="text-gray-300">{item}</p>
                        </motion.div>
                      ))}
                    </div>
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

Experience.displayName = 'Experience';
export default Experience;