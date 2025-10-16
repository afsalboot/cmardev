// import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { OrderContext } from "../../context/OrderContext";
// import './orderinvoice.scss'

// const OrderInvoice = () => {
//   const { id } = useParams();
//   const { orders } = useContext(OrderContext);

//   const order = orders.find((o) => o._id === id);

//   if (!order) {
//     return <p>Order not found</p>;
//   }

//   const total = order.items
//     ? order.items.reduce((sum, item) => sum + item.total, 0)
//     : order.total;

//   return (
//     <div className="invoice-page">
//       <h1>Invoice</h1>

//       <div className="invoice-header">
//         <p>
//           <strong>Order ID:</strong> {order._id}
//         </p>
//         <p>
//           <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
//         </p>
//         <p>
//           <strong>Customer:</strong> {order.customerName} ({order.customerPhone})
//         </p>
//         <p>
//           <strong>Address:</strong> {order.customerAddress}
//         </p>
//         <p>
//           <strong>Payment:</strong> {order.payment}
//         </p>
//         <p>
//           <strong>Channel:</strong> {order.channel}
//         </p>
//       </div>

//       <table className="invoice-items">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Item</th>
//             <th>Kg</th>
//             <th>Quantity</th>
//             <th>Rate</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {order.items.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>{item.kg}</td>
//               <td>{item.quantity}</td>
//               <td>₹{item.rate.toFixed(2)}</td>
//               <td>₹{item.total.toFixed(2)}</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="5">
//               <strong>Grand Total</strong>
//             </td>
//             <td>
//               <strong>₹{total.toFixed(2)}</strong>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {order.note && (
//         <p className="note">
//           <strong>Note:</strong> {order.note}
//         </p>
//       )}

//       <button onClick={() => window.print()}>Print Invoice</button>
//     </div>
//   );
// };

// export default OrderInvoice;
