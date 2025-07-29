import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/Cart";
import ThankYou from "./pages/ThankYou";
import NewsletterThankYou from "./pages/NewsletterThankYou";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";

function AppContent() {
  useEffect(() => {
    document.title = "KS Shop";
  }, []);
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
              path="/newsletter-thank-you"
              element={<NewsletterThankYou />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            {/* Protected Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment" element={<Payment />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            {/* Example admin-only route: <Route path="/admin" element={<RequireAuth adminOnly={true}><AdminPage /></RequireAuth>} /> */}
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default AppContent;
