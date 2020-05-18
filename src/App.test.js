import React from 'react';
import { render } from '@testing-library/react';
import ExcelReader from './ExcelReader';

test('renders learn react link', () => {
  const { getByText } = render(<ExcelReader />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
