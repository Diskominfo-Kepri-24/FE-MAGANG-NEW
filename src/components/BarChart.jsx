// src/components/BarChart.jsx

import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jumlah Peserta Magang per Sekolah/Universitas',
      },
    },
  };

  return (
    <div>
      {data && data.labels && data.datasets ? (
        <Bar options={options} data={data} />
      ) : (
        <p>Data tidak tersedia</p>
      )}
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        backgroundColor: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default BarChart;
