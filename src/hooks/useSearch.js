import { useState } from 'react';

function useSearch(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleInput({ target }) {
    setValue(target.value);
  }
  return ({
    value,
    onChange: handleInput,
  });
}

export default useSearch;
