import React from "react";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      
      <div className="wrap">
        <span className="brand">Canelon</span>
        <p>© {new Date().getFullYear()} Canelon · Horneando felicidad en cada bocado</p>
      </div>
    </footer>
  );
}
