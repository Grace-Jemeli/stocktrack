import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddProductForm from "./components/AddProductForm";
import DeleteButton from "./components/DeleteButton";
import UpdateStockForm from "./components/UpdateStockForm";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // 🟢 NEW

  // 🟢 Load saved products when the app starts
  useEffect(() => {
    const savedProducts = localStorage.getItem("stocktrack_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([
        { id: 1, name: "Notebook", price: 150, quantity: 10 },
        { id: 2, name: "Pen", price: 50, quantity: 0 },
        { id: 3, name: "Desk Lamp", price: 800, quantity: 3 },
      ]);
    }
    setIsLoaded(true); // 🟢 Mark data as loaded
  }, []);

  // 🟢 Save products only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("stocktrack_products", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const newProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(newProducts);
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

          <UpdateStockForm product={item} onUpdate={handleUpdateProduct} />
          <DeleteButton onDelete={() => handleDeleteProduct(item.id)} />
          <hr />
        </div>
      ))}

      <AddProductForm onAddProduct={handleAddProduct} />
    </>
  );
}

export default App;
