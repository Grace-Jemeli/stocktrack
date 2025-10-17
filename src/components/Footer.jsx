// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-10 w-full bg-blue-600 text-white py-4 rounded-t-2xl shadow-inner">
      <div className="max-w-3xl mx-auto px-6 text-center text-sm">
        <p className="mb-1">© {new Date().getFullYear()} StockTrack. All rights reserved.</p>
        <p className="text-blue-100">
          Designed with ❤️ by <span className="font-semibold text-white">Grace</span>
        </p>
      </div>
    </footer>
  );
}
