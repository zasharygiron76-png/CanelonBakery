import React, { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../api/client.js";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, totalPrice, clearCart } =
    useCart();
  const [status, setStatus] = useState("idle"); 

  const handleCheckout = async () => {
    setStatus("sending");
    try {
      await createOrder({ items });
      setStatus("done");
      clearCart();
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        .cart-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(58, 42, 30, 0.4);
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .cart-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(420px, 100%);
          background: var(--masa);
          z-index: 201;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 40px rgba(58, 42, 30, 0.18);
        }
        .cart-drawer.open {
          transform: translateX(0);
        }
        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          border-bottom: 1px solid var(--linea);
        }
        .cart-header h3 { font-size: 20px; }
        .cart-close {
          background: none;
          border: none;
          color: var(--cafe);
        }
        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 12px 24px;
        }
        .cart-empty {
          color: var(--cafe-suave);
          padding: 40px 0;
          text-align: center;
        }
        .cart-line {
          display: flex;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--linea);
        }
        .cart-line .thumb {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: var(--manteca);
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
        }
        .cart-line-info { flex: 1; }
        .cart-line-info h4 { font-size: 15px; margin-bottom: 4px; }
        .cart-line-info .precio-unit {
          color: var(--cafe-suave);
          font-size: 13px;
          margin-bottom: 8px;
        }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .qty-control button {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid var(--linea);
          background: var(--azucar);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cafe);
        }
        .cart-line-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
        }
        .cart-line-actions .subtotal {
          font-weight: 800;
          color: var(--canela);
        }
        .cart-line-actions button {
          background: none;
          border: none;
          color: var(--cafe-suave);
        }
        .cart-footer {
          padding: 20px 24px 26px;
          border-top: 1px solid var(--linea);
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        .cart-footer .btn {
          width: 100%;
          justify-content: center;
        }
        .cart-clear {
          margin-top: 10px;
          width: 100%;
          background: none;
          border: none;
          color: var(--cafe-suave);
          font-size: 13.5px;
          text-decoration: underline;
        }
      `}</style>

      <div
        className={`cart-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label="Carrito de compras">
        <div className="cart-header">
          <h3>Tu carrito</h3>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Cerrar carrito">
            <X size={22} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 && (
            <p className="cart-empty">Todavía no has agregado productos.</p>
          )}
          {items.map((item) => (
            <div className="cart-line" key={item.id}>
              <div
                className="thumb"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="cart-line-info">
                <h4>{item.nombre}</h4>
                <div className="precio-unit">Q{item.precio} c/u</div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Quitar uno">
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Agregar uno">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="cart-line-actions">
                <span className="subtotal">Q{item.qty * item.precio}</span>
                <button onClick={() => removeItem(item.id)} aria-label="Eliminar producto">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>Q{totalPrice}</span>
            </div>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={status === "sending"}>
              {status === "sending" ? "Enviando…" : "Finalizar pedido"}
            </button>
            {status === "done" && (
              <p style={{ color: "var(--canela)", marginTop: 10, fontSize: 14 }}>
                ¡Pedido recibido! Te contactaremos para confirmar.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "var(--canela)", marginTop: 10, fontSize: 14 }}>
                No pudimos enviar el pedido. ¿Está corriendo el backend?
              </p>
            )}
            <button className="cart-clear" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
