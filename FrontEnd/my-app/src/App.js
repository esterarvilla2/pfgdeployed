
import React, { useState, useEffect } from 'react';
import { utils, read } from 'xlsx';
import Header from './Components/Header';
import Resiliencia from './Components/resiliencia';
import DashBoard from './Components/DashBoard';

class CityData {
  constructor(data) {
    Object.assign(this, data);
  }
}

const App = () => {
  const someData = {
    name: "Resilencia Urbana",
    description: "Explorando la capacidad de las ciudades..."
  };
  const [cityInstances, setCityInstances] = useState([]);

  useEffect(() => {
    const readExcelAndCreateInstances = async () => {
      try {
        const filePath = `${process.env.PUBLIC_URL}/DatosWeb.xlsx`; // Excel file in public directory
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer, {type: 'buffer'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(sheet);
        const instances = data.map(item => new CityData(item));
        setCityInstances(instances);
      } catch (error) {
        console.error('Error reading or parsing the Excel file:', error);
      }
    };

    readExcelAndCreateInstances();
  }, []);

  return (
    <div className="App">
      <Header data={someData} />
      <Resiliencia/>
      <DashBoard cityData={cityInstances} />
    </div>
  );
};

export default App;
