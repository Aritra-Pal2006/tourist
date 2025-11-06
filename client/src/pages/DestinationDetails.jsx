import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from '../components/Loader';
import WeatherWidget from '../components/WeatherWidget';
import MapSection from '../components/MapSection';
import CurrencyCard from '../components/CurrencyCard';
import NewsSection from '../components/NewsSection';
import { auth } from '../firebase';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // Check if destination is in favorites
      if (currentUser && destination) {
        // In a real app, this would check Firestore for the favorite status
        // For now, we'll use localStorage as a temporary solution
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFav = favorites.some(fav => fav.id === parseInt(id));
        setIsFavorite(isFav);
      }
    });

    return () => unsubscribe();
  }, [id, destination]);

  useEffect(() => {
    // Simulate fetching destination details
    const fetchDestination = async () => {
      try {
        // In a real app, this would come from Firestore
        // Map IDs to actual destinations
        const destinationsMap = {
          '1': {
            id: 1,
            name: 'Paris, France',
            country: 'France',
            location: 'Europe',
            description: 'Paris, the capital of France, is synonymous with the finer things in life: the Eiffel Tower, exquisite cuisine, designer fashion houses, and the Louvre Museum. The City of Light has inspired artists, writers, and filmmakers for centuries with its romantic ambiance and cultural landmarks. Stroll along the Seine River, explore Montmartre, or enjoy a croissant at a sidewalk café – Paris offers endless enchantment.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '2': {
            id: 2,
            name: 'Kyoto, Japan',
            country: 'Japan',
            location: 'Asia',
            description: 'Kyoto, Japan’s former capital, is home to numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of seasonal dishes served in small courses, and geisha, female entertainers often found in the Gion district.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '3': {
            id: 3,
            name: 'Santorini, Greece',
            country: 'Greece',
            location: 'Europe',
            description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its dramatic landscape. The whitewashed houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1570077188001-6b452d39236f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1570077188001-6b452d39236f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1564349683136-77e08dba3e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1613395133390-9d5b55b6c06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '4': {
            id: 4,
            name: 'Banff, Canada',
            country: 'Canada',
            location: 'North America',
            description: 'Banff National Park in the Canadian Rockies is known for its stunning turquoise glacial lakes, majestic mountain peaks, and abundant wildlife. The town of Banff, located within the park, offers a charming mix of outdoor adventure and cultural attractions. From hiking and skiing to soaking in natural hot springs, Banff provides year-round recreational opportunities in one of Canada\'s most beautiful settings.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1553984841-9874015bfde3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1553984841-9874015bfde3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1551946581-f41a9cc24a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1551120986-0d0c9c1f8510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '5': {
            id: 5,
            name: 'Machu Picchu, Peru',
            country: 'Peru',
            location: 'South America',
            description: 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru. Built in the 15th century and later abandoned, it\'s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments, and panoramic views. Its iconic views over the Urubamba River valley have made it one of the most famous archaeological sites in the world.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1526392062078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1526392062078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1573398709712-6833d74821a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1573398709712-6833d74821a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '6': {
            id: 6,
            name: 'Safari in Serengeti, Tanzania',
            country: 'Tanzania',
            location: 'Africa',
            description: 'The Serengeti National Park is a Tanzanian national park in the Serengeti ecosystem, famous for its annual migration of over 1.5 million white-bearded (or brindled) wildebeest and 250,000 zebra and for its numerous Nile crocodile. The name "Serengeti" is derived from the Maasai language and means "the land which moves on", describing the mass annual migration of these animals.',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1547892023-73e4d3bd6c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '7': {
            id: 7,
            name: 'Sydney, Australia',
            country: 'Australia',
            location: 'Oceania',
            description: 'Sydney, capital of New South Wales and one of Australia\'s largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life, with the arched Harbour Bridge and esteemed Royal Botanic Garden nearby. Sydney Tower’s outdoor platform, the Skywalk, offers 360-degree views of the city and suburbs.',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1523978591478-c753949ff840?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          },
          '8': {
            id: 8,
            name: 'Reykjavik, Iceland',
            country: 'Iceland',
            location: 'Europe',
            description: 'Reykjavik, on the coast of Iceland, is the country\'s capital and largest city. It\'s home to the National and Saga museums, tracing Iceland\'s Viking history. The striking 107-meter Hallgrímskirkja church, a prominent landmark, features a distinctive stepped facade and an observation deck with views. Exemplifying the island\'s volcanic activity is the geothermal Blue Lagoon spa, near the airport.',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1514924013411-fd9e5a242a34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ]
          }
        };
        
        const mockDestination = destinationsMap[id] || destinationsMap['1']; // Default to Paris if ID not found
        
        setDestination(mockDestination);
        
        // Mock country info based on destination
        const countryInfoMap = {
          '1': {
            name: 'France',
            capital: 'Paris',
            population: '67,390,000',
            flag: '🇫🇷',
            currency: 'Euro (€)',
            language: 'French'
          },
          '2': {
            name: 'Japan',
            capital: 'Tokyo',
            population: '125,800,000',
            flag: '🇯🇵',
            currency: 'Yen (¥)',
            language: 'Japanese'
          },
          '3': {
            name: 'Greece',
            capital: 'Athens',
            population: '10,720,000',
            flag: '🇬🇷',
            currency: 'Euro (€)',
            language: 'Greek'
          },
          '4': {
            name: 'Canada',
            capital: 'Ottawa',
            population: '38,000,000',
            flag: '🇨🇦',
            currency: 'Dollar (C$)',
            language: 'English, French'
          },
          '5': {
            name: 'Peru',
            capital: 'Lima',
            population: '32,971,000',
            flag: '🇵🇪',
            currency: 'Sol (S/)',
            language: 'Spanish'
          },
          '6': {
            name: 'Tanzania',
            capital: 'Dodoma',
            population: '59,730,000',
            flag: '🇹🇿',
            currency: 'Shilling (TSh)',
            language: 'Swahili, English'
          },
          '7': {
            name: 'Australia',
            capital: 'Canberra',
            population: '25,690,000',
            flag: '🇦🇺',
            currency: 'Dollar (A$)',
            language: 'English'
          },
          '8': {
            name: 'Iceland',
            capital: 'Reykjavik',
            population: '341,000',
            flag: '🇮🇸',
            currency: 'Króna (ISK)',
            language: 'Icelandic'
          }
        };
        
        const mockCountryInfo = countryInfoMap[id] || countryInfoMap['1']; // Default to France if ID not found
        
        setCountryInfo(mockCountryInfo);
        
        // Mock reviews
        const mockReviews = [
          {
            id: 1,
            user: 'John Doe',
            rating: 5,
            comment: 'Absolutely amazing city! The architecture and culture are breathtaking.',
            date: '2024-01-15'
          },
          {
            id: 2,
            user: 'Jane Smith',
            rating: 4,
            comment: 'Great food and friendly people. Will definitely visit again.',
            date: '2024-01-10'
          }
        ];
        
        setReviews(mockReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destination:', error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        user: 'Current User', // In real app, this would be the logged in user
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  const handleSaveToFavorites = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Toggle favorite status
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);

    // Save to localStorage (in a real app, this would be saved to Firestore)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (newIsFavorite) {
      // Add to favorites
      newFavorites = [...favorites, destination];
    } else {
      // Remove from favorites
      newFavorites = favorites.filter(fav => fav.id !== destination.id);
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Destination not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">The destination you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Destinations
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center">
                <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    {destination.rating}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">{destination.location}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveToFavorites}
              className="mt-4 md:mt-0 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </motion.button>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {destination.imageUrl ? (
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-orange-400 flex items-center justify-center">
                  <span className="text-white text-xl font-bold text-center px-4">{destination.name}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {destination.gallery && destination.gallery.slice(0, 4).map((img, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={img} 
                    alt={`${destination.name} ${index + 1}`}
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
              ))}
              {!destination.gallery && (
                <>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden shadow-xl">
                      <div className="w-full h-44 bg-gradient-to-r from-blue-400 to-orange-400 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Image {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-8 mb-12 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About {destination.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {destination.description}
              </p>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-2xl p-8 mb-12 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Location</h2>
              <MapSection location={destination.name} />
            </motion.div>

            {/* Local News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-2xl p-8 mb-12 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Local News</h2>
              <NewsSection location={destination.name} />
            </motion.div>
            
            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Reviews</h2>
              
              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="mb-8 p-6 glass rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add Your Review</h3>
                <div className="flex items-center mb-4">
                  <label className="mr-4 text-gray-700 dark:text-gray-300">Rating:</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= newReview.rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  rows="4"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Submit Review
                </motion.button>
              </form>
              
              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="glass rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{review.user}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Weather Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-6 mb-8 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Weather</h3>
              <WeatherWidget location={destination.name} />
            </motion.div>

            {/* Country Info */}
            {countryInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-2xl p-6 mb-8 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Country Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Flag:</span>
                    <span className="text-2xl">{countryInfo.flag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Capital:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{countryInfo.capital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Population:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{countryInfo.population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Currency:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{countryInfo.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Language:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{countryInfo.language}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Currency Converter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Currency Converter</h3>
              <CurrencyCard 
                defaultFromCurrency="USD" 
                defaultToCurrency={
                  destination.country === 'France' ? 'EUR' :
                  destination.country === 'Japan' ? 'JPY' :
                  destination.country === 'Greece' ? 'EUR' :
                  destination.country === 'Canada' ? 'CAD' :
                  destination.country === 'Peru' ? 'PEN' :
                  destination.country === 'Tanzania' ? 'TZS' :
                  destination.country === 'Australia' ? 'AUD' :
                  destination.country === 'Iceland' ? 'ISK' : 'EUR'
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;