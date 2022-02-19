import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tests Favorite page.', () => {
  test(
    'Case haven\'t favorite pokémons, render on the screen \'No favorite pokemon found\'',
    () => {
      const { queryByText } = renderWithRouter(<FavoritePokemons />);
      const text = queryByText(/No favorite pokemon found/i);

      expect(text).toBeInTheDocument();
    },
  );

  test('Case have favorite pokémon, render the pokemon in page \'Favorite\'.', () => {
    const { queryByText, queryByRole } = renderWithRouter(<App />);
    const moreDetails = queryByText(/more details/i);

    userEvent.click(moreDetails);
    const input = queryByRole('checkbox');
    userEvent.click(input);

    const favorites = queryByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorites);

    expect(queryByText('No favorite pokemon found')).not.toBeInTheDocument();
  });
});
