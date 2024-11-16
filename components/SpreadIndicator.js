import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const SpreadIndicator = ({ orderbook }) => {
  const [spreadData, setSpreadData] = useState([]);

  useEffect(() => {
    if (orderbook.bids.length > 0 && orderbook.asks.length > 0) {
      const spread =
        parseFloat(orderbook.asks[0][0]) - parseFloat(orderbook.bids[0][0]);
      setSpreadData((prev) => [...prev.slice(-59), spread]);
    }
  }, [orderbook]);

  const data = {
    labels: spreadData.map((_, index) => index),
    datasets: [
      {
        label: 'Spread',
        data: spreadData,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 container">
      <h3 className="text-lg font-semibold text-gray-800 head">Spread Indicator</h3>
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SpreadIndicator;
