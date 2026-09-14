const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error ${res.status} al llamar ${path}`);
  }

  return res.json();
}

export function getProducts() {
  return request("/products");
}

export function getFaqs() {
  return request("/faqs");
}

export function getValores() {
  return request("/valores");
}

export function createOrder({ items, cliente }) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify({ items, cliente }),
  });
}
