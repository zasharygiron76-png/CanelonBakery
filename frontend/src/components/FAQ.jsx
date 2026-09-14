import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getFaqs } from "../api/client.js";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    getFaqs()
      .then(setFaqs)
      .catch(() => setFaqs([]));
  }, []);

  return (
    <section id="dudas" className="faq-section">
      <style>{`
        .faq-section { background: var(--manteca); }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 760px;
        }
        .faq-item {
          background: var(--azucar);
          border: 1px solid var(--linea);
          border-radius: 16px;
          overflow: hidden;
        }
        .faq-q {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 22px;
          text-align: left;
          font-size: 16px;
          font-weight: 700;
          color: var(--cafe);
        }
        .faq-q .plus {
          flex-shrink: 0;
          color: var(--canela);
          transition: transform 0.2s ease;
        }
        .faq-item.open .plus { transform: rotate(45deg); }
        .faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, padding 0.25s ease;
          padding: 0 22px;
        }
        .faq-item.open .faq-a {
          max-height: 240px;
          padding: 0 22px 20px;
        }
        .faq-a p { margin: 0; color: var(--cafe-suave); font-size: 14.5px; }
      `}</style>

      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Preguntas frecuentes</div>
          <h2>Dudas que nos hacen seguido</h2>
          <p>Si tienes alguna otra pregunta, escríbenos y con gusto te ayudamos.</p>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq-item ${open ? "open" : ""}`} key={item.q}>
                <button className="faq-q" onClick={() => setOpenIndex(open ? -1 : i)}>
                  {item.q}
                  <Plus size={20} className="plus" />
                </button>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
