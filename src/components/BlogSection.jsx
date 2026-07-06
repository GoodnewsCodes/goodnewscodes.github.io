import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { caseStudiesData } from '../data/info';

export default function BlogSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="blog" className="blog-section">
      <h2>
        <span className="kinetic-text">
          Deep Dives
        </span>
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        A closer look into the technical challenges I've solved and how I built them.
      </p>

      <motion.div 
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {caseStudiesData.map((study, index) => (
          <motion.div key={study.id} className="bento-card col-span-6 blog-card" variants={itemVariants}>
            <div className="blog-icon-wrapper">
              <BookOpen size={24} color="var(--primary)" />
            </div>
            <span className="blog-date">{study.date}</span>
            <h3>{study.title}</h3>
            <p>{study.excerpt}</p>
            <a href={study.link} target="_blank" rel="noreferrer" className="read-more-btn">
              Read article <ArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
