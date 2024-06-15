import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,Marker
} from "react-simple-maps";


const cityClusters = {
  1: ["Zurich", "Vienna", "Berlin", "Munich", "Geneva", "Vancouver", "Dusseldorf", "Sydney", "Toronto", "Melbourne", "Bern", "Copenhagen", "Ottawa", "Frankfurt", "Stockholm", "Auckland", "Singapore", "Adelaide", "Canberra", "Hamburg", "Montreal", "Basel", "Oslo", "Wellington", "Helsinki", "Luxembourg", "Dublin", "Stuttgart", "Edinburgh", "Linz", "Cologne", "Birmingham", "Liverpool", "Manchester", "Antwerp", "Gothenburg", "Malmo", "Bergen", "Aarhus", "Belfast", "Stavanger", "Bristol", "Tampere", "Nottingham", "Glasgow", "Espoo", "Oulu"],
  2: ["Buenos Aires", "Kuala Lumpur", "Shanghai", "Panama City", "Medellín", "Beijing", "Mexico City", "Córdoba", "Bangkok", "Brasilia", "Monterrey", "Guangzhou", "Sao Paulo", "Cape Town", "Asuncion", "Rio de Janeiro", "Istanbul", "Lima", "Bogota", "Durban", "Guadalajara", "Johannesburg", "Tunis", "Quito", "Shenzhen", "Moscow", "Belgrade", "Chengdu", "St Petersburg", "Manila", "Kiev", "Casablanca", "Ho Chi Minh City", "Jakarta", "Chongqing", "Ankara", "Hanoi", "Mumbai", "Shenyang", "Bangalore", "New Delhi", "La Paz", "Cairo", "Rabat", "Minsk", "Tianjin", "Harbin", "Hyderabad", "Accra"],
  3: ["Amsterdam", "Paris", "London", "Tokyo", "Brussels", "Barcelona", "Milan", "Madrid", "Seoul", "Lyon", "Lisbon", "Rome", "Yokohama", "Florence", "Prague", "Málaga", "Eindhoven", "Rotterdam", "Marseille", "Nice", "Osaka", "Valencia", "Warsaw", "Tallinn", "Budapest", "Ljubljana", "Vilnius", "Bilbao", "Bratislava", "Riga", "Montevideo", "Santiago", "Athens", "Zagreb", "Porto", "Wroclaw", "Sofia", "Bucharest", "Bordeaux", "Zaragoza", "Den Haag", "Santander", "Seville", "Torino", "Nagoya", "San José", "Lille"],
  4: ["Tbilisi", "Wuhan", "Suzhou", "Santo Domingo"],
  5: ["San Francisco", "Boston", "New York City", "Washington, D.C.", "Chicago", "Seattle", "Los Angeles", "Baltimore", "Philadelphia", "Dallas", "Phoenix", "Houston", "Hong Kong", "Atlanta", "Miami", "Dubai", "Abu Dhabi", "Tel Aviv", "Jerusalem", "Doha", "Kuwait City", "Riyadh", "Denver", "Las Vegas", "Kansas City", "Honolulu", "Manama"]
};

const getCityCoordinates = async (cityName) => {
  const encodedCityName = encodeURIComponent(cityName);
  const url = `https://nominatim.openstreetmap.org/search?city=${encodedCityName}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error('No coordinates found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

const getCityNamesByClusterAndYear = (clusterNumber, year) => {
  return cityClusters[clusterNumber];
};

const getClusterCoordinates = async (clusterNumber, year) => {
  const cityNames = getCityNamesByClusterAndYear(clusterNumber, year);
  const cityCoordinates = [];

  for (const cityName of cityNames) {
    const coordinates = await getCityCoordinates(cityName);
    if (coordinates) {
      cityCoordinates.push({ name: cityName, coordinates: [coordinates.lon, coordinates.lat] });
    }
  }

  return cityCoordinates;
};

const MapChart = ({ clusterNumber, year }) => {
  const [markers, setMarkers] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = await getClusterCoordinates(clusterNumber, year);
      setMarkers(coordinates);
    };

    fetchCoordinates();
  }, [clusterNumber, year]);

  return (
    <div style={{ width: '50%', height: 'auto', padding: 0, margin: 0 }}> {/* Ajusta el tamaño del contenedor */}
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 100
        }}
        style={{ width: '100%', height: 'auto' }} 
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#EAEAEC", // Color de las partes del mapa
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53", // Color al pasar el ratón por encima
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42", // Color al hacer clic
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
        
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="1.5" // Reducción del ancho del trazo
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-6, -12)" // Reducción del tamaño del círculo
              onMouseEnter={() => setHoveredCity(name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <circle cx="6" cy="6" r="2" /> {/* Reducción del radio del círculo */}
              <path d="M6 14.7C9.15 11.5 10 9 10 7a4 4 0 1 0-8 0c0 2 1.85 4.5 4 7.7z" />
            </g>
            {hoveredCity === name && (
              <text
                textAnchor="middle"
                y={-30}
                style={{ fontFamily: "system-ui", fill: "#FFFFFF" }}
              >
                {name}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;