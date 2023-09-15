import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

// Register the scales and controllers
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const BarGraph = ({ labels, values }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Field Values',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: values,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Fields',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div className="bar-graph">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
