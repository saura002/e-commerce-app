import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartTable from './CartTable';
import { CartItem } from '../types/CartItem';

describe('CartTable', () => {
  const cart: CartItem[] = [
    {
      product: {
        id: 1,
        name: 'Test Product',
        image: '/images/product1.jpg',
        price: 10,
        description: 'desc',
        category: 'TestCat',
      },
      quantity: 2,
    },
  ];

  it('renders cart items and total', () => {
    render(
      <CartTable cart={cart} onRemove={jest.fn()} onUpdate={jest.fn()} updating={false} />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <CartTable cart={cart} onRemove={onRemove} onUpdate={jest.fn()} updating={false} />
    );
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('calls onUpdate when increment/decrement is clicked', () => {
    const onUpdate = jest.fn();
    render(
      <CartTable cart={cart} onRemove={jest.fn()} onUpdate={onUpdate} updating={false} />
    );
    const incBtn = screen.getAllByRole('button', { name: '+' })[0];
    const decBtn = screen.getAllByRole('button', { name: '-' })[0];
    fireEvent.click(incBtn);
    fireEvent.click(decBtn);
    expect(onUpdate).toHaveBeenCalledWith(1, 3); // increment
    expect(onUpdate).toHaveBeenCalledWith(1, 1); // decrement
  });
}); 