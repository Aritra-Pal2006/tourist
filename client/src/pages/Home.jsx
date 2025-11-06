import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import Loader from '../components/Loader';
import WeatherWidget from '../components/WeatherWidget';
import NewsSection from '../components/NewsSection';

const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);

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
            location: 'Europe',
            description: 'The City of Light, known for its art, fashion, gastronomy, and culture.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 2,
            name: 'Kyoto, Japan',
            country: 'Japan',
            location: 'Asia',
            description: 'Ancient temples, traditional gardens, and historic districts.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 3,
            name: 'Santorini, Greece',
            country: 'Greece',
            location: 'Europe',
            description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters.',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1570077188001-6b452d39236f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 4,
            name: 'Banff, Canada',
            country: 'Canada',
            location: 'North America',
            description: 'Mountain landscapes, turquoise lakes, and outdoor adventures.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1553984841-9874015bfde3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
          }
        ];
        
        setDestinations(mockDestinations);
        setFeaturedDestinations(mockDestinations.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Simplified for logged-in users */}
      <div className="relative h-[50vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-orange-900/60 z-10" />
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Welcome back to <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">TravelEase</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              Ready to explore new destinations or continue planning your next adventure?
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/destinations')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore Destinations
              </motion.button>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Destinations */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Popular Destinations
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover the world's most beloved travel spots handpicked by our community
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
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

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/destinations')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Destinations
            </motion.button>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Current Weather
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Check the weather for popular destinations
            </motion.p>
          </div>
          
          <div className="flex justify-center">
            <WeatherWidget location="Paris, France" />
          </div>
        </div>
      </section>

      {/* Travel News */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Latest Travel News
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stay updated with the latest travel trends and news
            </motion.p>
          </div>
          
          <NewsSection location="default" />
        </div>
      </section>
    </div>
  );
};

export default Home;