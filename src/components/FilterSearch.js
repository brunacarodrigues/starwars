import React, { useEffect, useContext } from 'react';
import useSearch from '../hooks/useSearch';
import planetsContext from '../context/PlanetsContext';

function FilterSearch() {
  const input = useSearch('');
  const { filterSearchs } = useContext(planetsContext);

  useEffect(() => {
    filterSearchs(input.value);
  }, [input.value]);

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="planeta"
      value={ input.value }
      onChange={ input.onChange }
    />
  );
}

export default FilterSearch;
