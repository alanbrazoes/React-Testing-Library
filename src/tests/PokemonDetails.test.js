import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests pokemon details.', () => {
  test('', () => {
    const { getByText, queryByRole } = renderWithRouter(<App />);
    const link = queryByRole('link', { name: /more details/i });

    userEvent.click(link);
    const description = queryByRole('heading', { name: /summary/i, level: 2 });
    const name = getByText(/pikachu details/i);
    const paragraph = getByText(
      /This intelligent Pokémon roasts hard berries/i,
    );

    expect(link).not.toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('', () => {
    const { queryByText, queryAllByRole, getByText, queryByRole } = renderWithRouter(
      <App />,
    );
    const link = queryByRole('link', { name: /more details/i });

    userEvent.click(link);
    expect(queryByRole('heading', { name: 'Pikachu Details' }));

    const heading = getByText(/Game Locations of Pikachu/i);
    const habitat = queryByText('Kanto Viridian Forest');
    const img = queryAllByRole('img', { name: /pikachu/i });
    const habitat2 = queryByText('Kanto Power Plant');

    expect(heading).toBeInTheDocument();
    expect(habitat).toBeInTheDocument();
    expect(habitat2).toBeInTheDocument();
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[1].alt).toBe('Pikachu location');
    expect(img[2].alt).toBe('Pikachu location');
  });

  test('', () => {
    const { queryByRole, queryByLabelText } = renderWithRouter(<App />);

    const link = queryByRole('link', { name: /more details/i });

    userEvent.click(link);

    const favoriteField = queryByLabelText('Pokémon favoritado?');
    expect(favoriteField).toBeInTheDocument();
    expect(queryByRole('heading', { name: 'Pikachu Details' }));

    userEvent.click(favoriteField);
    const img = queryByRole('img', { name: /pikachu is marked as favorite/i });

    expect(img).toBeInTheDocument();
    userEvent.click(favoriteField);
    expect(img).not.toBeInTheDocument();
  });
});
