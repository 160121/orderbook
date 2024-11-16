import { Line } from 'react-chartjs-2';

const OrderbookImbalance = ({ orderbook }) => {
  const imbalance =
    orderbook.bids.reduce((sum, bid) => sum + parseFloat(bid[1]), 0) -
    orderbook.asks.reduce((sum, ask) => sum + parseFloat(ask[1]), 0);

  const data = {
    labels: ['Imbalance'],
    datasets: [
      {
        label: 'Orderbook Imbalance',
        data: [imbalance],
        backgroundColor: imbalance > 0 ? '#34D399' : '#F87171',
        borderColor: imbalance > 0 ? '#34D399' : '#F87171',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 container">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 head">
        Orderbook Imbalance
      </h3>
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default OrderbookImbalance;
