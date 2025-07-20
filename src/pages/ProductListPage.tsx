import React, { useEffect, useState } from 'react';
import { api } from '../api/fakeApi';
import { Product } from '../types/Product';
import { Row, Col, Form, Pagination, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const PRODUCTS_PER_PAGE = 12;

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
    api.getCategories().then(setCategories);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  return (
    <div>
      <Row className="justify-content-center align-items-center mt-4 mb-4" style={{ minHeight: 60 }}>
        <Col xs={12} md={6} lg={4} className="d-flex justify-content-center mb-2 mb-md-0">
          <InputGroup style={{ minWidth: 400 }}>
            <FormControl
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              style={{ minWidth: 400 }}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={3} lg={2} className="d-flex justify-content-center">
          <Form.Select value={selectedCategory} onChange={handleCategoryChange} style={{ minWidth: 200 }}>
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {paginatedProducts.map(product => (
          <Col md={3} sm={6} xs={12} className="mb-4" key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={currentPage === idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default ProductListPage; 