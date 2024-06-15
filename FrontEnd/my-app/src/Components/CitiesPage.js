import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; // Componente de menú lateral que tienes que crear
import LineCharts from './components/LineCharts'; // Componente para los gráficos de líneas que tienes que crear
import CityMap from './components/CityMap'; // Componente para el mapa que tienes que crear
import Heatmap from './components/Heatmap'; // Componente para el mapa de calor que tienes que crear
import { Grid } from '@material-ui/core'; // Usa un Grid de Material-UI para la disposición

const GraphicsPage = () => {
    const [selectedCity, setSelectedCity] = useState('');

    // Función que actualiza la ciudad seleccionada
    const handleCityChange = (city) => {
        setSelectedCity(city);
    };

    return (
        <div>
            <Sidebar onCityChange={handleCityChange} />
            <select onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select a City</option>
                {uniqueCities.map(City => (
                    <option key={City} value={City}>{City}</option>
                ))}
            </select>
            
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>{selectedCity}</h1>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LineCharts city={selectedCity} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CityMap city={selectedCity} />
                </Grid>
                <Grid item xs={12}>
                    <Heatmap city={selectedCity} />
                </Grid>
            </Grid>
        </div>
    );
};

export default GraphicsPage;
