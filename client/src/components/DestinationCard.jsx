import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ destination, showRemoveButton, onRemove }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    // Only navigate if not clicking on a button
    if (!showRemoveButton) {
      navigate(`/destination/${destination.id}`);
    }
  };

  const handleImageError = (e) => {
    // Set a fallback image if the original image fails to load
    if (!imageError) {
      setImageError(true);
      // Using a more reliable fallback image
      e.target.src = 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80';
      e.target.onerror = null; // Prevent infinite loop
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-2xl overflow-hidden shadow-xl cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative">
        {destination.imageUrl && !imageError ? (
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
        ) : (
          // Improved fallback UI with a gradient background
          <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-orange-400 flex items-center justify-center">
            <span className="text-white text-xl font-bold text-center px-2">{destination.name}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
          {destination.country}
        </div>
        {showRemoveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(destination.id);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition-colors duration-300"
            aria-label="Remove from favorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{destination.name}</h3>
          <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-2 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">
              {destination.rating || 'N/A'}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {destination.description?.substring(0, 100)}...
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{destination.location}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/destination/${destination.id}`);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm font-medium shadow-md"
          >
            Explore
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;