import { render, screen } from '@testing-library/react';
import MyInput from './MyInput';

describe('Test Input', () => {
  test('Do input has placeholder?', () => {
    render(<MyInput
      autoComplete={'off'}
      placeholder={"Что поищем?"}
      value={''}
      onChange={() => ''}
      clearValue={() => ''} />);

    const text = screen.getByPlaceholderText(/Что поищем?/i);

    expect(text).toBeInTheDocument;
  });


})