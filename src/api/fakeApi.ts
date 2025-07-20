import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

// Mock product data with local images
const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image: process.env.PUBLIC_URL + '/images/product1.jpg',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: process.env.PUBLIC_URL + '/images/product2.jpg',
    price: 149.99,
    description: 'Track your fitness and notifications with this smart watch.',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Running Shoes',
    image: process.env.PUBLIC_URL + '/images/product3.jpg',
    price: 79.99,
    description: 'Comfortable running shoes for all terrains.',
    category: 'Footwear',
  },
  {
    id: 4,
    name: 'Leather Wallet',
    image: process.env.PUBLIC_URL + '/images/product4.jpg',
    price: 39.99,
    description: 'Premium leather wallet with multiple compartments.',
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Sunglasses',
    image: process.env.PUBLIC_URL + '/images/product5.jpg',
    price: 59.99,
    description: 'Stylish sunglasses with UV protection.',
    category: 'Accessories',
  },
  {
    id: 6,
    name: 'Backpack',
    image: process.env.PUBLIC_URL + '/images/product6.jpg',
    price: 89.99,
    description: 'Durable backpack for travel and daily use.',
    category: 'Bags',
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    image: process.env.PUBLIC_URL + '/images/product7.jpg',
    price: 45.99,
    description: 'Portable Bluetooth speaker with deep bass.',
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Classic Watch',
    image: process.env.PUBLIC_URL + '/images/product8.jpg',
    price: 120.00,
    description: 'Elegant classic watch for all occasions.',
    category: 'Accessories',
  },
  {
    id: 9,
    name: 'Sports Shoes',
    image: process.env.PUBLIC_URL + '/images/product9.jpg',
    price: 99.00,
    description: 'Lightweight sports shoes for running and gym.',
    category: 'Footwear',
  },
  {
    id: 10,
    name: 'Travel Duffel',
    image: process.env.PUBLIC_URL + '/images/product10.jpg',
    price: 110.00,
    description: 'Spacious duffel bag for travel.',
    category: 'Bags',
  },
  {
    id: 11,
    name: 'Laptop Sleeve',
    image: process.env.PUBLIC_URL + '/images/product11.jpg',
    price: 29.99,
    description: 'Protective laptop sleeve for 13-15 inch laptops.',
    category: 'Bags',
  },
  {
    id: 12,
    name: 'Wireless Mouse',
    image: process.env.PUBLIC_URL + '/images/product12.jpg',
    price: 19.99,
    description: 'Ergonomic wireless mouse with long battery life.',
    category: 'Electronics',
  },
  {
    id: 13,
    name: 'Fitness Tracker',
    image: process.env.PUBLIC_URL + '/images/product13.jpg',
    price: 59.99,
    description: 'Track your daily activity and sleep.',
    category: 'Electronics',
  },
  {
    id: 14,
    name: 'Formal Shoes',
    image: process.env.PUBLIC_URL + '/images/product14.jpg',
    price: 129.99,
    description: 'Elegant formal shoes for office and events.',
    category: 'Footwear',
  },
  {
    id: 15,
    name: 'Canvas Tote',
    image: process.env.PUBLIC_URL + '/images/product15.jpg',
    price: 25.00,
    description: 'Eco-friendly canvas tote bag.',
    category: 'Bags',
  },
];

let cart: CartItem[] = [];

export const api = {
  getProducts: async (): Promise<Product[]> => {
    // Simulate network delay
    return new Promise((resolve) => setTimeout(() => resolve(products), 500));
  },
  getProductById: async (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(products.find(p => p.id === id)), 300));
  },
  getCategories: async (): Promise<string[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(Array.from(new Set(products.map(p => p.category)))), 200));
  },
  getCart: async (): Promise<CartItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...cart]), 200));
  },
  addToCart: async (product: Product, quantity: number = 1): Promise<void> => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    return new Promise((resolve) => setTimeout(resolve, 200));
  },
  updateCartItem: async (productId: number, quantity: number): Promise<void> => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.product.id !== productId);
      }
    }
    return new Promise((resolve) => setTimeout(resolve, 200));
  },
  removeFromCart: async (productId: number): Promise<void> => {
    cart = cart.filter(item => item.product.id !== productId);
    return new Promise((resolve) => setTimeout(resolve, 200));
  },
  clearCart: async (): Promise<void> => {
    cart = [];
    return new Promise((resolve) => setTimeout(resolve, 200));
  },
}; 