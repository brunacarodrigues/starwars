import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const dataPlanets = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const { fetchResults } = useFetch();
  const [options, setOptions] = useState(dataPlanets);
  const [select, setSelect] = useState(options[0]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
      setFilter(fetch);
    };
    fetchPlanets();
  }, []); // remover regra para ignorar reackt-hooks ou não???

  const changeFilter = ({ target: { value } }) => {
    setSelect(value);
  };

  const filterSearchs = (name) => {
    const filterResults = planets.filter((planet) => (
      planet.name.includes(name)
    ));
    setFilter(filterResults);
  };

  // lógica para filtrar planetas pelos campos de seleção e input

  const filterColumns = (column, operator, number) => {
    if (operator === 'menor que') {
      const result = filter.filter((planet) => (
        Number(planet[column]) < Number(number)
      ));
      setFilter(result);
    }
    if (operator === 'maior que') {
      const result = filter.filter((planet) => (
        Number(planet[column]) > Number(number)
      ));
      setFilter(result);
    }
    if (operator === 'igual a') {
      const result = filter.filter((planet) => (
        Number(planet[column]) === Number(number)
      ));
      setFilter(result);
    }
  };

  const resultsFilter = (option) => {
    const newOptions = options.filter((op) => (op !== option));
    setOptions(newOptions);
    setSelect(newOptions[0]);
  };

  const values = useMemo(() => ({
    planets,
    filter,
    filterSearchs,
    filterColumns,
    options,
    select,
    resultsFilter,
    changeFilter,
  }), [planets, filter, options, select]); // remover regra para ignorar reackt-hooks ou não???

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
