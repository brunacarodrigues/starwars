import React, { useState, useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function FilterColumns() {
  const {
    filterColumns,
    options,
    resultsFilter,
    select,
    changeFilter,
  } = useContext(planetsContext);
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);

  const selectClick = () => {
    filterColumns(select, operator, number);
    resultsFilter(select);
  };

  const renderOptions = () => options.map((opt) => (
    <option key={ opt } value={ opt }>{ opt }</option>
  ));

  return (
    <label htmlFor="filter-select-planets">
      <select
        data-testid="column-filter"
        value={ select }
        onChange={ changeFilter }
      >
        { renderOptions() }
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
