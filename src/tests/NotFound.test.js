import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests the \'Not found\'.', () => {
  test('Return \'Page requested not found\' case not found URL.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/xablau');

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  test('Render image.', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/xablau');

    const image = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
