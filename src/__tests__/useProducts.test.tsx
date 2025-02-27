import { useProducts } from '@/hooks/useProducts';
import { renderHook, act } from '@testing-library/react';

describe('useProducts (single test)', () => {
  it('manipula fetchCategories e fetchProducts, cobrindo grande parte do fluxo', async () => {
    const mockFetch = jest.spyOn(global, 'fetch');

    // 1ª chamada -> categorias
    mockFetch.mockResolvedValueOnce({
      json: async () => ['electronics', 'jewelery'],
    } as Response);

    // 2ª chamada -> produtos
    mockFetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, title: 'Prod A', price: 20, description: '', category: 'electronics', image: '', rating: { rate: 4, count: 10 } },
        { id: 2, title: 'Prod B', price: 10, description: '', category: 'jewelery', image: '', rating: { rate: 5, count: 8 } },
      ],
    } as Response);

    const { result } = renderHook(() => useProducts());

    // Estado inicial
    expect(result.current.products).toEqual([]);
    expect(result.current.categories).toEqual([]);
    expect(result.current.loading).toBe(false);

    // Chama fetchCategories
    await act(async () => {
      await result.current.fetchCategories();
    });

    // Verifica resultado de fetchCategories
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://fakestoreapi.com/products/categories'
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.categories).toEqual(['electronics', 'jewelery']);

    // Chama fetchProducts com limit=5, category='all', order='asc'
    await act(async () => {
      await result.current.fetchProducts(5, 'all', 'asc');
    });

    // Verifica resultado de fetchProducts (2ª chamada)
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://fakestoreapi.com/products?limit=5&sort=asc'
    );
    expect(result.current.loading).toBe(false);

    // Confere se produtos foram ordenados asc (10, 20)
    expect(result.current.products[0].price).toBe(10);
    expect(result.current.products[1].price).toBe(20);
  });
});
