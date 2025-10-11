import React from 'react'

function ProductCard({ name, price, quantity }) {
  const status = quantity === 0 ? 'Sold Out' : 'In Stock';

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Quantity: {quantity}</p>
      <p>Status: <strong>{status}</strong></p>
    </div>
  )
}

export default ProductCard;
