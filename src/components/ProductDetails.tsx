import React from 'react';
import { Product } from '../types/Product';
import { Button, Card, Row, Col } from 'react-bootstrap';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: () => void;
  adding: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, adding }) => (
  <Row>
    <Col md={6}>
      <Card>
        <Card.Img variant="top" src={product.image} />
      </Card>
    </Col>
    <Col md={6}>
      <h2>{product.name}</h2>
      <h4>${product.price.toFixed(2)}</h4>
      <p>{product.description}</p>
      <Button variant="success" onClick={onAddToCart} disabled={adding}>
        {adding ? 'Adding...' : 'Add to Cart'}
      </Button>
    </Col>
  </Row>
);

export default ProductDetails; 