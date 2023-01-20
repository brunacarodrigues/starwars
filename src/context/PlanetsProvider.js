import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const { fetchResults } = useFetch();

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
    };
    fetchPlanets();
  }, []);

  const values = useMemo(() => ({
    planets,
  }), [planets]);

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
