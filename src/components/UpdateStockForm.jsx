import React, { useState } from "react";

function UpdateStockForm({ product, onUpdate }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      quantity: parseInt(quantity),
    };

    onUpdate(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Update Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateStockForm;
