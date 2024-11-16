import { useState, useEffect } from 'react';
import axios from 'axios';

const Orderbook = () => {
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
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 container">
      <h3 className="text-xl font-semibold head ">
        Orderbook (BTC-USD)
      </h3>
      <div className="grid grid-cols-2  gap-4 mt-4 orderbook">
        <div>
          <h4 className="bids">Bids</h4>
          {orderbook.bids.map((bid, index) => (
            <div key={index} className="text-sm text-gray-700">
              <span className="font-semibold  ">Price:</span> {bid[0]},{' '}
              <span className="font-semibold">Qty:</span> {bid[1]}
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-medium asks">Asks</h4>
          {orderbook.asks.map((ask, index) => (
            <div key={index} className="text-sm text-gray-700">
              <span className="font-semibold">Price:</span> {ask[0]},{' '}
              <span className="font-semibold">Qty:</span> {ask[1]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
