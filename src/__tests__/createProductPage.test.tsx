import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProductPage from '@/app/products/create/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('CreateProductPage', () => {
  it('preenche o formulário e cria o produto com sucesso', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ id: 123 })
    }) as jest.Mock;

    // Renderiza a página
    render(<CreateProductPage />);

    // Preenche os campos
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Novo Produto' }
    });
    fireEvent.change(screen.getByLabelText(/preço/i), {
      target: { value: '99.99' }
    });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'Uma descrição de teste' }
    });
    fireEvent.change(screen.getByLabelText(/categoria/i), {
      target: { value: 'Categoria X' }
    });
    fireEvent.change(screen.getByLabelText(/imagem/i), {
      target: { value: 'http://example.com/image.png' }
    });

    // Clica no botão de salvar
    const submitButton = screen.getByText(/Salvar/i);
    fireEvent.click(submitButton);

    // Aguarda a requisição e redirecionamento
    await waitFor(() => {
      // Verifica se o fetch foi chamado com o POST correto
      expect(window.fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Novo Produto',
            price: 99.99,
            description: 'Uma descrição de teste',
            category: 'Categoria X',
            image: 'http://example.com/image.png'
          })
        })
      );

      // Verifica se houve redirecionamento para /products
      expect(mockPush).toHaveBeenCalledWith('/products');
    });
  });
});
