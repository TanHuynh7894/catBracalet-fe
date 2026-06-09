import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import AccountLayout from './layout/AccountLayout';
import Home from './pages/Home/index';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/utils/ScrollToTop';
import './index.css';

// Lazy loading components
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const AdminOrderDetail = lazy(() => import('./pages/admin/OrderDetail'));
const Returns = lazy(() => import('./pages/admin/Returns'));
const IncompleteOrders = lazy(() => import('./pages/admin/IncompleteOrders'));
const PendingConfirmation = lazy(() => import('./pages/admin/PendingConfirmation'));
const PackingPack = lazy(() => import('./pages/admin/PackingPack'));
const AllPackages = lazy(() => import('./pages/admin/AllPackages'));
const ShippingOverview = lazy(() => import('./pages/admin/ShippingOverview'));
const ShippingWaybills = lazy(() => import('./pages/admin/ShippingWaybills'));
const ProductList = lazy(() => import('./pages/admin/ProductList'));
const AdminProductDetail = lazy(() => import('./pages/admin/ProductDetail'));
const ProductCategories = lazy(() => import('./pages/admin/ProductCategories'));
const PriceList = lazy(() => import('./pages/admin/PriceList'));
const Inventory = lazy(() => import('./pages/admin/Inventory'));
const ReceivingOrders = lazy(() => import('./pages/admin/ReceivingOrders'));
const ReportsOverview = lazy(() => import('./pages/admin/ReportsOverview'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const RoleManagement = lazy(() => import('./pages/admin/RoleManagement'));
const VoucherManagement = lazy(() => import('./pages/admin/VoucherManagement'));
const MaterialManagement = lazy(() => import('./pages/admin/MaterialManagement'));
const ConsultationManagement = lazy(() => import('./pages/admin/ConsultationManagement'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const SuccessfulPayment = lazy(() => import('./pages/SuccessfulPayment'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const OrderHistory = lazy(() => import('./pages/OrderHistory/OrderHistory'));
const ShippingAddresses = lazy(() => import('./pages/ShippingAddresses/ShippingAddresses'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const ChangePassword = lazy(() => import('./pages/ChangePassword/ChangePassword'));
const OrderDetail = lazy(() => import('./pages/OrderDetail/OrderDetail'));
const CollectionPage = lazy(() => import('./pages/Collection/CollectionPage'));
const CustomBraceletPage = lazy(() => import('./pages/CustomBracelet/CustomBraceletPage'));
const StoryPage = lazy(() => import('./pages/StoryPage/StoryPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'));
const FailedPayment = lazy(() => import('./pages/FailedPayment'));

// A simple loading placeholder for Suspense
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-wine border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
      <CartProvider>
        <ToastProvider>
          <ScrollToTop />
          <LayoutWrapper>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* ... routes ... */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/successfulpayment" element={<SuccessfulPayment />} />
                <Route path="/failedpayment" element={<FailedPayment />} />

                {/* Account Sub-Routes Sharing a Layout */}
                <Route element={<AccountLayout />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/shipping-addresses" element={<ShippingAddresses />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/order-detail/:id" element={<OrderDetail />} />
                </Route>

                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/custom" element={<CustomBraceletPage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
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
                <Route path="/admin/products/categories" element={<ProductCategories />} />
                <Route path="/admin/products/materials" element={<MaterialManagement />} />
                <Route path="/admin/products/prices" element={<PriceList />} />
                <Route path="/admin/products/:id" element={<AdminProductDetail />} />

                <Route path="/admin/inventory/stock" element={<Inventory />} />
                <Route path="/admin/inventory/receiving" element={<ReceivingOrders />} />
                <Route path="/admin/reports" element={<ReportsOverview />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/roles" element={<RoleManagement />} />
                <Route path="/admin/vouchers" element={<VoucherManagement />} />
                <Route path="/admin/consultations" element={<ConsultationManagement />} />

              </Routes>
            </Suspense>
          </LayoutWrapper>
        </ToastProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
