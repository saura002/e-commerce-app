import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Card>
    <Card.Img variant="top" src={product.image} className="product-img" />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>${product.price.toFixed(2)}</Card.Text>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <Button variant="primary">View Details</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default ProductCard; 