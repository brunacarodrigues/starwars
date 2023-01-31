import React, { useState, useContext, useEffect } from 'react';
import planetsContext from '../context/PlanetsContext';

function FilterColumns() {
  const {
    filterColumns,
    options,
    setOptions,
    resultsFilter,
    select,
    changeFilter,
    deleteFilters,
    filter,
    setFilter,
    planets,
  } = useContext(planetsContext);
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [categoryUsed, setCategoryUsed] = useState([]);

  useEffect(() => {
    console.log('delete');
    if (categoryUsed.length >= 1) {
      categoryUsed.forEach((element) => {
        if (element.operator === 'igual a') {
          console.log(element.operator, element.number);
          const filterPlanets = filter
            .filter((planet) => planet[element.select] === element.number);
          setFilter(filterPlanets);
        } if (element.operator === 'maior que') {
          const filterPlanets = filter
            .filter((planet) => Number(planet[element.select]) > element.number);
          setFilter(filterPlanets);
        } if (element.operator === 'menor que') {
          const filterPlanets = filter
            .filter((planet) => Number(planet[element.select]) < element.number);
          setFilter(filterPlanets);
        }
      });
    } else {
      setFilter(planets);
    }
  }, [categoryUsed]);

  const selectClick = () => {
    setCategoryUsed([...categoryUsed,
      { select, operator, number }]);
    filterColumns(select, operator, number);
    resultsFilter(select);
  };

  const deleteClick = ({ target }) => {
    setFilter(planets);
    const newCategory = categoryUsed
      .filter((category) => category.select !== target.value);
    console.log('estado', newCategory);
    setCategoryUsed(newCategory);
    setOptions([...options, target.value]);
  };

  return (
    <label htmlFor="filter-select-planets">
      <select
        data-testid="column-filter"
        value={ select }
        onChange={ changeFilter }
      >
        { options.map((opt) => (
          <option key={ opt } value={ opt }>{ opt }</option>)) }
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
      { categoryUsed.map((category, index) => (
        <p data-testid="filter" key={ index }>
          {category.select}
          <button
            type="button"
            value={ category.select }
            onClick={ deleteClick }
          >
            Apagar
          </button>
        </p>
      )) }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteFilters }
      >
        Remover Filtros
      </button>
    </label>
  );
}

export default FilterColumns;
