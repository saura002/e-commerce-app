import React from 'react';
import { CartItem } from '../types/CartItem';
import { Table, Button, Image, ButtonGroup } from 'react-bootstrap';

interface CartTableProps {
  cart: CartItem[];
  onRemove: (productId: number) => void;
  onUpdate: (productId: number, quantity: number) => void;
  updating: boolean;
}

const CartTable: React.FC<CartTableProps> = ({ cart, onRemove, onUpdate, updating }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <>
      {cart.length === 0 ? (
        <div>Opps, your cart is empty. Try adding some items in the cart</div>
      ) : (
        <Table striped bordered hover responsive className="align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.product.id}>
                <td><Image src={item.product.image} thumbnail width={60} style={{ objectFit: 'cover' }} /></td>
                <td style={{ minWidth: 120 }}>{item.product.name}</td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onUpdate(item.product.id, item.quantity - 1)}
                      disabled={updating || item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-2 align-self-center">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onUpdate(item.product.id, item.quantity + 1)}
                      disabled={updating}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemove(item.product.id)}
                    disabled={updating}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h4 className="text-end mt-3">
        Total: <span className="text-success">${total.toFixed(2)}</span>
      </h4>
    </>
  );
};

export default CartTable; 