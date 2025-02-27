

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import ProductPage from '@/app/products/[id]/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('ProductPage', () => {
  it('exibe "Carregando..."...', () => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    jest.spyOn(window, 'fetch').mockImplementation(() => new Promise(() => {}));

    render(<ProductPage />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
