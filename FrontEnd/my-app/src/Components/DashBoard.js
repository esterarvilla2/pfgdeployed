import React, { useState, useEffect } from 'react'; 
import 'chart.js/auto';
import { Grid, Paper, MenuList, MenuItem, Button, FormControl, Select, AppBar, Toolbar, Typography, MenuItem as FormMenuItem } from '@material-ui/core';
import LineCharts from './Graphs/LineCharts.js';
import MapChart from './Graphs/MapChart.js';
import CityIndexTable from './Graphs/IndexTable.js';
import ScatterChart from './Graphs/HeatMap.js';
import RadarChart from './Graphs/RadarChart.js';
import CityCardGrid from './Graphs/InteractiveIndexTable.js';
import './css/dashboard.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  indexControls: {
    display: 'flex',
    flexDirection: 'row', // Ajusta los elementos en fila para ocupar el ancho completo
    gap: theme.spacing(1), // Espacio entre botones y select
    marginBottom: theme.spacing(2) // Margen en la parte inferior del contenedor
  },
  button: {
    flex: 1, // Permite que cada botón crezca y llene el espacio
    fontSize: '1.2rem', // Aumenta el tamaño de la fuente para mejor legibilidad
    height: 48, // Altura del botón
    color: 'white',
    backgroundColor: '#555', // Establece un color de fondo oscuro
    '&:hover': {
      backgroundColor: '#333' // Cambia de color al pasar el mouse
    }
  },
  selectControl: {
    color: 'white',
    backgroundColor: '#555',
    '& .MuiInputBase-root': {
      color: 'white', // Asegura que el texto sea blanco
      backgroundColor: '#555', // Fondo oscuro para el select
      fontSize: '1.2rem', // Aumenta el tamaño de la fuente para mejor legibilidad
      height: 48 // Alinea la altura con los botones
    }
  },
  chartContainer: {
    margin: theme.spacing(8), // Añadir margen alrededor de cada gráfico
  },
  toolbar: {
    minHeight: 'auto', 
    padding: '10px', 
    backgroundColor: '#444',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cityTitle: {
    flexGrow: 1, 
    color: 'white', 
    padding: '10px 20px', 
    borderRadius: '4px', 
    fontWeight: 'bold',
    fontSize: '2rem' // Aumentar tamaño de la fuente
  },
  selectFormControl: {
    marginLeft: '20px', 
    width: '300px', 
    height: '50px',
    borderRadius: '4px', 
    border: '1px solid #ccc', 
    overflow: 'hidden',
    '& .MuiSelect-select': {
      color: 'white',
      backgroundColor: '#555',
      borderBottom: '1px solid #ccc',
      padding: '10px',
      '&:focus': {
        backgroundColor: '#666', // Cambia el color al hacer foco
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#aaa',
    },
  }
}));


const DashBoard = ({ cityData }) => {
  const classes = useStyles();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeMenu, setActiveMenu] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('Index2');
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const uniqueCities = [...new Set(cityData.map(item => item.City))];
  const uniqueYears = [...new Set(cityData.map(item => item.Year))];
  const dimensions = ['Environment', 'Economy', 'Cultural', 'Governance', 'Exposure', 'Readiness'];
  const [clusterNumber, setClusterNumber] = useState(1);
  const year = 2023;
  const handleMenuItemClick = (menu) => setActiveMenu(menu);

  useEffect(() => {
    if (selectedCity) {
      const fetchCityData = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(selectedCity)}&format=json`);
          const data = await response.json();
          if (data && data.length > 0) {
            setCityCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else {
            throw new Error('No coordinates found');
          }
        } catch (error) {
          console.error('Failed to fetch city coordinates:', error);
          setCityCoordinates(null);
        }
      };

      fetchCityData();
    }
  }, [selectedCity]);

  const YearSelector = ({ selectedYear, setSelectedYear, uniqueYears }) => (
    <FormControl fullWidth margin="normal">
      <Select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Year' }}
      >
        <MenuItem value="">
          <em>Select a Year</em>
        </MenuItem>
        {uniqueYears.map(year => (
          <MenuItem key={year} value={year}>{year}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'ciudades':
        return renderCities();
      case 'indice':
        return renderIndices();
      case 'clusters':
        return renderClusters();
      default:
        return <div>Select an option from the menu.</div>;
    }
  };


  const renderCities = () => (
    <React.Fragment>
      <div className="resiliencia__categoria" style={{ backgroundColor: '#333' }}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" className={classes.cityTitle}>
            {selectedCity || "Select a City"}
          </Typography>
          <FormControl className={classes.selectFormControl}>
            <Select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                <em>Select a City</em>
              </MenuItem>
              {uniqueCities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>

        <Grid container spacing={2}>
          {[0, 1, 2, 3].map((type) => (
            <Grid item xs={12} md={3} key={type}>
              <LineCharts cityData={cityData} cityName={selectedCity} type={type} />
            </Grid>
          ))}
        </Grid>
        
        <Grid container spacing={2} justifyContent="center" alignItems="center" >
          <Grid item xs={8} md={3} className={classes.chartContainer}>
            <CityIndexTable cityName={selectedCity} cityInstances={cityData} />
          </Grid>
          <Grid item xs={8} md={3} className={classes.chartContainer}>
            <ScatterChart cityData={cityData} cityName={selectedCity} />
          </Grid>
          <Grid item xs={8} md={3} className={classes.chartContainer}>
            <RadarChart cityData={cityData} cityName={selectedCity} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );



  const renderIndices = () => {
    return (
      <React.Fragment>
        <div className="resiliencia__categoria" style={{ backgroundColor: '#333' }}>
          <Typography variant="h6" className="index-title">
            Explora los índices de cada dimensión
          </Typography>
          <div className={classes.indexControls}>
            {dimensions.map(dimension => (
              <Button
                key={dimension}
                onClick={() => setSelectedDimension(dimension)}
                className={classes.button}
              >
                {dimension}
              </Button>
            ))}
            <FormControl className={classes.selectControl} margin="normal">
              <Select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select a Year</em>
                </MenuItem>
                {uniqueYears.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
          </div>
          
          {selectedDimension && selectedYear && (
            <React.Fragment>
              <div className="index-header">
                <Typography variant="h6">
                  {`${selectedDimension} Index ${selectedYear}`}
                </Typography>
              </div>
              <CityCardGrid cityInstances={cityData} dimension={selectedDimension} year={selectedYear} />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  };

  const renderClusters = () => (
    <React.Fragment>
      <div className="resiliencia__categoria" style={{ backgroundColor: '#333', color: 'white', padding: '20px' }}>
        <Typography variant="h6" className="index-title" style={{ color: 'white' }}>
          Cluster data visualization or analysis will be here.
        </Typography>
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6" style={{ color: 'white' }}>
            Select a Cluster
          </Typography>
          <FormControl className={classes.selectFormControl}>
            <Select
              value={clusterNumber}
              onChange={e => setClusterNumber(Number(e.target.value))}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Cluster' }}
            >
              <MenuItem value={1}>Cluster 1</MenuItem>
              <MenuItem value={2}>Cluster 2</MenuItem>
              <MenuItem value={3}>Cluster 3</MenuItem>
              <MenuItem value={4}>Cluster 4</MenuItem>
              <MenuItem value={5}>Cluster 5</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <MapChart clusterNumber={clusterNumber} year={year} />
        </div>
      </div>
    </React.Fragment>
  );
  return (
    <div  className="resiliencia">
    <h1 className="resiliencia__titulo">DashBoard</h1>
      <Grid>
      <Grid container direction="row" spacing={2} justifyContent= "center" >
            <Grid item>
              <Button
                fullWidth
                className="menu-button"
                onClick={() => handleMenuItemClick('ciudades')}
              >
                <h2 className="dashboard__titulo-menu">Ciudades</h2>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                className="menu-button"
                onClick={() => handleMenuItemClick('indice')}
              >
                <h2 className="dashboard__titulo--menu">Índices</h2>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                className="menu-button"
                onClick={() => handleMenuItemClick('clusters')}
              >
                <h2 className="dashboard__titulo--menu">Clusters</h2>
              </Button>
            </Grid>
          </Grid>
      </Grid>
        <Paper>
          {renderContent()}
        </Paper>
    </div>
  );
};

export default DashBoard;

{/* <div>
            <select onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select a City</option>
                {uniqueCities.map(City => (
                    <option key={City} value={City}>{City}</option>
                ))}
            </select>
            <select onChange={e => setSelectedYear(e.target.value)} value={selectedYear}>
                <option value="">Select a Year</option>
                {uniqueYears.map(Year => (
                    <option key={Year} value={Year}>{Year}</option>
                ))}
            </select>
            console.log(chartData)
            {filteredData && (
                <div style={{ height: '400px', width: '400px' }}>
                <PolarArea data={chartData} options={chartOptions} />
              </div>
            )}
        </div> 
      
      */}
