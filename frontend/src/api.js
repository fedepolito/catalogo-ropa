const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const CATEGORIES = ["Sastreros", "Chombas", "Pantalones de vestir", "Camisas"];

async function request(path, options) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error en la solicitud");
  return data;
}

export const getProducts = ({ category, search } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  const qs = params.toString();
  return request(`/products${qs ? `?${qs}` : ""}`);
};

export const createProduct = (product) =>
  request("/products", { method: "POST", body: JSON.stringify(product) });

export const updateProduct = (id, product) =>
  request(`/products/${id}`, { method: "PUT", body: JSON.stringify(product) });

export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });

export const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
