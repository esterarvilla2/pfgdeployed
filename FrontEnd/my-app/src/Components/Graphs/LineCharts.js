import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const LineChart = ({ cityData, cityName, type }) => {
  const labels = ['2020', '2021', '2022', '2023'];

  const economyData = [];
  const societyData = [];
  const environmentData = [];
  const governanceData = [];
  const economyDataReg = [];
  const societyDataReg = [];
  const environmentDataReg = [];
  const governanceDataReg = [];

  labels.forEach(year => {
    const yearData = cityData.find(data => data.City === cityName && data.Year.toString() === year);
    const regionData = cityData.filter(data => data.City !== cityName && data.Year.toString() === year && data.AREA === (yearData ? yearData.AREA : null));

    const sumData = dimension => regionData.reduce((sum, current) => sum + (current[dimension] || 0), 0) / (regionData.length || 1);
    economyDataReg.push(yearData ? sumData('Economy') : 0);
    societyDataReg.push(yearData ? sumData('Cultural') : 0);
    environmentDataReg.push(yearData ? sumData('Environment') : 0);
    governanceDataReg.push(yearData ? sumData('Governance') : 0);

    if (yearData) {
      economyData.push(yearData.Economy || 0);
      societyData.push(yearData.Cultural || 0);
      environmentData.push(yearData.Environment || 0);
      governanceData.push(yearData.Governance || 0);
    } else {
      economyData.push(0);
      societyData.push(0);
      environmentData.push(0);
      governanceData.push(0);
    }
  });

  const dataPairs = [
    { cityData: economyData, regionData: economyDataReg, label: 'Economy', color: 'red' },
    { cityData: societyData, regionData: societyDataReg, label: 'Society', color: 'blue' },
    { cityData: environmentData, regionData: environmentDataReg, label: 'Environment', color: 'green' },
    { cityData: governanceData, regionData: governanceDataReg, label: 'Governance', color: 'yellow' }
  ];

  const datasets = [
    {
      label: `${cityName} ${dataPairs[type].label}`,
      data: dataPairs[type].cityData,
      borderColor: dataPairs[type].color,
      fill: false
    },
    {
      label: `Regional Average ${dataPairs[type].label}`,
      data: dataPairs[type].regionData,
      borderColor: '#aaa', // Gray color for regional data
      borderDash: [5, 5],
      fill: false
    }
  ];

  const data = {
    labels,
    datasets
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 16, // Larger font size for legend items
            family: 'Arial, sans-serif' // Optional: specify the font family
          }
        }
      },
      title: {
        display: true,
        text: `${dataPairs[type].label}`,
        color: 'white',
        font: {
          size: 18, // Larger font size for the title
          weight: 'bold'
        }
      },
      tooltip: {
        bodyFont: {
          size: 14, // Larger font size for tooltip text
        },
        titleFont: {
          size: 16, // Larger font size for tooltip title
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 14 // Larger font size for x-axis labels
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 14 // Larger font size for y-axis labels
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        min: 0,
        max: 10
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', height: '350px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
