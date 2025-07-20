import React, { useEffect, useState } from 'react';
import { api } from '../api/fakeApi';
import { CartItem } from '../types/CartItem';
import CartTable from '../components/CartTable';
import { Row, Col, Spinner } from 'react-bootstrap';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchCart = () => {
    setLoading(true);
    api.getCart().then((data) => {
      setCart(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: number) => {
    setUpdating(true);
    await api.removeFromCart(productId);
    fetchCart();
    setUpdating(false);
  };

  const handleUpdate = async (productId: number, quantity: number) => {
    setUpdating(true);
    await api.updateCartItem(productId, quantity);
    fetchCart();
    setUpdating(false);
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  return (
    <Row>
      <Col>
        <h2>Shopping Cart</h2>
        <CartTable cart={cart} onRemove={handleRemove} onUpdate={handleUpdate} updating={updating} />
      </Col>
    </Row>
  );
};

export default CartPage; 