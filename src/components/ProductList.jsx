import React from 'react'
import ProductCard from './ProductCard'

function ProductList() {
  const mockProducts = [
    { id: 1, name: 'Notebook', price: 150, quantity: 10 },
    { id: 2, name: 'Pen', price: 50, quantity: 0 },
    { id: 3, name: 'Desk Lamp', price: 800, quantity: 3 },
  ];

  return (
    <section className="product-list">
      <h2>Products in Stock</h2>
      <div className="product-grid">
        {mockProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList;
