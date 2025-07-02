import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    
    // Change navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // 😀
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header 
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled 
                        ? 'py-3 bg-gray-900/80 backdrop-blur-md shadow-md' 
                        : 'py-5 bg-transparent'
                }`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                            KS
                        </span>
                    </motion.div>
                    
                    <motion.nav 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex space-x-8"
                    >
                        {['About', 'Projects', 'Experience', 'Skills', 'Contact', 'Research'].map((item) => (
  <a
    key={item}
    href={`#${item.toLowerCase()}`}
    className="text-gray-300 hover:text-white transition-colors"
  >
    {item}
  </a>
))}
                    </motion.nav>
                    
                    {/* Mobile menu button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:hidden text-gray-300 hover:text-white"
                        aria-label="Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-8 bg-gray-900/80 backdrop-blur-md">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Krish Kumar Sah. All rights reserved.
                        </p>
                        <div className="mt-4 flex justify-center space-x-6">
                            {[
                                { name: 'GitHub', link: 'https://github.com/krishkumar' },
                                { name: 'LinkedIn', link: 'https://www.linkedin.com/in/krish-kumar-sah' },
                                { name: 'Email', link: 'mailto:sahkr@mail.uc.edu' }
                            ].map((item) => (
                                <a 
                                    key={item.name}
                                    href={item.link}
                                    className="text-gray-400 hover:text-primary-400 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;