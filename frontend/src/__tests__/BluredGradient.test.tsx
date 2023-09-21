import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BluredGradient } from '../Components/BluredGradient';

test('renders BluredGradient component with default values', () => {
  const { container } = render(<BluredGradient />);
  const gradientBox = container.firstChild;

  expect(gradientBox).toHaveStyle(`
    background-image: linear-gradient(45deg, hotpink, cyan);
    filter: blur(500px);
    width: 35%;
    height: 40%;
    top: 0;
  `);
});

test('renders BluredGradient component with custom values', () => {
  const customProps = {
    fromColor: 'red',
    toColor: 'blue',
    deg: 90,
    blur: 10,
  };

  const { container } = render(<BluredGradient {...customProps} />);
  const gradientBox = container.firstChild;

  expect(gradientBox).toHaveStyle(`
    background-image: linear-gradient(90deg, red, blue);
    filter: blur(10px);
    width: 35%;
    height: 40%;
    top: 0;
  `);
});
