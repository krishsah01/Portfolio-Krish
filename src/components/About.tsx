import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import portrait from '../assets/portrait.jpg';

const About = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="section relative" id="about">
      {/* Background design elements */}
      <div className="absolute right-0 top-0 w-1/3 h-1/2 bg-gradient-to-l from-primary-900/20 to-transparent -z-10"></div>
      <div className="absolute left-0 bottom-0 w-1/2 h-1/3 bg-gradient-to-t from-secondary-900/20 to-transparent -z-10"></div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading text-center">About Me</h2>
          
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-1/3"
              >
                <div className="aspect-square relative rounded-full overflow-hidden border-4 border-primary-500/30 shadow-glow">
                  {/* Replace with your photo */}
                  <img src="../assets/portrait.jpg" alt="" />
                  {/* <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-secondary-500 opacity-90">
                    
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">KS</div> */}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full md:w-2/3"
              >
                <p className="text-lg text-gray-300 mb-4">
                  I'm an aspiring software developer currently pursuing a B.S. in IT with a focus on 
                  Software Application Development and Data Technologies at the University of Cincinnati.
                </p>
                <p className="text-lg text-gray-300">
                  Passionate about building efficient, scalable, and user-centered applications, 
                  I constantly explore new technologies and methodologies to enhance my skills and deliver 
                  exceptional software solutions.
                </p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Location', value: 'Cincinnati, Ohio' },
                    { label: 'Study', value: 'University of Cincinnati' },
                    { label: 'Degree', value: 'B.S. in IT' },
                    { label: 'Focus', value: 'Software Development' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;