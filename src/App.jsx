import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, GitBranch, FileSpreadsheet, Database, Code, Paintbrush,
  Cpu, Smartphone, Target, Flame, Zap, Github, Linkedin,
  ArrowRight, Send, Twitter
} from 'lucide-react';
import TechDoodleBackground from './components/TechDoodleBackground';
import { projectsData } from './data/projects';
import { Instagram } from 'lucide-react';
import profileImg from '../images/profile.webp';
const skillsList = [
  { name: 'Python', icon: Terminal },
  { name: 'Git', icon: GitBranch },
  { name: 'Excel for Data Analysis', icon: FileSpreadsheet },
  { name: 'SQL', icon: Database },
  { name: 'HTML', icon: Code },
  { name: 'CSS', icon: Paintbrush },
  { name: 'React', icon: Cpu },
  { name: 'Flutter', icon: Smartphone },
  { name: 'Dart', icon: Target },
  { name: 'Firebase', icon: Flame },
  { name: 'Supabase', icon: Zap }
];

// Floating side-dot navigation
function SideNav({ activeSection }) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="side-nav">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`side-nav-dot ${activeSection === s.id ? 'active' : ''}`}
          onClick={() => handleClick(s.id)}
          aria-label={s.label}
        >
          <span className="side-nav-label">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Kinetic letter animation
  const renderKineticText = (text) => (
    <span className="kinetic-text">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.022 }}
          whileHover={{ y: -6, color: '#ff5733', scale: 1.12, transition: { duration: 0.15 } }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );

  // Reusable animation variants
  const fold = {
    initial: { opacity: 0, y: 80, rotateX: 10, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  };

  const scaleUpVariant = {
    initial: { opacity: 0, scale: 0.85, y: 40 },
    whileInView: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      <TechDoodleBackground />

      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, background: '#0c0c0d',
              display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{
                width: 44, height: 44,
                border: '3px solid rgba(255,87,51,0.08)',
                borderTopColor: '#ff5733', borderRadius: '50%'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SideNav activeSection={activeSection} />

      <div className="main-wrapper">

        {/* ─── HERO BENTO ─── */}
        <section id="home">
          <motion.div
            className="hero-bento"
            variants={{
              initial: {},
              whileInView: {
                transition: { staggerChildren: 0.2, delayChildren: 1.5 }
              }
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Left Wide Card */}
            <motion.div className="hero-main" variants={scaleUpVariant}>
              <div>
                <h1>{renderKineticText("Hi, I'm Goodnews.")}</h1>
                <p className='hero-role'>a Software Developer</p>

                <motion.div className="hero-marquee-wrapper" {...fold}>
                  <div className="marquee-container" style={{ padding: 0, background: 'transparent', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    <div className="marquee-content" style={{ animationDuration: '15s', fontSize: '1rem', letterSpacing: '1px' }}>
                      <span>Problem Solver</span> · <span>AI Enthusiast</span> · <span>Builds with Flutter</span> · <span>Ships with React</span> · <span>Full Stack Tinkerer</span> · <span>Electron Builder</span>
                    </div>
                  </div>
                </motion.div>

              </div>
              <motion.div className="orgs-container">
                <p className='hero-role' style={{ fontSize: '0.85rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>Organizations I've worked with</p>
                <div className="org-list">
                  <a href="https://www.blimtechnologies.com" className='org-link' target="_blank" rel="noreferrer">
                    <img src="https://www.blimtechnologies.com/logo.png" className='org-img' alt="Blim Tech" onError={(e) => e.target.style.display = 'none'} />
                    Blim Tech
                  </a>
                </div>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See what I've built <ArrowRight size={18} />
              </motion.a>
            </motion.div>

            {/* Middle Top Image Card */}
            <motion.div className="hero-img-card" variants={scaleUpVariant}>
              <img src={profileImg} alt="Goodnews Anwana" />
            </motion.div>

            {/* Middle Bottom Text Card */}
            <motion.div className="hero-text-card" variants={scaleUpVariant}>
              I love turning ideas into real software. Whether it is a slick mobile app, a full-stack web tool, or a project with AI under the hood, I enjoy building tools that work effectively.
            </motion.div>

            {/* Right Accent Card */}
            <motion.div className="hero-side-card" variants={scaleUpVariant}>
              <Code size={120} strokeWidth={1.5} color="#0c0c0d" />
            </motion.div>
          </motion.div>
        </section>



        {/* ─── SKILLS BENTO ─── */}
        <section id="skills">
          <div className="skills-bento">

            {/* Top Left Text */}
            <motion.div className="skill-bento-title" variants={scaleUpVariant} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
              <h2>{renderKineticText("Tools I work with")}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '500px' }}>
                I leverage a diverse set of modern frameworks, languages, and databases to build robust, scalable applications.
              </p>
            </motion.div>

            {/* Middle Left Orange */}
            <motion.div className="skill-bento-orange" variants={scaleUpVariant} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--black)' }}>Web Frontend</h3>
              <p style={{ color: 'rgba(0,0,0,0.7)', marginBottom: '2rem' }}>Crafting responsive, interactive user interfaces.</p>
              <div className="skills-pill-group">
                <span className="skill-pill dark"><Cpu size={18} /> React</span>
                <span className="skill-pill dark"><Code size={18} /> HTML</span>
                <span className="skill-pill dark"><Paintbrush size={18} /> CSS</span>
                <span className='skill-pill dark'>Next.js</span>
              </div>
              <Code size={120} style={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.1, color: '#000' }} />
            </motion.div>

            {/* Top Right Tall */}
            <motion.div className="skill-bento-tall" variants={scaleUpVariant} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Mobile App Dev</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Building native-feeling cross-platform applications.</p>
              <div className="skills-pill-group">
                <span className="skill-pill"><Smartphone size={18} /> Flutter</span>
                <span className="skill-pill">Dart</span>
              </div>
              <Smartphone size={150} style={{ position: 'absolute', bottom: -30, right: -30, opacity: 0.05 }} />
            </motion.div>

            {/* Bottom Left Wide */}
            <motion.div className="skill-bento-wide" variants={scaleUpVariant} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
              <div className="wide-content-split">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Backend & Data</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '350px' }}>
                    Architecting secure databases and server logic to power apps.
                  </p>
                </div>
                <div className="skills-pill-group" style={{ flex: 1 }}>
                  <span className="skill-pill"><Database size={18} /> SQL</span>
                  <span className="skill-pill">Python</span>
                  <span className="skill-pill"><Flame size={18} /> Firebase</span>
                  <span className="skill-pill"><Zap size={18} /> Supabase</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Square Blue */}
            <motion.div className="skill-bento-square" variants={scaleUpVariant} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#000', textAlign: 'center' }}>Utilities</h3>
              <div className="skills-pill-group" style={{ justifyContent: 'center' }}>
                <span className="skill-pill dark"><GitBranch size={18} /> Git</span>
                <span className="skill-pill dark"><FileSpreadsheet size={18} /> Excel</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects">
          <h2>{renderKineticText("Stuff I've built")}</h2>
          <div className="bento-grid">
            {projectsData.map((project, idx) => (
              <motion.div
                key={project.title}
                className="bento-card col-span-4"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card">
                  <div
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links.map((link, i) => (
                        <motion.a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="project-btn"
                          whileHover={{ x: 5 }}
                        >
                          {link.text} <ArrowRight size={15} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact">
          <div className="bento-grid">
            <motion.div className="bento-card col-span-5 contact-container" {...fold}>
              <div>
                <h2>{renderKineticText("Say hello")}</h2>
                <p>
                  Got a cool idea, a job opportunity, or just wanna chat about tech? I'm always down to connect — drop me a message.
                </p>
                <div className="social-links">
                  {[
                    { url: 'https://github.com/GoodnewsCodes', Icon: Github },
                    { url: 'https://www.linkedin.com/in/goodnews-anwana/', Icon: Linkedin },
                    { url: 'https://instagram.com/GoodnewsCodes', Icon: Instagram },
                    { url: 'https://x.com/GoodnewsCodes', Icon: Twitter }
                  ].map(({ url, Icon }, i) => (
                    <motion.a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-bento-card col-span-7" {...fold}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" required></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shoot me a message <Send size={16} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

      </div>

      <footer>
        <p>Built by Goodnews · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
