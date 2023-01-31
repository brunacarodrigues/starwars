import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Inicie a aplicação e...', () =>  {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });
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
  test('se o filtro por nome é realizado corretamente', async () => {
    render(<App />);
  
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-container')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
  
    const name = screen.getByTestId('name-filter');
    userEvent.type(name, 'Tatooine');
    const planetContainer = await screen.findByTestId('planet-container');
    expect(planetContainer).toHaveTextContent('Tatooine');
    userEvent.clear(name);
  
    userEvent.type(name, 'Hoth');
    const planetContainer2 = await screen.findByTestId('planet-container');
    expect(planetContainer2).toHaveTextContent('Hoth');
  });
    test('se o button é renderizado corretamente', async() => {
      render(<App />);
  
      const planet = await screen.findByRole('cell', {
        name: /tatooine/i
      });
  
      const buttonFilter = screen.getByRole('button', {
        name: /filtrar/i
      })
  
      userEvent.selectOptions(screen.getByTestId('column-filter'), 'population')
      expect(screen.getByTestId('column-filter').value).toBe('population');
  
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
      expect(screen.getByTestId('comparison-filter').value).toBe('maior que');
  
      userEvent.clear(screen.getByTestId('value-filter'))
      userEvent.type(screen.getByTestId('value-filter'), '30000')
      expect(screen.getByTestId('value-filter').value).toBe('30000');
    });
    test('se o filtro MENOR QUE funciona corretamente', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByTestId('planet-container')[0]).toBeInTheDocument();
      }, { timeout: 3000 });
  
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const btnFilter = screen.getByTestId('button-filter');
  
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '1000000');
      userEvent.click(btnFilter);
  
      const planets = screen.getAllByTestId('planet-container');
      expect(planets).toHaveLength(2);
      expect(planets[0]).toHaveTextContent('Tatooine');
    });
    test('se o filtro MAIOR QUE funciona corretamente', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByTestId('planet-container')[0]).toBeInTheDocument();
      }, { timeout: 3000 });
  
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const btnFilter = screen.getByTestId('button-filter');
  
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '1000000');
      userEvent.click(btnFilter);
  
      const planets = screen.getAllByTestId('planet-container');
      expect(planets).toHaveLength(6);
      expect(planets[5]).toHaveTextContent('Kamino');
    });
    test('se o filtro IGUAL A funciona corretamente', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByTestId('planet-container')[0]).toBeInTheDocument();
      }, { timeout: 3000 });
  
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const btnFilter = screen.getByTestId('button-filter');
  
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(valueFilter, '1000');
      userEvent.click(btnFilter);
  
      const planets = screen.getAllByTestId('planet-container');
      expect(planets).toHaveLength(1);
      expect(planets[0]).toHaveTextContent('Yavin IV');
    });
  });
