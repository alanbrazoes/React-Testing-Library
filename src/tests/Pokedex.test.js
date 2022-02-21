import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests Pokédex page.', () => {
  const pokeTest = 'pokemon-type';

  test('Should have \'Encountered pokémons\'.', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    })).toBeInTheDocument();
  });

  test('Only one pokémon on the screen.', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const namePoke = queryAllByTestId('pokemon-name');

    expect(namePoke.length).toBe(1);
  });

  describe('Render next pokémon when click in button.', () => {
    test('Button content \'Próximo pokémon\'.', () => {
      const { getByRole } = renderWithRouter(<App />);
      const button = getByRole('button', { name: /Próximo pokémon/ });

      expect(button).toBeInTheDocument();
    });

    test('Render next pokémon.', () => {
      const { getByRole, queryByText } = renderWithRouter(<App />);
      const button = getByRole('button', { name: /Próximo pokémon/ });
      userEvent.click(button);

      expect(queryByText('Pikachu')).not.toBeInTheDocument();
    });

    test('Render first pokémon, if it\'s in the last pokemon.', () => {
      const { getByRole, queryByText } = renderWithRouter(<App />);
      const button = getByRole('button', { name: /Próximo pokémon/ });

      pokemons.forEach(() => userEvent.click(button));

      expect(queryByText('Pikachu')).toBeInTheDocument();
    });
  });

  describe('Should have filter buttons.', () => {
    const types = [
      'All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];

    test('Only one button for each type.', () => {
      const { queryAllByRole, queryAllByTestId } = renderWithRouter(<App />);
      const buttonType = queryAllByTestId('pokemon-type-button');

      expect(buttonType.length > 1).toBeTruthy();

      types.forEach((type) => {
        const button = queryAllByRole('button', { name: type });
        expect(button.length).toBe(1);
      });
    });

    test('when you click on a type of button appear only that type of pokemons.', () => {
      const { queryByRole, getByTestId } = renderWithRouter(<App />);
      const button = queryByRole('button', { name: /fire/i });
      const nextPoke = queryByRole('button', { name: /próximo pokémon/i });
      const texts = getByTestId(pokeTest);

      userEvent.click(button);
      expect(nextPoke).not.toBeDisabled();
      expect(texts.innerHTML).toBe('Fire');

      pokemons.forEach(() => {
        userEvent.click(nextPoke);
        expect(nextPoke).not.toBeDisabled();
        expect(texts.innerHTML).toBe('Fire');
      });
    });

    test('Should have \'All\' button.', () => {
      const { getByRole } = renderWithRouter(<App />);
      const buttonAll = getByRole('button', { name: /all/i });

      expect(buttonAll).toBeInTheDocument();
    });
  });

  describe('Should have reset button.', () => {
    test('Should show pokémons without filters.', () => {
      const { queryByRole, queryByTestId } = renderWithRouter(<App />);
      const buttonFire = queryByRole('button', { name: /fire/i });
      const buttonReset = queryByRole('button', { name: /all/i });

      userEvent.click(buttonFire);
      userEvent.click(buttonReset);

      pokemons.forEach(({ type }) => {
        const types = queryByTestId(pokeTest);
        if (type !== 'Fire') {
          expect(types !== 'Fire').toBeTruthy();
        }
      });
    });

    test('When render Pokédex, the type \'All\' is selected?', () => {
      const { queryByRole, getByTestId } = renderWithRouter(<App />);
      const nextPoke = queryByRole('button', { name: /próximo pokémon/i });

      pokemons.forEach(({ type }) => {
        const pokeType = getByTestId(pokeTest);
        expect(pokeType.innerHTML).toBe(type);
        userEvent.click(nextPoke);
      });
    });
  });
});
