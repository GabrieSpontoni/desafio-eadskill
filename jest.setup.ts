import '@testing-library/jest-dom';


if (typeof window !== 'undefined' && !window.fetch) {
  (window).fetch = jest.fn();
}

