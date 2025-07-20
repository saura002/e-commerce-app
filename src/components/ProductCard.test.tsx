import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types/Product';

describe('ProductCard', () => {
  const product: Product = {
    id: 1,
    name: 'Test Product',
    image: '/images/product1.jpg',
    price: 99.99,
    description: 'desc',
    category: 'TestCat',
  };

  it('renders product name, price, and image', () => {
    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/product1.jpg');
  });

  it('renders a link to the product details page', () => {
    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/1');
  });
}); 