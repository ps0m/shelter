import { render, screen } from '@testing-library/react';
import { MyBasket } from './MyBasket';

describe('TEST APP', () => {
  test('Check render amount shopping', () => {
    render(<MyBasket shopping={5} />);
    const number = screen.getByText(/5/i);

    expect(number).toBeInTheDocument;
  });

  test('Check render amount shopping', () => {
    render(<MyBasket shopping={10} />);
    const number = screen.getByText(/10/i);

    expect(number).toBeInTheDocument;
  });
})