import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Tests About page.', () => {
  test('Should have "About" information.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Should have title "About Pokédex".', () => {
    const { queryByRole } = renderWithRouter(<About />);
    const title = queryByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  test('Should have two paragraphs.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  test('Should have image pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /pokédex/i });

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
