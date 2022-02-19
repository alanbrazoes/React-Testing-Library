import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente App.js', () => {
  describe('Render Links on the screen', () => {
    test('Link Home', () => {
      const { queryByRole } = renderWithRouter(<App />);
      const linkHome = queryByRole('link', { name: /Home/ });
      expect(linkHome).toBeInTheDocument();
    });

    test('Link About', () => {
      const { queryByRole } = renderWithRouter(<App />);
      const linkAbout = queryByRole('link', { name: /About/ });
      expect(linkAbout).toBeInTheDocument();
    });

    test('Link Favorite Pokémons', () => {
      const { queryByRole } = renderWithRouter(<App />);
      const linkFavorites = queryByRole('link', { name: /Favorite Pokémons/ });
      expect(linkFavorites).toBeInTheDocument();
    });
  });

  test('Home Link redirect to "/".', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const title = getByText(/Encountered pokémons/);

    expect(pathname).toBe('/');
    expect(title).toBeInTheDocument();
  });

  test('About Link redirect to "/about".', () => {
    const { history, queryByRole } = renderWithRouter(<App />);

    const linkAbout = queryByRole('link', { name: /About/ });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    const title = queryByRole('heading', { name: /About Pokédex/, level: 2 });

    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  test('Favorite Link redirect to "/favorite".', () => {
    const { history, queryByRole } = renderWithRouter(<App />);

    const linkFavorite = queryByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    const title = queryByRole('heading', { name: /Favorite pokémons/i, level: 2 });

    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  test('Redirect to "/notFound" if you enter an unknown url.', () => {
    const { history, queryByText } = renderWithRouter(<App />);
    history.push('/xablau');
    expect(queryByText(/Page requested not found/i)).toBeTruthy();
  });
});
