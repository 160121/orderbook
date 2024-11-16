import { Line } from 'react-chartjs-2';
import '../components/ChartSetup';

const MarketDepthChart = ({ orderbook }) => {
  const depthData = {
    bids: orderbook.bids.map((bid) => parseFloat(bid[1])),
    asks: orderbook.asks.map((ask) => parseFloat(ask[1])),
    prices: orderbook.bids.map((bid) => bid[0]),
  };

  const data = {
    labels: depthData.prices,
    datasets: [
      {
        label: 'Bids',
        data: depthData.bids,
        borderColor: '#10B981',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Asks',
        data: depthData.asks,
        borderColor: '#EF4444',
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#4A5568', 
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#4A5568',
        bodyColor: '#4A5568',
        borderColor: '#E2E8F0', 
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E2E8F0',
        },
        ticks: {
          color: '#4A5568',
        },
      },
      x: {
        grid: {
          color: '#E2E8F0',
        },
        ticks: {
          color: '#4A5568',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 container">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 head">
        Market Depth Chart
      </h3>
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MarketDepthChart;
