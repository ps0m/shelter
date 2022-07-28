import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from './App';


describe('TEST APP', () => {
  test('Renders learn react link', () => {
    render(<App />);
    const plantify = screen.getByText(/plantify/i);
    const main = screen.getByRole('main');
    const checkboxes = screen.getAllByRole('checkbox');

    // const input = screen.getByPlaceholderText(/input value/i)

    expect(plantify).toBeInTheDocument;
    expect(main).toBeInTheDocument;
    expect(checkboxes).toBeInTheDocument;

  });
})