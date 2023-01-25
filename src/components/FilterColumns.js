import React, { useState, useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function FilterColumns() {
  const { filterColumns } = useContext(planetsContext);
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);

  const selectClick = () => {
    filterColumns(column, operator, number);
  };

  return (
    <label htmlFor="filter-select-planets">
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target: { value } }) => setColumn(value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ operator }
        onChange={ ({ target: { value } }) => setOperator(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ number }
        onChange={ ({ target: { value } }) => setNumber(value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ selectClick }
      >
        Filtrar
      </button>
    </label>
  );
}

export default FilterColumns;
