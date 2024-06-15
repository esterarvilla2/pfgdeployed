import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

// Define the color gradient
const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(chartArea.left, chartArea.bottom, chartArea.right, chartArea.top);
  gradient.addColorStop(0, 'rgba(45, 201, 55, 0.5)'); // Adjusted transparency
  gradient.addColorStop(0.3, 'rgba(153, 193, 64, 0.5)');
  gradient.addColorStop(0.5, 'rgba(231, 180, 22, 0.5)');
  gradient.addColorStop(0.7, 'rgba(219, 123, 43, 0.5)');
  gradient.addColorStop(1, 'rgba(204, 50, 50, 0.5)');
  return gradient;
};

// Custom plugin to draw the gradient background
const gradientBackgroundPlugin = {
  id: 'gradientBackground',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    const gradient = createGradient(ctx, chartArea);
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    ctx.restore();
  }
};

const ScatterChart = ({ cityData, cityName }) => {
  const scatterData = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Exposición vs Preparación',
        data: cityData
          .filter(data => data.City === cityName)
          .map(data => ({
            x: data.Exposure,
            y: data.Readiness,
            year: data.Year
          })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white'
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        
        text: `Exposición vs Preparación para ${cityName}`,
        color: 'white',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        labels: { color: 'white' },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ':\n';
            }
            label += `Año: ${context.raw.year}`;
            return label;
          }
        },
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        bodyColor: 'white',
        titleColor: 'white'
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 10,
        reverse: true,
        title: {
          display: true,
          text: 'Exposición',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      },
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Preparación',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Scatter data={scatterData} options={options} plugins={[gradientBackgroundPlugin]} />
    </div>
  );
};

export default ScatterChart;
