import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <style>{`
        .site-footer {
          background: var(--cafe);
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 22px 0 30px;
        }
        .site-footer .wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .site-footer p {
          color: var(--manteca);
          opacity: 0.75;
          font-size: 13.5px;
          margin: 0;
        }
        .site-footer .brand {
          font-family: "Fraunces", serif;
          color: var(--masa);
          font-size: 16px;
          font-weight: 700;
        }
      `}</style>
      <div className="wrap">
        <span className="brand">Canelón Bakery</span>
        <p>© {new Date().getFullYear()} Canelón Bakery · Horneando felicidad en cada bocado</p>
      </div>
    </footer>
  );
}
