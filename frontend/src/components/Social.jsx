import React from "react";
import { Instagram, Mail, MessageCircle, Clock, MapPin } from "lucide-react";

export default function Social() {
  return (
    <section id="redes" className="social-section">
      <style>{`
        .social-section { background: var(--cafe); }
        .social-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .social-inner .section-head h2 { color: var(--masa); }
        .social-inner .section-head p { color: var(--manteca); opacity: 0.9; }
        .social-inner .kicker { color: var(--miel); }
        .social-cards { display: flex; flex-direction: column; gap: 12px; }
        .social-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #4a3626;
          border-radius: 16px;
          padding: 16px 20px;
          transition: background 0.2s ease;
        }
        .social-card:hover { background: #5c4632; }
        .social-card .icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--miel);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cafe);
          flex-shrink: 0;
        }
        .social-card .label { font-size: 12.5px; color: var(--manteca); margin: 0 0 2px; }
        .social-card .value { font-size: 15px; color: var(--masa); font-weight: 700; margin: 0; }
        @media (max-width: 780px) {
          .social-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wrap social-inner">
        <div>
          <div className="section-head">
            <div className="kicker">Contacto</div>
            <h2>Síguenos y haz tu pedido</h2>
            <p>
              Cuéntanos qué necesitas y con gusto te ayudamos a diseñar el
              pedido perfecto para tu celebración.
            </p>
          </div>
        </div>

        <div className="social-cards">
          <a
            className="social-card"
            href="https://instagram.com/canelon_gt"
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon-badge">
              <Instagram size={20} />
            </div>
            <div>
              <p className="label">Instagram</p>
              <p className="value">@canelon_gt</p>
            </div>
          </a>

          <a className="social-card" href="mailto:canelongt@gmail.com">
            <div className="icon-badge">
              <Mail size={20} />
            </div>
            <div>
              <p className="label">Correo</p>
              <p className="value">canelongt@gmail.com</p>
            </div>
          </a>

          <div className="social-card">
            <div className="icon-badge">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="label">WhatsApp</p>
              <p className="value">Escríbenos para pedidos especiales</p>
            </div>
          </div>

          <div className="social-card">
            <div className="icon-badge">
              <Clock size={20} />
            </div>
            <div>
              <p className="label">Horario</p>
              <p className="value">Lunes a sábado, 8:00 AM – 4:00 PM</p>
            </div>
          </div>

          <div className="social-card">
            <div className="icon-badge">
              <MapPin size={20} />
            </div>
            <div>
              <p className="label">Ubicación</p>
              <p className="value">Ciudad de Guatemala</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
