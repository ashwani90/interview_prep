import React from 'react';
import { motion } from 'framer-motion';
import './Skeleton.css';

const Skeleton = ({ count = 1, width = '100%', height = '1rem', borderRadius = '4px' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="skeleton"
          style={{ width, height, borderRadius }}
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;