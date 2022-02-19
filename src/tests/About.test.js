import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente App.js', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { queryByRole } = renderWithRouter(<App />);
    const linkHome = queryByRole('link', { name: /Home/ });
    const linkAbout = queryByRole('link', { name: /About/ });
    const linkFavorites = queryByRole('link', { name: /Favorite Pokémons/ });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  test('Link Home redireciona para /.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const title = getByText(/Encountered pokémons/);

    expect(pathname).toBe('/');
    expect(title).toBeInTheDocument();
  });

  test('Link About redireciona para /about.', () => {
    const { history, queryByRole } = renderWithRouter(<App />);

    const linkAbout = queryByRole('link', { name: /About/ });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    const title = queryByRole('heading', { name: /About Pokédex/, level: 2 });

    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  test('Link Favorite pokemon redireciona para /favorite.', () => {
    const { history, queryByRole } = renderWithRouter(<App />);

    const linkFavorite = queryByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    const title = queryByRole('heading', { name: /Favorite pokémons/i, level: 2 });

    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  test('Redireciona para /notFound caso digite uma url desconhecida.', () => {
    const { history, queryByText } = renderWithRouter(<App />);

    history.push('/xablau');

    expect(queryByText(/Page requested not found/i)).toBeTruthy();
  });
});
