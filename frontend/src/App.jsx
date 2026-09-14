import React from "react";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductCarousel from "./components/ProductCarousel.jsx";
import About from "./components/About.jsx";
import FAQ from "./components/FAQ.jsx";
import Social from "./components/Social.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero onSeeMenu={() => goTo("menu")} onOrder={() => goTo("redes")} />
      <ProductCarousel />
      <About />
      <FAQ />
      <Social />
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
