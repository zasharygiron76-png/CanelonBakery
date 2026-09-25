import React from "react";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel.jsx";
import About from "./components/About/About.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Social from "./components/Social/Social.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartDrawer from "./components/CartDrawer/CartDrawer.jsx";

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
