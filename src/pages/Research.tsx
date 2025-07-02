import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import FluxVsSDXL from './researches/FluxVsSDXL';

interface ResearchProps {}

const researchTopics = [
  {
    id: 'flux-vs-sdxl',
    title: 'FLUX.1 vs SDXL: AI Image Generation Comparison',
    description: 'Comprehensive analysis comparing FLUX.1 and SDXL models for AI image generation, including performance benchmarks, quality assessments, and workflow recommendations.',
    category: 'AI/ML',
    date: '2024',
    status: 'Published',
    featured: true
  },
  // Placeholder for future research topics
  {
    id: 'coming-soon-1',
    title: 'Research Topic Coming Soon',
    description: 'More research content will be added here in the future.',
    category: 'Technology',
    date: 'TBD',
    status: 'Coming Soon',
    featured: false
  }
];

const Research = forwardRef<HTMLElement, ResearchProps>((_props, ref) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
  };

  // If a topic is selected, render that topic's content
  if (selectedTopic === 'flux-vs-sdxl') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Back button */}
        <div className="container mx-auto px-6 pt-6">
          <button
            onClick={handleBackToList}
            className="mb-6 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Research
          </button>
        </div>
        <FluxVsSDXL />
      </div>
    );
  }

  // Default: render research topic list
  return (
    <section ref={ref} className="section relative" id="research">
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
          <h2 className="heading text-center">Research</h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
            Explore my research and analysis on emerging technologies, AI/ML developments, and technical insights.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-card overflow-hidden group cursor-pointer ${
                  topic.status === 'Coming Soon' ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={() => topic.status === 'Published' && handleTopicSelect(topic.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {topic.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">{topic.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.status === 'Published' 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {topic.status}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  
                  {topic.featured && (
                    <div className="flex items-center text-yellow-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured Research
                    </div>
                  )}
                  
                  {topic.status === 'Published' && (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center">
                        Read Research
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      
                      <motion.div 
                        whileHover={{ 
                          x: 5, 
                          transition: { duration: 0.2 } 
                        }} 
                        className="text-indigo-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Research.displayName = 'Research';
export default Research;
