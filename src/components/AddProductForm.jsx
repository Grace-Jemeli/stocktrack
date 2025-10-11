import React, { useState } from "react";

function AddProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    onAddProduct(newProduct);

    // reset form
    setName("");
    setPrice("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
