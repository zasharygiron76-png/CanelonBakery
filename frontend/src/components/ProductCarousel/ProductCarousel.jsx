import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { getProducts } from "../../api/client.js";
import { useCart } from "../../context/CartContext.jsx";
import './ProductCarousel.css';

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [justAdded, setJustAdded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const trackRef = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setActiveId(data[0]?.id ?? null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const handleAdd = (product) => {
    addItem(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <section id="menu" className="carousel-section">

      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Nuestro menú</div>
          <h2>Pasa el cursor o toca un producto para verlo de cerca</h2>
          <p>
            Elaborados de forma casera y artesanal. Desliza el carrusel y
            agrega tus favoritos al carrito.
          </p>
        </div>

        {loading && <p>Cargando productos…</p>}
        {error && (
          <p style={{ color: "var(--canela)" }}>
            No pudimos cargar el menú ({error}). ¿Está corriendo el backend en{" "}
            <code>npm run dev</code> dentro de la carpeta <code>backend</code>?
          </p>
        )}

        {!loading && !error && (
        <div className="carousel-shell">
          <button className="carousel-arrow left" onClick={() => scrollBy(-1)} aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <button className="carousel-arrow right" onClick={() => scrollBy(1)} aria-label="Siguiente">
            <ChevronRight size={20} />
          </button>

          <div className="carousel-track" ref={trackRef}>
            {products.map((p) => {
              const isActive = p.id === activeId;
              const isAdded = justAdded === p.id;
              return (
                <article
                  key={p.id}
                  className={`product-card ${isActive ? "active" : ""} ${isAdded ? "added" : ""}`}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                  tabIndex={0}
                >
                  <div
                    className="thumb"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <h3>{p.nombre}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="precio">Q{p.precio}</div>
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(p);
                    }}
                  >
                    {isAdded ? <Check size={16} /> : <Plus size={16} />}
                    {isAdded ? "Agregado" : "Agregar"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
        )}

        <div className="menu-note">
          <p>
            También elaboramos productos personalizados para celebraciones y
            ocasiones especiales, con un toque único en cada pedido.
          </p>
          <a href="#redes" className="btn btn-primary">
            Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
