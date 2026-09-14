import React, { useEffect, useState } from "react";
import { getValores } from "../api/client.js";

export default function About() {
  const [valores, setValores] = useState([]);

  useEffect(() => {
    getValores()
      .then(setValores)
      .catch(() => setValores([]));
  }, []);
  return (
    <section id="nosotros" className="about-section">
      <style>{`
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 52px;
        }
        .mv-card {
          background: var(--manteca);
          border-radius: 8px 30px 8px 30px;
          padding: 32px 30px;
        }
        .mv-card h3 {
          color: var(--canela);
          font-size: 20px;
          margin-bottom: 12px;
        }
        .mv-card p {
          color: var(--cafe);
          font-size: 15.5px;
          margin: 0;
          opacity: 0.9;
        }
        .valores-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .valor-card {
          text-align: left;
          padding: 20px 16px;
          border-top: 3px solid var(--canela);
        }
        .valor-card h4 {
          font-size: 16.5px;
          margin: 0 0 8px;
        }
        .valor-card p {
          font-size: 13.5px;
          color: var(--cafe-suave);
          margin: 0;
        }
        @media (max-width: 900px) {
          .mv-grid { grid-template-columns: 1fr; }
          .valores-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Sobre nosotros</div>
          <h2>Lo que nos mueve cada día</h2>
        </div>

        <div className="mv-grid">
          <div className="mv-card">
            <h3>Misión</h3>
            <p>
              Elaborar postres y panes artesanales de calidad, hechos con
              dedicación y un toque casero, buscando hornear felicidad en
              cada bocado.
            </p>
          </div>
          <div className="mv-card">
            <h3>Visión</h3>
            <p>
              Ser un emprendimiento reconocido por sus productos artesanales,
              creciendo sin perder la esencia casera y el cariño detrás de
              cada producto.
            </p>
          </div>
        </div>

        <div className="valores-grid">
          {valores.map((v) => (
            <div className="valor-card" key={v.nombre}>
              <h4>{v.nombre}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
