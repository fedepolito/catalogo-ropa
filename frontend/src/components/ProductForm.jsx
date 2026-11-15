import { useState } from "react";
import { CATEGORIES } from "../api.js";

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: product.name || "",
    category: product.category || CATEGORIES[0],
    price: product.price ?? "",
    stock: product.stock ?? 0,
    image: product.image || "",
    description: product.description || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("El nombre es obligatorio");
    if (form.price === "" || Number(form.price) < 0) return setError("Ingresá un precio válido");
    setSaving(true);
    setError("");
    try {
      await onSave({ ...form, price: Number(form.price), stock: Number(form.stock) || 0 });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>{product._id ? "Editar producto" : "Nuevo producto"}</h3>
      <div className="form-grid">
        <label>
          Nombre
          <input name="name" value={form.name} onChange={change} />
        </label>
        <label>
          Categoría
          <select name="category" value={form.category} onChange={change}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Precio (ARS)
          <input name="price" type="number" min="0" value={form.price} onChange={change} />
        </label>
        <label>
          Stock
          <input name="stock" type="number" min="0" value={form.stock} onChange={change} />
        </label>
        <label className="full">
          URL de la imagen (opcional)
          <input name="image" value={form.image} onChange={change} placeholder="https://..." />
        </label>
        <label className="full">
          Descripción
          <textarea name="description" rows="3" value={form.description} onChange={change} />
        </label>
      </div>
      {error && <p className="msg error">{error}</p>}
      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
