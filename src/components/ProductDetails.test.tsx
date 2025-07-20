import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { Product } from '../types/Product';

describe('ProductDetails', () => {
  const product: Product = {
    id: 1,
    name: 'Test Product',
    image: '/images/product1.jpg',
    price: 99.99,
    description: 'desc',
    category: 'TestCat',
  };

  it('renders product details', () => {
    render(
      <ProductDetails product={product} onAddToCart={jest.fn()} adding={false} />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/product1.jpg');
  });

  it('calls onAddToCart when button is clicked', () => {
    const onAddToCart = jest.fn();
    render(
      <ProductDetails product={product} onAddToCart={onAddToCart} adding={false} />
    );
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalled();
  });

  it('disables button when adding is true', () => {
    render(
      <ProductDetails product={product} onAddToCart={jest.fn()} adding={true} />
    );
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
  });
}); 