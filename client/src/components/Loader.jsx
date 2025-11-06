import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${iconSize} rounded-full border-4 border-blue-500 border-t-orange-500`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Loader;