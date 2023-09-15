import React, { useEffect, useRef } from 'react';
import { Chart, PieController, CategoryScale, ArcElement, Title, Tooltip } from 'chart.js';

const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the Chart instance

  useEffect(() => {
    // Register the Pie controller and other required modules
    Chart.register(PieController, CategoryScale, ArcElement, Title, Tooltip);

    const ctx = chartRef.current.getContext('2d');

    // Check if a chart instance exists and destroy it before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((_, index) => `Label ${index + 1}`),
        datasets: [{
          data,
          backgroundColor: ['#FFF1C9', '#F7B7A3', '#EA5F89', '#9B3192', '#57167E', '#2B0B3F'], // Add more colors if needed
        }],
      },
    });
  }, [data]);

  return (
    <canvas ref={chartRef} />
  );
};

export default PieChartComponent;
