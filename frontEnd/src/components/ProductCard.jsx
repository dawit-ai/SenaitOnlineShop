export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h2 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h2>
      <p className="text-gray-600 mb-1">{product.price} ብር</p>
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded mt-1 w-full text-center"
        onClick={(e) => {
          e.stopPropagation();
          alert(`Calling/SMS for ${product.name}`);
        }}
      >
        ጥሪ / SMS
      </button>
    </div>
  );
}
