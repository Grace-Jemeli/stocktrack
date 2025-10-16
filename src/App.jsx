import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddProductForm from "./components/AddProductForm";
import DeleteButton from "./components/DeleteButton";
import UpdateStockForm from "./components/UpdateStockForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 🧩 Load products from API (with fallback)
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
          ...apiProducts,
          ...prev.filter((p) => !apiProducts.some((a) => a.id === p.id)),
        ];
        localStorage.setItem("stocktrack_products", JSON.stringify(merged));
        return merged;
      });
    } catch (error) {
      console.error("⚠️ Failed to fetch products:", error);

      // fallback default data if API fails
      const fallback = [
        { id: 1, name: "Notebook", price: 150, quantity: 10 },
        { id: 2, name: "Pen", price: 50, quantity: 0 },
        { id: 3, name: "Desk Lamp", price: 800, quantity: 3 },
      ];
      setProducts(fallback);
      localStorage.setItem("stocktrack_products", JSON.stringify(fallback));
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Load from localStorage first
  useEffect(() => {
    const saved = localStorage.getItem("stocktrack_products");
    if (saved) {
      setProducts(JSON.parse(saved));
      setLoading(false);
    } else {
      fetchProductsFromAPI();
    }
  }, []);

  // 🟢 Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("stocktrack_products", JSON.stringify(products));
    }
  }, [products]);

  // CRUD Handlers
  const handleAddProduct = (product) => setProducts([...products, product]);
  const handleDeleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const handleUpdateProduct = (updated) =>
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

  const handleRefreshFromAPI = async () => {
    setLoading(true);
    await fetchProductsFromAPI();
  };

  // 🧠 Step 3: Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500 mt-20">
        Loading products...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6">
        <Header />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to StockTrack</h2>
          <p className="text-gray-600">Manage your stock easily in one place</p>
        </div>

        {/* Search + Refresh Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Products in Stock</h3>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRefreshFromAPI}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Display Products or Message */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mb-4">
            No products found matching "{searchQuery}".
          </p>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-sm hover:shadow-lg transition-all duration-200 rounded-xl p-5 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${item.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.quantity > 0 ? "In Stock" : "Sold Out"}
                  </span>
                </div>

                <p className="text-gray-700 mb-1">
                  💰 <span className="font-medium">${item.price}</span>
                </p>
                <p className="text-gray-700">
                  📦 Quantity: <span className="font-medium">{item.quantity}</span>
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <UpdateStockForm product={item} onUpdate={handleUpdateProduct} />
                  <DeleteButton onDelete={() => handleDeleteProduct(item.id)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Product Section */}
        <div className="mt-6">
          <div className="bg-white shadow-md rounded-xl p-5 mt-8 border border-gray-100 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add New Product
            </h3>
            <AddProductForm onAddProduct={handleAddProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
