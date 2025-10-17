export default function Footer() {
  return (
    <footer className="w-full mt-10 bg-blue-600 text-white rounded-2xl shadow-md">
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm">
        <p className="text-blue-100">
          © {new Date().getFullYear()} <span className="font-semibold">StockTrack</span>. All rights reserved.
        </p>

        <p className="text-blue-100 mt-2 sm:mt-0">
          Built with 💙 by <span className="font-semibold">Grace</span>
        </p>
      </div>
    </footer>
  );
}
