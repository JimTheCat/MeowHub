import {fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Footer} from '../Features/Login/components/Footer';
import {render} from "../test-utils/render";

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key, // Mockowanie t function
    i18n: {
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

test('renders Footer component with language buttons', () => {
  const { container, getByText } = render(<Footer />);
  const footerGroup = container.firstChild;

  expect(footerGroup).toBeInTheDocument();

  expect(getByText('language.english')).toBeInTheDocument();
  expect(getByText('language.polish')).toBeInTheDocument();
});

test('changes language when language button is clicked', () => {
  const { getByText } = render(<Footer />);

  fireEvent.click(getByText('language.polish'));
  expect(mockChangeLanguage).toHaveBeenCalledWith('pl');
  expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'pl');

  fireEvent.click(getByText('language.english'));
  expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'en');
});