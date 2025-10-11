import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddProductForm from "./components/AddProductForm";
import DeleteButton from "./components/DeleteButton";
import UpdateStockForm from "./components/UpdateStockForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch from DummyJSON API
  const fetchProductsFromAPI = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=5");
      const data = await response.json();

      const apiProducts = data.products.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.stock,
      }));

      // Merge API products with existing ones (avoid duplicates)
      setProducts((prev) => {
        const merged = [
          ...prev.filter((p) => !apiProducts.some((a) => a.id === p.id)),
          ...apiProducts,
        ];
        localStorage.setItem("stocktrack_products", JSON.stringify(merged));
        return merged;
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  // 🟢 Load saved data or fetch from API if none
  useEffect(() => {
    const savedProducts = localStorage.getItem("stocktrack_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
    } else {
      fetchProductsFromAPI();
    }
  }, []);

  // 🟢 Persist data in local storage whenever it changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("stocktrack_products", JSON.stringify(products));
    }
  }, [products]);

  // 🟢 Add product
  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  // 🟢 Delete product
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // 🟢 Update product
  const handleUpdateProduct = (updatedProduct) => {
    const newProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(newProducts);
  };

  // 🟢 Refresh manually from API (without losing added products)
  const handleRefreshFromAPI = async () => {
    setLoading(true);
    await fetchProductsFromAPI();
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <Header />
      <h2>Welcome to StockTrack</h2>
      <p>Manage your stock easily in one place</p>

      {/* 🔄 Refresh Button */}
      <button onClick={handleRefreshFromAPI}>
        🔄 Refresh from API
      </button>

      <h3>Products in Stock</h3>
      {products.length === 0 && <p>No products available.</p>}
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
