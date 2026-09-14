import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { getProducts } from "../api/client.js";
import { useCart } from "../context/CartContext.jsx";

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
      <style>{`
        .carousel-section {
          background: var(--masa);
        }
        .carousel-shell {
          position: relative;
        }
        .carousel-arrow {
          position: absolute;
          top: 42%;
          transform: translateY(-50%);
          z-index: 5;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--azucar);
          border: 1px solid var(--linea);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cafe);
          box-shadow: 0 8px 20px rgba(58, 42, 30, 0.1);
        }
        .carousel-arrow:hover { background: var(--manteca); }
        .carousel-arrow.left { left: -8px; }
        .carousel-arrow.right { right: -8px; }

        .carousel-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          padding: 60px 12px 40px;
          scrollbar-width: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }

        .product-card {
          flex: 0 0 220px;
          scroll-snap-align: center;
          background: var(--azucar);
          border-radius: 22px;
          border: 1px solid var(--linea);
          padding: 20px 18px 22px;
          text-align: center;
          transition: transform 0.28s ease, box-shadow 0.28s ease, opacity 0.28s ease, z-index 0s;
          transform: translateY(0) scale(0.92);
          opacity: 0.72;
          cursor: pointer;
          position: relative;
        }
        .product-card .thumb {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          background: var(--manteca);
          margin-bottom: 16px;
          background-size: cover;
          background-position: center;
        }
        .product-card h3 {
          font-size: 17px;
          margin-bottom: 6px;
        }
        .product-card p.desc {
          font-size: 13px;
          color: var(--cafe-suave);
          margin: 0 0 14px;
          min-height: 36px;
        }
        .product-card .precio {
          font-weight: 800;
          color: var(--canela);
          margin-bottom: 14px;
        }
        .product-card .add-btn {
          width: 100%;
          border: none;
          border-radius: 999px;
          padding: 10px 0;
          font-weight: 700;
          font-size: 14px;
          background: var(--manteca);
          color: var(--cafe);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.2s ease;
        }

        .product-card.active {
          transform: translateY(-26px) scale(1.14);
          opacity: 1;
          z-index: 3;
          box-shadow: 0 30px 50px rgba(58, 42, 30, 0.22);
          border-color: var(--miel);
        }
        .product-card.active .add-btn {
          background: var(--miel);
          color: var(--azucar);
        }
        .product-card.active .add-btn:hover {
          background: var(--canela);
        }
        .product-card.added .add-btn {
          background: var(--cafe);
          color: var(--masa);
        }

        .menu-note {
          margin-top: 12px;
          background: var(--cafe);
          border-radius: 20px;
          padding: 26px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .menu-note p {
          color: var(--masa);
          margin: 0;
          font-size: 15.5px;
          max-width: 46ch;
        }

        @media (max-width: 600px) {
          .product-card { flex-basis: 180px; }
          .carousel-arrow { display: none; }
        }
      `}</style>

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
