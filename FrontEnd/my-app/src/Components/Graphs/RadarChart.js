import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ cityData, cityName }) => {
  const year = 2023;
  const dimensions = ['Economy', 'Cultural', 'Environment', 'Governance', 'Exposure', 'Readiness'];

  const cityData2023 = cityData.find(data => data.City === cityName && data.Year === year);
  const cityCluster = cityData2023 ? cityData2023.Cluster : null;
  const clusterData2023 = cityData.filter(data => data.Cluster === cityCluster && data.Year === year && data.City !== cityName);

  const averageClusterData = (dimension) => {
    const total = clusterData2023.reduce((sum, item) => sum + item[dimension], 0);
    return total / clusterData2023.length;
  };

  const data = {
    labels: dimensions,
    datasets: [
      {
        label: cityName,
        data: dimensions.map(dimension => cityData2023 ? cityData2023[dimension] : 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Media del Clúster',
        data: dimensions.map(dimension => averageClusterData(dimension)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)' // Color de las líneas angulares
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)' // Color de la rejilla
        },
        pointLabels: {
          color: 'white', // Color de las etiquetas de los puntos
          font: {
            size: 14 // Tamaño de la fuente de las etiquetas de los puntos
          }
        },
        ticks: {
          color: 'white', // Color de las etiquetas de los ticks
          backdropColor: 'rgba(0, 0, 0, 0)' // Fondo transparente para las etiquetas de los ticks
        },
        beginAtZero: true,
        min: 0,
        max: 10,
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: `Comparación de ${cityName} con la media de su clúster`,
        color: 'white',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', height: '500px', width: '500px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
