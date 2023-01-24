import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const { fetchResults } = useFetch();

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
      setFilter(fetch);
    };
    fetchPlanets();
  }, []);

  const filterSearchs = (name) => {
    const filterResults = planets.filter((planet) => (
      planet.name.includes(name)
    ));
    setFilter(filterResults);
  };

  const values = useMemo(() => ({
    planets, filter, filterSearchs,
  }), [planets, filter]);

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
