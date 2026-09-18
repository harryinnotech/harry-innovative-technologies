import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("hit-theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("hit-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <CartProvider>
        <SEO />
        <ScrollToTop />

        <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />

          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ProductDetails />} />
          <Route path="/store/cart" element={<Cart />} />
          <Route path="/store/checkout" element={<Checkout />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
        <WhatsAppButton />
      </CartProvider>
    </BrowserRouter>
  );
}

