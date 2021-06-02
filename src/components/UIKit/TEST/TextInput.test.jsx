import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from '../TextInput';

test('TextInput test', () => {
  const { getByText, getByDisplayValue } = render(<TextInput fullWidth={true} label={'お名前'} multiline={false} rows={1} required={true} value={'哀川翔'} type={'text'} onChange={() => {}}/>);
  const linkElement = screen.getByText(/お名前/i);
  const inputValue = screen.getByDisplayValue(/哀川翔/i);
  expect(linkElement).toBeInTheDocument();
  expect(inputValue).toBeInTheDocument();
});