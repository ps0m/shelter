import { render, screen } from '@testing-library/react';
import App from './App';

describe('TEST APP', () => {
  test('Renders basic element page', () => {
    render(<App />);
    const plantify = screen.getByText(/plantify/i);
    const main = screen.getByRole('main');
    const checkboxes = screen.getAllByRole('checkbox');

    expect(plantify).toBeInTheDocument;
    expect(main).toBeInTheDocument;
    expect(checkboxes).toBeInTheDocument;

  });
})