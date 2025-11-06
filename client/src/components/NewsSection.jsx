import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';

const NewsSection = ({ location }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch from NewsData.io API
    // const fetchNews = async () => {
    //   try {
    //     const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${import.meta.env.VITE_NEWSDATA_API_KEY}&q=travel&language=en`);
    //     setNews(response.data.results.slice(0, 3));
    //     setLoading(false);
    //   } catch (err) {
    //     setError("Failed to fetch news");
    //     setLoading(false);
    //   }
    // };

    // Mock news data for demonstration - location-specific
    const locationNewsMap = {
      'Paris, France': [
        {
          title: "New Art Exhibitions in Paris Museums",
          description: "The Louvre and Musée d'Orsay are hosting special exhibitions this spring featuring Impressionist masterpieces.",
          image_url: "https://images.unsplash.com/photo-1569516449331-65d27b686b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/paris-art-exhibitions",
          pubDate: "2024-04-15"
        },
        {
          title: "Seine River Cruises Enhanced with New Routes",
          description: "Experience Paris from a different perspective with the expanded river cruise options along the Seine.",
          image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/seine-river-cruises",
          pubDate: "2024-04-10"
        },
        {
          title: "New Vegan Restaurants Opening in Le Marais",
          description: "The historic district of Le Marais welcomes three new plant-based restaurants with innovative French cuisine.",
          image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/vegan-restaurants-paris",
          pubDate: "2024-04-05"
        }
      ],
      'Kyoto, Japan': [
        {
          title: "Cherry Blossom Forecast for 2024",
          description: "Experts predict peak bloom season will begin in late March with spectacular views across Kyoto's temples.",
          image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/kyoto-cherry-blossoms",
          pubDate: "2024-03-20"
        },
        {
          title: "Traditional Tea Ceremony Experiences",
          description: "Authentic tea ceremony workshops are now available in historic Gion district with English translation.",
          image_url: "https://images.unsplash.com/photo-1547892023-73e4d3bd6c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/tea-ceremony-kyoto",
          pubDate: "2024-03-15"
        },
        {
          title: "Bamboo Forest Path Renovations Completed",
          description: "The famous Arashiyama Bamboo Grove has been enhanced with new walking paths and information stations.",
          image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/bamboo-forest-kyoto",
          pubDate: "2024-03-10"
        }
      ],
      'Santorini, Greece': [
        {
          title: "Summer Festival Schedule Announced",
          description: "Oia's famous sunset celebrations will feature traditional Greek music and dance performances all summer.",
          image_url: "https://images.unsplash.com/photo-1570077188001-6b452d39236f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/santorini-festivals",
          pubDate: "2024-05-01"
        },
        {
          title: "New Hiking Trails Open in Caldera",
          description: "Scenic hiking paths along the volcanic caldera offer breathtaking views of the Aegean Sea and nearby islands.",
          image_url: "https://images.unsplash.com/photo-1613395133390-9d5b55b6c06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/santorini-hiking",
          pubDate: "2024-04-25"
        },
        {
          title: "Local Wineries Offer Sunset Tours",
          description: "Award-winning Assyrtiko wines can be sampled with panoramic sunset views at family-owned vineyards.",
          image_url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/santorini-wine-tours",
          pubDate: "2024-04-20"
        }
      ],
      'Banff, Canada': [
        {
          title: "Glacier Skywalk New Safety Features",
          description: "The famous glass-floored observation platform has been upgraded with enhanced safety measures for visitors.",
          image_url: "https://images.unsplash.com/photo-1553984841-9874015bfde3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/banff-skywalk",
          pubDate: "2024-03-30"
        },
        {
          title: "Wildlife Viewing Season Begins",
          description: "Spring migration brings excellent opportunities to spot elk, bears, and other wildlife in their natural habitat.",
          image_url: "https://images.unsplash.com/photo-1551946581-f41a9cc24a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/banff-wildlife",
          pubDate: "2024-03-25"
        },
        {
          title: "Hot Springs Maintenance Schedule",
          description: "Banff Upper Hot Springs will have extended evening hours during summer months with new mineral treatments.",
          image_url: "https://images.unsplash.com/photo-1551120986-0d0c9c1f8510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/banff-hot-springs",
          pubDate: "2024-03-20"
        }
      ],
      'default': [
        {
          title: "Top 10 Beach Destinations for 2024",
          description: "Discover the most beautiful beaches around the world that should be on your travel bucket list this year.",
          image_url: "https://images.unsplash.com/photo-1505228395891-9a51e781709d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/beach-destinations",
          pubDate: "2024-01-15"
        },
        {
          title: "New Eco-Friendly Travel Trends",
          description: "Sustainable travel is becoming increasingly popular. Learn how you can reduce your carbon footprint while exploring the world.",
          image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/eco-friendly-travel",
          pubDate: "2024-01-10"
        },
        {
          title: "Revolution in Air Travel Technology",
          description: "New advancements in aviation technology promise faster, more efficient, and environmentally friendly air travel.",
          image_url: "https://images.unsplash.com/photo-1569516449331-65d27b686b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          link: "https://example.com/air-travel-tech",
          pubDate: "2024-01-05"
        }
      ]
    };
    
    const mockNews = locationNewsMap[location] || locationNewsMap['default'];

    setNews(mockNews);
    setLoading(false);
  }, [location]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {news.map((article, index) => (
        <motion.div
          key={index}
          className="glass rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="relative">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-bold text-lg">{article.title}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">{article.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(article.pubDate).toLocaleDateString()}
              </span>
              <motion.a
                href={article.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm font-medium shadow-md"
              >
                Read More
              </motion.a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsSection;