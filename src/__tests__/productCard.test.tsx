import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useProducts';



describe('ProductCard', () => {
  it('exibe selo de "Destaque" se rating > 4.5', () => {
    const product: Product = {
      id: 1,
      title: 'Produto de Teste',
      price: 29.99,
      description: 'Lorem ipsum',
      category: 'Categoria X',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.6, count: 10 },
    };

    render(<ProductCard product={product} />);

    // Verifica se o texto "Destaque" aparece
    expect(screen.getByText('Destaque')).toBeInTheDocument();

    // Verifica se tem a classe de destaque no container (bg-yellow-700, border-yellow-400)
    const container = screen.getByText('Destaque').closest('div');
    expect(container).toHaveClass('bg-yellow-700', 'border-yellow-400');
  });

  it('não exibe selo de destaque se rating <= 4.5', () => {
    const product: Product = {
      id: 2,
      title: 'Produto Normal',
      price: 9.99,
      description: 'Descrição normal',
      category: 'Categoria Y',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.5, count: 5 },
    };

    render(<ProductCard product={product} />);

    // "Destaque" não deve existir em rating de 4.5
    expect(screen.queryByText('Destaque')).not.toBeInTheDocument();

    // Verifica se tem a classe padrão (bg-gray-800, border-gray-700)
    const container = screen.getByRole('heading', {
      name: 'Produto Normal',
    }).closest('div');
    expect(container).toHaveClass('bg-gray-800', 'border-gray-700');
  });

  it('trunca título maior que 30 caracteres', () => {
    const longTitle =
      'Produto com um título extremamente longo e que deveria truncar';
    const product: Product = {
      id: 3,
      title: longTitle,
      price: 19.99,
      description: 'Desc',
      category: 'Cat',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.8, count: 2 },
    };

    render(<ProductCard product={product} />);

    // Esperamos ver apenas primeiros 30 caracteres + '...'
    const truncated = longTitle.slice(0, 30) + '...';
    expect(screen.getByText(truncated)).toBeInTheDocument();
    // E não deve aparecer o título completo
    expect(screen.queryByText(longTitle)).not.toBeInTheDocument();
  });

  it('exibe título normalmente se <= 30 caracteres', () => {
    const shortTitle = 'Título Curto';
    const product: Product = {
      id: 4,
      title: shortTitle,
      price: 10,
      description: 'Desc',
      category: 'Cat',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.2, count: 3 },
    };

    render(<ProductCard product={product} />);

    // Deve mostrar o título sem truncar
    expect(screen.getByText(shortTitle)).toBeInTheDocument();
  });

  it('renderiza o link de detalhes corretamente', () => {
    const product: Product = {
      id: 5,
      title: 'Produto Link',
      price: 50,
      description: 'Desc',
      category: 'Categoria Link',
      image: 'https://example.com/image.jpg',
      rating: { rate: 5, count: 10 },
    };

    render(<ProductCard product={product} />);

    // Verifica se há o link para /products/5
    const linkElement = screen.getByRole('link', { name: 'Detalhes' });
    expect(linkElement).toHaveAttribute('href', '/products/5');
  });
});
