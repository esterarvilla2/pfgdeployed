// Sidebar.js
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Sidebar = ({ onCityChange }) => {
  // Aquí iría tu lógica para cargar las ciudades y otros elementos del menú
  
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {/* Los ListItem pueden ser más complejos y manejar eventos onClick */}
        <ListItem button onClick={() => onCityChange('Ciudad X')}>
          CIUDADES
        </ListItem>
        <ListItem button onClick={() => onCityChange('Ciudad X')}>
          INDICE
        </ListItem>
        <ListItem button onClick={() => onCityChange('Ciudad X')}>
          CLUSTERS
        </ListItem>
        {/* Repetir para cada elemento del menú */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
