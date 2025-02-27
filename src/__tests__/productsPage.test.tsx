import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductsPage from '@/app/products/page';
import { useProducts } from '@/hooks/useProducts';

jest.mock('@/hooks/useProducts');

describe('ProductsPage', () => {
  it('exibe "Carregando..." enquanto está carregando', () => {
    const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

    mockUseProducts.mockReturnValue({
      products: [],
      categories: [],
      loading: true,
      fetchCategories: jest.fn(),
      fetchProducts: jest.fn(),
    });

    render(<ProductsPage />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
