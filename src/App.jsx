import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Story from './pages/Story';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Returns from './pages/admin/Returns';
import IncompleteOrders from './pages/admin/IncompleteOrders';
import PendingConfirmation from './pages/admin/PendingConfirmation';
import PackingPack from './pages/admin/PackingPack';
import AllPackages from './pages/admin/AllPackages';
import ShippingOverview from './pages/admin/ShippingOverview';
import ShippingWaybills from './pages/admin/ShippingWaybills';
import ProductList from './pages/admin/ProductList';
import AdminProductDetail from './pages/admin/ProductDetail';
import ProductCategories from './pages/admin/ProductCategories';
import PriceList from './pages/admin/PriceList';
import Inventory from './pages/admin/Inventory';
import ReceivingOrders from './pages/admin/ReceivingOrders';
import ReportsOverview from './pages/admin/ReportsOverview';
import UserManagement from './pages/admin/UserManagement';
import Login from './pages/Login';
import Register from './pages/Register';
import SuccessfulPayment from './pages/SuccessfulPayment';
import './index.css';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/successfulpayment" element={<SuccessfulPayment />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/returns" element={<Returns />} />
          <Route path="/admin/orders/incomplete" element={<IncompleteOrders />} />

          {/* Order Processing Routes */}
          <Route path="/admin/processing/pending" element={<PendingConfirmation />} />
          <Route path="/admin/processing/handling" element={<PendingConfirmation />} />
          <Route path="/admin/processing/packing" element={<PackingPack />} />
          <Route path="/admin/processing/all" element={<AllPackages />} />

          {/* Shipping Routes */}
          <Route path="/admin/shipping/overview" element={<ShippingOverview />} />
          <Route path="/admin/shipping/waybills" element={<ShippingWaybills />} />

          {/* Product Routes */}
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/:id" element={<AdminProductDetail />} />
          <Route path="/admin/products/categories" element={<ProductCategories />} />
          <Route path="/admin/products/prices" element={<PriceList />} />

          <Route path="/admin/inventory/stock" element={<Inventory />} />
          <Route path="/admin/inventory/receiving" element={<ReceivingOrders />} />
          <Route path="/admin/reports" element={<ReportsOverview />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
