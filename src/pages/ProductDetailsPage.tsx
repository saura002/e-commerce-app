import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/fakeApi';
import { Product } from '../types/Product';
import Spinner from 'react-bootstrap/Spinner';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getProductById(Number(id)).then((data) => {
        setProduct(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      setAdding(true);
      await api.addToCart(product, 1);
      setAdding(false);
      navigate('/cart');
    }
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <ProductDetails product={product} onAddToCart={handleAddToCart} adding={adding} />
  );
};

export default ProductDetailsPage; 