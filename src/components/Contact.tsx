import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaEnvelope, FaUser } from 'react-icons/fa';

interface ContactProps {}

const Contact = forwardRef<HTMLElement, ContactProps>((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Replace with your actual EmailJS service, template, and user IDs
      const result = await emailjs.send(
        'service_06zkp5c',
        'template_vh0zvjw',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Krish Kumar Sah',
          reply_to: formData.email,
        },
        'wdiaLC-RnOBhVXHr_'
      );
      
      console.log('Email successfully sent!', result.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="section relative" id="contact">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute top-40 left-20 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-secondary-500/10 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading text-center">Get In Touch</h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
            Have a question or want to work together? Feel free to reach out!
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon!</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 btn-outline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <div>
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6"
                    >
                      <p>There was a problem sending your message. Please try again.</p>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-gray-500"
                            placeholder="Your name"
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-gray-500"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="block w-full px-3 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-gray-500"
                        placeholder="Your message..."
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-right"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FaPaperPlane className="mr-2" /> Send Message
                          </span>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                
                  <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-medium text-white">Contact Information</h3>
                        <p className="text-gray-400">Feel free to reach out directly</p>
                      </div>
                      <div>
                        <a 
                          href="mailto:sahkr@mail.uc.edu"
                          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
                        >
                          <FaEnvelope className="mr-2" /> sahkr@mail.uc.edu
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;