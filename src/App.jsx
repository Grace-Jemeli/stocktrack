import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddProductForm from "./components/AddProductForm";
import DeleteButton from "./components/DeleteButton";
import UpdateStockForm from "./components/UpdateStockForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const savedProducts = localStorage.getItem("stocktrack_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
    } else {
      fetchProductsFromAPI();
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("stocktrack_products", JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = (product) => setProducts([...products, product]);
  const handleDeleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const handleUpdateProduct = (updated) =>
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  const handleRefreshFromAPI = async () => {
    setLoading(true);
    await fetchProductsFromAPI();
  };

  if (loading)
    return <p className="text-center text-lg text-gray-500 mt-20">Loading products...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6">
        <Header />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to StockTrack</h2>
          <p className="text-gray-600">Manage your stock easily in one place</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Products in Stock</h3>
          <button
            onClick={handleRefreshFromAPI}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            🔄 Refresh from API
          </button>
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mb-4">No products available.</p>
        )}

        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-100 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${item.quantity > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.quantity > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>

              <p className="text-gray-600">💰 Price: ${item.price}</p>
              <p className="text-gray-600">📦 Quantity: {item.quantity}</p>

              <div className="flex items-center gap-3 mt-3">
                <UpdateStockForm product={item} onUpdate={handleUpdateProduct} />
                <DeleteButton onDelete={() => handleDeleteProduct(item.id)} />
              </div>
            </div>


          ))}
        </div>

        <div className="mt-6">
          <AddProductForm onAddProduct={handleAddProduct} />
        </div>
      </div>
    </div >
  );
}

export default App;
