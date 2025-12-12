export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
