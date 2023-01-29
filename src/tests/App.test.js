import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';

describe('Inicie a aplicação e...', () =>  {
  test('se todos os elementos iniciais são renderizados na tela', () => {
    render(<App />);
    const nameFilter = screen.getByTestId("name-filter");
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });
  //   test('', () => {
    
  // });
});

