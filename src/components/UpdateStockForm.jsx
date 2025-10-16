import { useState } from "react";

export default function UpdateStockForm({ product, onUpdate }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      quantity: Number(quantity),
      price: Number(price),
    };

    onUpdate(updatedProduct);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-200"
    >
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Qty</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-16 border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-green-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Price</label>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-20 border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-green-100"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-sm transition duration-200"
      >
        Update
      </button>
    </form>
  );
}
