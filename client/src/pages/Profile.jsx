import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import DestinationCard from '../components/DestinationCard';
import Loader from '../components/Loader';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
        
        // Fetch favorites from localStorage (in a real app, this would come from Firestore)
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
        
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes to favorites
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    
    try {
      await updateProfile(user, {
        displayName: name
      });
      
      setSaveSuccess(true);
      setEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFavorite = (destinationId) => {
    // Remove from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = favorites.filter(fav => fav.id !== destinationId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Update state
    setFavorites(newFavorites);
    
    // Dispatch storage event to update other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'favorites',
      newValue: JSON.stringify(newFavorites)
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Please log in to view your profile</h2>
        </div>
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
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account and saved destinations</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">
                    {user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)}
                  </span>
                </div>
                {editing ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={saving}
                        className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setName(user.displayName || '');
                          setEmail(user.email || '');
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {user.displayName || 'User'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{user.email}</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEditing(true)}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Edit Profile
                    </motion.button>
                  </>
                )}
                
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg"
                  >
                    Profile updated successfully!
                  </motion.div>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Member since</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Last login</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Email verified</span>
                    <span className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                      {user.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Favorites */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 shadow-xl mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Saved Destinations</h2>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {favorites.length} saved
                </span>
              </div>
              
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map((destination) => (
                    <DestinationCard 
                      key={destination.id} 
                      destination={destination} 
                      showRemoveButton={true}
                      onRemove={handleRemoveFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L10 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No saved destinations yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start exploring and save your favorite places
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/destinations')}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Explore Destinations
                  </motion.button>
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className="glass rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">New review added</h3>
                    <p className="text-gray-600 dark:text-gray-300">You reviewed Paris, France</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 dark:text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Destination saved</h3>
                    <p className="text-gray-600 dark:text-gray-300">You saved Kyoto, Japan to favorites</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 7a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zm6-6a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Account created</h3>
                    <p className="text-gray-600 dark:text-gray-300">Welcome to TravelEase!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;