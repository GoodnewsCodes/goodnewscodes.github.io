import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experienceData } from '../data/info';

export default function ExperienceTimeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="timeline-section" ref={containerRef}>
      <h2>
        <span className="kinetic-text">
          My Journey
        </span>
      </h2>
      
      <div className="timeline-container">
        {/* The drawing line */}
        <div className="timeline-line-wrapper">
          <motion.div 
            className="timeline-line-fill" 
            style={{ scaleY, transformOrigin: 'top' }}
          />
        </div>

        <div className="timeline-items">
          {experienceData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className={`timeline-item ${isEven ? 'left' : 'right'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="timeline-node">
        <Briefcase size={16} color="#0c0c0d" />
      </div>
      
      <div className="timeline-content bento-card">
        <span className="timeline-date">{item.date}</span>
        <h3>{item.role}</h3>
        <h4 className="timeline-company">{item.company}</h4>
        <ul>
          {item.description.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
