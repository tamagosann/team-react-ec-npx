import React from 'react';
import { render, screen } from '@testing-library/react';
import PrimaryButton from '../PrimaryButton';

test('PrimaryButton test', () => {
  const { getByText } = render(<PrimaryButton label={'決定'} />);
  const linkElement = screen.getByText(/決定/i);
  expect(linkElement).toBeInTheDocument();
});