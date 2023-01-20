import apiPlanets from '../services/APIPlanets';

const useFetch = () => {
  const fetchResults = async () => {
    const results = await apiPlanets();
    results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    return results;
  };
  return { fetchResults };
};

export default useFetch;
