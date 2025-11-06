import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DestinationCard from '../components/DestinationCard';
import Loader from '../components/Loader';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];

  useEffect(() => {
    // Simulate fetching destinations
    const fetchDestinations = async () => {
      try {
        // In a real app, this would come from Firestore
        const mockDestinations = [
          {
            id: 1,
            name: 'Paris, France',
            country: 'France',
            region: 'Europe',
            description: 'The City of Light, known for its art, fashion, gastronomy, and culture.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 2,
            name: 'Kyoto, Japan',
            country: 'Japan',
            region: 'Asia',
            description: 'Ancient temples, traditional gardens, and historic districts.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 3,
            name: 'Santorini, Greece',
            country: 'Greece',
            region: 'Europe',
            description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters.',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1570077188001-6b452d39236f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 4,
            name: 'Banff, Canada',
            country: 'Canada',
            region: 'North America',
            description: 'Mountain landscapes, turquoise lakes, and outdoor adventures.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1553984841-9874015bfde3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 5,
            name: 'Machu Picchu, Peru',
            country: 'Peru',
            region: 'South America',
            description: 'Ancient Incan citadel set high in the Andes Mountains.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1526392062078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 6,
            name: 'Safari in Serengeti, Tanzania',
            country: 'Tanzania',
            region: 'Africa',
            description: 'Experience the great migration and wildlife in their natural habitat.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 7,
            name: 'Sydney, Australia',
            country: 'Australia',
            region: 'Oceania',
            description: 'Iconic Opera House, beautiful beaches, and vibrant culture.',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 8,
            name: 'Reykjavik, Iceland',
            country: 'Iceland',
            region: 'Europe',
            description: 'Land of fire and ice with geysers, waterfalls, and Northern Lights.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          }
        ];
        
        setDestinations(mockDestinations);
        setFilteredDestinations(mockDestinations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let result = destinations;
    
    if (searchTerm) {
      result = result.filter(destination => 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRegion !== 'All') {
      result = result.filter(destination => destination.region === selectedRegion);
    }
    
    setFilteredDestinations(result);
  }, [searchTerm, selectedRegion, destinations]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Explore <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Destinations</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover amazing places around the world and plan your next adventure
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="glass rounded-2xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No destinations found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;