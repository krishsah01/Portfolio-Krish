import { useRef } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GameHub from './components/GameHub';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AiGuide from './components/AiGuide';

const App = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const gameHubRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const aiGuideRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Reference to section is not available');
    }
  };

  return (
    <Layout>
      <Hero 
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
      <GameHub ref={gameHubRef} />
      <Experience ref={experienceRef} />
      <Skills ref={skillsRef} />
      <Contact ref={contactRef} />
      <AiGuide ref={aiGuideRef} />
    </Layout>
  );
};

export default App;