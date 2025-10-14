// src/components/Header.jsx
export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white rounded-2xl mb-6 shadow-md">
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-wide">📦 StockTrack</h1>
        <p className="text-sm text-blue-100 mt-1 sm:mt-0">
          Smart Inventory Management
        </p>
      </div>
    </header>
  );
}
