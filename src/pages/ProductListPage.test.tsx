import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductListPage from './ProductListPage';
import * as apiModule from '../api/fakeApi';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    image: 'img1',
    price: 10,
    description: 'desc',
    category: 'Cat1',
  },
  {
    id: 2,
    name: 'Test Product 2',
    image: 'img2',
    price: 20,
    description: 'desc',
    category: 'Cat2',
  },
];

describe('ProductListPage', () => {
  beforeEach(() => {
    jest.spyOn(apiModule.api, 'getProducts').mockResolvedValue(mockProducts);
    jest.spyOn(apiModule.api, 'getCategories').mockResolvedValue(['Cat1', 'Cat2']);
  });

  it('renders products and filters by category', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );
    await waitFor(() => expect(screen.getByText('Test Product 1')).toBeInTheDocument());
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    // Filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Cat1' } });
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
  });
}); 