import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyButton from './MyButton';

describe('Test Button', () => {
  test('Check button click', () => {
    let counter = 0

    render(<MyButton
      onClick={() => counter = 42}
      isActive={false} />);

    const aboutLink = screen.getByRole("button");

    userEvent.click(aboutLink);

    expect(counter).toEqual(42);
  });


})