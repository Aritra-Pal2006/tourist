import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MapSection = ({ location }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Check if mapboxgl is available
    if (typeof window !== 'undefined' && window.mapboxgl) {
      // Set Mapbox access token
      window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY || 'pk.eyJ1IjoiYXJpdHJhcGFsMjAwNiIsImEiOiJjbWhia242b3YwM3R0MmxzYW5jZTZsNnFvIn0.PMZgXjm8Qn3bgT6HZSmmjg';

      // Location coordinates map
      const locationCoordinates = {
        'Paris, France': [2.3522, 48.8566],
        'Kyoto, Japan': [135.7681, 35.0190],
        'Santorini, Greece': [25.4313, 36.3932],
        'Banff, Canada': [-115.5708, 51.1784],
        'Machu Picchu, Peru': [-72.5450, -13.1631],
        'Safari in Serengeti, Tanzania': [34.8333, -2.1667],
        'Sydney, Australia': [151.2093, -33.8688],
        'Reykjavik, Iceland': [-21.9411, 64.1466]
      };
      
      const coordinates = locationCoordinates[location] || locationCoordinates['Paris, France'];

      // Initialize mapbox
      const map = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 10
      });

      // Add navigation controls
      map.addControl(new window.mapboxgl.NavigationControl());

      // Add a marker
      new window.mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

      // Clean up on unmount
      return () => map.remove();
    }
  }, [location]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-96 relative">
      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
        style={{ display: typeof window !== 'undefined' && window.mapboxgl ? 'block' : 'none' }}
      />
      
      {/* Fallback for when Mapbox is not loaded */}
      {typeof window === 'undefined' || !window.mapboxgl ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900 dark:to-orange-900 flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500 dark:text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Interactive Map</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Map of {location} would be displayed here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              In a real application, this would integrate with Mapbox API
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MapSection;