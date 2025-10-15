// src/components/DeleteButton.jsx
export default function DeleteButton({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-sm transition duration-200"
    >
      Delete
    </button>
  );
}
