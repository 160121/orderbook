import { useState, useEffect } from 'react';
import Orderbook from '../components/Orderbook';
import SpreadIndicator from '../components/SpreadIndicator';
import OrderbookImbalance from '../components/OrderbookImbalance';
import MarketDepthChart from '../components/MarketDepthChart';
import axios from 'axios';

const Home = () => {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const fetchOrderbook = async () => {
      try {
        const response = await axios.get(
          'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10'
        );
        setOrderbook(response.data);
      } catch (error) {
        console.error('Error fetching orderbook:', error);
      }
    };

    fetchOrderbook();
    const interval = setInterval(fetchOrderbook, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        BTC-USD Trading Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Orderbook />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <SpreadIndicator orderbook={orderbook} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <OrderbookImbalance orderbook={orderbook} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <MarketDepthChart orderbook={orderbook} />
        </div>
      </div>
    </div>
  );
};

export default Home;
