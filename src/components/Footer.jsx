// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <div className="max-w-3xl mx-auto bg-blue-600 text-white py-4 rounded-2xl shadow-inner text-center">
        <p className="text-sm mb-1">
          © {new Date().getFullYear()} <span className="font-semibold">StockTrack</span>. All rights reserved.
        </p>
        <p className="text-xs text-blue-100">
          Designed with ❤️ by <span className="font-semibold text-white">Grace</span>
        </p>
      </div>
    </footer>
  );
}
