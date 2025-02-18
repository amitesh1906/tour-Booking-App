// // File: src/pages/AdminPage.jsx
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../components/Admin/Dashboard';
// import Bookings from '../components/Admin/Bookings';
// import Users from '../components/Admin/Users';
// import Settings from '../components/Admin/Settings';
// import "../styles/admin.css";

// const AdminPage = () => {
//     return (
//         <div className="admin-container">
//             <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/bookings" element={<Bookings />} />
//                 <Route path="users" element={<Users />} />
//                 <Route path="settings" element={<Settings />} />
//                 <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//         </div>
//     );
// };

// export default AdminPage;