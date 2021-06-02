import React from 'react';
import { render, screen } from '@testing-library/react';
import SecondaryButton from '../SecondaryButton';

test('SecondaryButton test', () => {
  const { getByText } = render(<SecondaryButton label={'キャンセル'} />);
  const linkElement = screen.getByText(/キャンセル/i);
  expect(linkElement).toBeInTheDocument();
});

