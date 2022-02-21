import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests component pokémon.', () => {
  test('Render Pokemon data correctly.', () => {
    const { getByTestId, queryByRole } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const img = queryByRole('img', { name: /pikachu sprite/i });

    expect(name.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toBeInTheDocument();
  });

  test('Redirect to pokemon link.', () => {
    const { queryByRole, history } = renderWithRouter(<App />);
    const link = queryByRole('link', { name: /more details/i });

    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Should have favorite icon.', () => {
    const { queryByRole } = renderWithRouter(<App />);
    const moreDetails = queryByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const favorite = queryByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const icon = queryByRole('img', { name: /Pikachu is marked as favorite/i });

    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });
});
