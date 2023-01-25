import React from 'react';
import './App.css';
import FilterColumns from './components/FilterColumns';
import FilterSearch from './components/FilterSearch';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <FilterSearch />
      <FilterColumns />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
