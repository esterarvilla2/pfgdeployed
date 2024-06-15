import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    backgroundColor: '#333', // Color de fondo gris oscuro
    color: 'white', // Texto en color blanco
    [theme.breakpoints.down('sm')]: { // Ajustes para dispositivos pequeños
      width: '100%', // Ancho completo en dispositivos pequeños
    }
  },
  cell: {
    color: 'white', // Asegura que el texto de cada celda sea blanco
    fontSize: '1.2rem', // Aumenta el tamaño de la fuente para las celdas
  },
  title: {
    padding: theme.spacing(2), // Espacio alrededor del título
    color: 'white', // Color del texto
    backgroundColor: '#555', // Fondo ligeramente más claro para el título
    fontSize: '1.4rem', // Aumenta el tamaño de la fuente para el título
  },
  table: {
    minWidth: 650, // Ancho mínimo para grandes pantallas
    [theme.breakpoints.down('sm')]: { // Ajustes para dispositivos pequeños
      minWidth: 300, // Ancho mínimo para pantallas pequeñas
    }
  }
}));

const CityIndexTable = ({ cityName, cityInstances }) => {
  const classes = useStyles();
  const cityData = cityInstances
    .filter(instance => instance.City === cityName)
    .sort((a, b) => a.Year - b.Year); // Ordenar por año ascendente

  const getDifferenceIcon = (currentIndex, previousIndex) => {
    if (previousIndex === null) return ''; // No icon for the first year
    const diff = currentIndex - previousIndex;
    if (diff > 0) {
      return '🔻'; // Up icon
    } else if (diff < 0) {
      return '🔺'; // Down icon
    }
    return ''; // No change
  };

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Evolution of the Resiliency Index
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Year</TableCell>
              <TableCell align="right" className={classes.cell}>Index</TableCell>
              <TableCell align="right" className={classes.cell}>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cityData.map((data, index) => {
              const previousYearIndex = index > 0 ? cityData[index - 1].Index2 : null;
              return (
                <TableRow key={data.Year}>
                  <TableCell className={classes.cell}>{data.Year}</TableCell>
                  <TableCell align="right" className={classes.cell}>{data.Index2}</TableCell>
                  <TableCell align="right" className={classes.cell}>
                    {getDifferenceIcon(data.Index2, previousYearIndex)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CityIndexTable;
