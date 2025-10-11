import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AddProductForm from "./components/AddProductForm";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Notebook", price: 150, quantity: 10 },
    { id: 2, name: "Pen", price: 50, quantity: 0 },
    { id: 3, name: "Desk Lamp", price: 800, quantity: 3 },
  ]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <>
      <Header />
      <h2>Welcome to StockTrack</h2>
      <p>Manage your stock easily in one place</p>

      <h3>Products in Stock</h3>
      {products.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>
            Status:{" "}
            <strong>{item.quantity > 0 ? "In Stock" : "Sold Out"}</strong>
          </p>
        </div>
      ))}

      <AddProductForm onAddProduct={handleAddProduct} />
    </>
  );
}

export default App;
