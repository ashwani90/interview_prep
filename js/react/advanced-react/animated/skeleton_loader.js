import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './Skeleton';
import './SkeletonLoader.css';

const SkeletonLoader = ({ isLoading, children, skeletonCount = 3 }) => {
  return (
    <div className="skeleton-loader">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Skeleton count={skeletonCount} height="20px" />
            <Skeleton count={skeletonCount} height="15px" width="80%" />
            <Skeleton height="200px" borderRadius="8px" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkeletonLoader;