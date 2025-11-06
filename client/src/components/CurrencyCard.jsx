import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';

const CurrencyCard = ({ defaultFromCurrency, defaultToCurrency }) => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(defaultToCurrency || 'EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock currency data
  const mockCurrencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'PEN', name: 'Peruvian Sol' },
    { code: 'TZS', name: 'Tanzanian Shilling' },
    { code: 'ISK', name: 'Icelandic Króna' }
  ];

  useEffect(() => {
    setCurrencies(mockCurrencies);
    // Set a default conversion
    setConvertedAmount(0.92); // 1 USD = 0.92 EUR (mock rate)
  }, []);

  const handleConvert = async () => {
    if (amount <= 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would use:
      // const response = await axios.get(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
      // setConvertedAmount(response.data.result);
      
      // Mock conversion (using more realistic rates)
      const mockRates = {
        'USD-EUR': 0.95,
        'USD-GBP': 0.82,
        'USD-JPY': 150.25,
        'USD-CAD': 1.38,
        'USD-AUD': 1.55,
        'USD-CHF': 0.91,
        'USD-CNY': 7.28,
        'USD-INR': 83.50,
        'USD-MXN': 17.60,
        'USD-PEN': 3.75,
        'USD-TZS': 2550,
        'USD-ISK': 138,
        'EUR-USD': 1.05,
        'GBP-USD': 1.22,
        'JPY-USD': 0.0067,
        'CAD-USD': 0.72,
        'AUD-USD': 0.64,
        'CHF-USD': 1.10,
        'CNY-USD': 0.137,
        'INR-USD': 0.012,
        'MXN-USD': 0.057,
        'PEN-USD': 0.267,
        'TZS-USD': 0.00039,
        'ISK-USD': 0.0072
      };
      
      const rateKey = `${fromCurrency}-${toCurrency}`;
      const rate = mockRates[rateKey] || 1;
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (err) {
      setError('Failed to fetch exchange rates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Converted
          </label>
          <div className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {loading ? (
              <Loader size="sm" />
            ) : (
              <span className="font-medium text-gray-800 dark:text-white">
                {convertedAmount} {toCurrency}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConvert}
        disabled={loading}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70"
      >
        {loading ? 'Converting...' : 'Convert'}
      </motion.button>
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>Exchange rates are for demonstration purposes only.</p>
        <p>In a real application, this would integrate with ExchangeRate.host API.</p>
      </div>
    </div>
  );
};

export default CurrencyCard;