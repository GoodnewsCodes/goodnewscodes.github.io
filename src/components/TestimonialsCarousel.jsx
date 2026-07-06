import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data/info';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = testimonialsData.length - 1;
    if (newIndex >= testimonialsData.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <h2>
        <span className="kinetic-text">
          What people say
        </span>
      </h2>
      
      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={() => paginate(-1)}>
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-viewport">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="testimonial-card bento-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <Quote size={40} className="quote-icon" />
              <p className="testimonial-quote">"{testimonialsData[currentIndex].quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonialsData[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <h4>{testimonialsData[currentIndex].name}</h4>
                  <span>{testimonialsData[currentIndex].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="carousel-btn next" onClick={() => paginate(1)}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-dots">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}
