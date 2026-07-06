import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { aboutMeData } from '../data/info';

export default function AboutMe() {
  const fold = {
    initial: { opacity: 0, y: 80, rotateX: 10, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="about" className="about-section" style={{ minHeight: 'auto', paddingBottom: 0 }}>
      <div className="bento-grid">
        <motion.div className="bento-card col-span-12 about-card" {...fold}>
          <div className="about-content">
            <div className="about-header">
              <h2>My Story</h2>
              <Coffee size={28} color="var(--primary)" />
            </div>
            <div className="about-text-content">
              {aboutMeData.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="about-decoration">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
