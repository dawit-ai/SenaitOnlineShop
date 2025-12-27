// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/orders");
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/orders/${id}`);
//       setOrders(orders.filter(o => o.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdateStatus = async (id) => {
//     const newStatus = prompt("Enter new status: pending, approved, completed, cancelled");
//     if (!newStatus) return;
//     try {
//       await axios.patch(`http://localhost:5000/orders/${id}/status`, { status: newStatus });
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Order List</h1>
//       <table className="w-full text-left border">
//         <thead>
//           <tr className="bg-gray-800 text-white">
//             <th className="p-2">ID</th>
//             <th>Product</th>
//             <th>Customer</th>
//             <th>Phone</th>
//             <th>Notes</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr key={o.id} className="border-b">
//               <td className="p-2">{o.id}</td>
//               <td>{o.product_name}</td>
//               <td>{o.customer_name}</td>
//               <td>{o.customer_phone}</td>
//               <td>{o.notes}</td>
//               <td>{o.status}</td>
//               <td>
//                 <button
//                   onClick={() => handleUpdateStatus(o.id)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Update Status
//                 </button>
//                 <button
//                   onClick={() => handleDelete(o.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
