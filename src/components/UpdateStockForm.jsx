// src/components/UpdateStockForm.jsx
import { useState } from "react";

export default function UpdateStockForm({ product, onUpdate }) {
  const [newQuantity, setNewQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuantity === "") return;

    const updatedProduct = {
      ...product,
      quantity: Number(newQuantity),
    };

    onUpdate(updatedProduct);
    setNewQuantity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
    >
      <input
        type="number"
        placeholder="Qty"
        value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
        className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition"
      >
        Update
      </button>
    </form>
  );
}
