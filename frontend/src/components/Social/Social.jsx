import React from "react";
import { Instagram, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import './Social.css';

export default function Social() {
  return (
    <section id="redes" className="social-section">

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
