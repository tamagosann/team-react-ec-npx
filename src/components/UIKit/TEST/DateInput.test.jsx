import React from 'react';
import { render, screen } from '@testing-library/react';
import DateInput from '../DateInput';

test('DateInput test', () => {
  const { getByText } = render(<DateInput fullWidth={true} label={'お届け日'} required={true} value={'2020-02-02'} onChange={() => {}}/>);
  const linkElement = screen.getByText(/お届け日/i);
  expect(linkElement).toBeInTheDocument();
});