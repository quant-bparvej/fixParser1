import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-chart-pie'; // Import the pie chart plugin


function PieChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Label 1', 'Label 2', 'Label 3'],
          datasets: [
            {
              data: [10, 20, 30], // Adjust the data values here
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '300px', height: '300px' }}></canvas>
    </div>
  );
}


export default PieChart;
