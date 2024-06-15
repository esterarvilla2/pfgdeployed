import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';

const CityCard = ({ city, index, change, cluster }) => {
  const getChangeColor = (change) => {
    if (change > 0) return 'green';
    if (change < 0) return 'red';
    return 'black';
  };

  const clusterClass = `cluster-${cluster}`;

  return (
    <Card className="city-card">
      <Grid container direction="column">
        <Grid item className="index-box">
          {Math.floor(index)}
        </Grid>
        <Grid item className="city-name">
          {city}
        </Grid>
        <Grid item style={{ color: getChangeColor(change) }} className="change-indicator">
          {change > 0 ? `↑ ${change}` : change < 0 ? `↓ ${Math.abs(change)}` : `→ ${change}`}
        </Grid>
        <Grid item className={`cluster-bar ${clusterClass}`} />
      </Grid>
    </Card>
  );
};

export default CityCard;