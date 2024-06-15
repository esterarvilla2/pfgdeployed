import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const dimensionColors = {
  Economy: '#e63946', // Red
  Environment: '#2a9d8f', // Teal
  Cultural: '#f4a261', // Orange
  Governance: '#ea899a', // Pinkish Blue
  Readiness: '#00694C', // Green
  Exposure: '#cb3234', // Red
};

const getIndexForDimension = (data, dimension) => {
  if (!data) return { value: null, color: '#000' };
  const dimensionKey = `${dimension}1`;
  const value = parseFloat(data[dimensionKey]);
  return { value, color: dimensionColors[dimension] || '#000' };
};

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    height: '100%',
    minHeight: '75px',
    margin: '10px',
    boxSizing: 'border-box',
  },
  indexCircle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  cityName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  improvementSymbol: {
    fontSize: '1.2rem',
    marginLeft: '10px',
  },
});


const GridCities = ({ cityName, cityInstances, dimension, year = '2023', classes }) => {
  const currentYear = year;
  const lastYear = (parseInt(year) - 1);

  const cityCurrentYear = cityInstances.find(d => d.Year === currentYear && d.City === cityName);
  const cityLastYear = cityInstances.find(d => d.Year === lastYear && d.City === cityName);

  console.log(`City: ${cityName}, Current Year: ${currentYear}, Last Year: ${lastYear}`);
  console.log(`Data for Current Year:`, cityCurrentYear);
  console.log(`Data for Last Year:`, cityLastYear);

  const { value: indexForCurrentYear, color } = getIndexForDimension(cityCurrentYear, dimension);
  const { value: indexForLastYear } = getIndexForDimension(cityLastYear, dimension);

  console.log(`Index for Current Year: ${indexForCurrentYear}, Index for Last Year: ${indexForLastYear}`);

  const improvementSymbol = indexForCurrentYear !== null && indexForLastYear !== null
    ? (indexForCurrentYear > indexForLastYear ? <img src={'profits_189285.png'} alt="Decrease" style={{ width: '40px', height: '4sa0px' }} /> : (indexForCurrentYear < indexForLastYear ? '↘️' : ''))
    : 'N/A';
  console.log(`Improvement Symbol for ${cityName}: ${improvementSymbol}`);

  return (
    <Card className={classes.card}>
      <div className={classes.indexCircle} style={{ backgroundColor: color }}>
        {indexForCurrentYear !== null ? Math.round(indexForCurrentYear) : 'N/A'}
      </div>
      <CardContent>
        <Typography variant="h6" className={classes.cityName}>
          {cityName}
          <span className={classes.improvementSymbol}>{improvementSymbol !== 'N/A' ? improvementSymbol : ''}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

const CityCardGrid = ({ cityInstances, dimension, year = '2023' }) => {
  const classes = useStyles();

  const filteredCities = cityInstances.filter(instance => instance.Year === year);

  const sortedCities = filteredCities.sort((a, b) => {
    const { value: indexA } = getIndexForDimension(a, dimension);
    const { value: indexB } = getIndexForDimension(b, dimension);
    return  indexA- indexB;  // Assume descending order to get top cities
  }).slice(0, 50);  // Only take the top 50

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {sortedCities.map((city, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <GridCities cityName={city.City} cityInstances={cityInstances} dimension={dimension} year={year} classes={classes} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CityCardGrid;
