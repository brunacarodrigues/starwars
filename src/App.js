import React from 'react';
import './App.css';
import FilterSearch from './components/FilterSearch';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <FilterSearch />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
