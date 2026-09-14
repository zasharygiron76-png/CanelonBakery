import React from "react";

export default function Hero({ onSeeMenu, onOrder }) {
  return (
    <header id="inicio" className="hero">
      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(58, 42, 30, 0.15) 0%,
            rgba(58, 42, 30, 0.35) 55%,
            rgba(58, 42, 30, 0.72) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 28px 88px;
          width: 100%;
        }
        .hero-eyebrow {
          color: var(--manteca);
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 16px;
        }
        .hero h1 {
          color: var(--masa);
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.08;
          max-width: 16ch;
        }
        .hero p {
          color: var(--masa);
          font-size: 18px;
          max-width: 46ch;
          margin: 22px 0 32px;
          opacity: 0.92;
        }
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero .btn-outline {
          border-color: var(--masa);
          color: var(--masa);
        }
        .hero .btn-outline:hover {
          background: rgba(251, 243, 228, 0.12);
        }
      `}</style>

      {/*
        Coloca tu video de marca en /public/video/hero.mp4 (y opcionalmente
        una versión .webm). Si el video no carga, se ve el color de fondo
        de respaldo definido en poster/--cafe.
      */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-eyebrow">Pastelería artesanal en Ciudad de Guatemala</div>
        <h1>Horneamos felicidad en cada bocado</h1>
        <p>
          Postres y panes artesanales hechos con dedicación y un toque casero,
          desde los favoritos de siempre hasta nuevas opciones para descubrir.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onSeeMenu}>
            Ver el menú
          </button>
          <button className="btn btn-outline" onClick={onOrder}>
            Hacer un pedido
          </button>
        </div>
      </div>
    </header>
  );
}
