import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, formatPrice } from "../api.js";
import ProductForm from "./ProductForm.jsx";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null); // null = cerrado, {} = nuevo, producto = editar
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setProducts(await getProducts());
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data) => {
    if (editing && editing._id) await updateProduct(editing._id, data);
    else await createProduct(data);
    setEditing(null);
    await load();
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.name}"?`)) return;
    try {
      await deleteProduct(p._id);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="admin-head">
        <h2>Administrar productos</h2>
        <button className="btn primary" onClick={() => setEditing({})}>
          + Nuevo producto
        </button>
      </div>

      {error && <p className="msg error">{error}</p>}
      {loading && <p className="msg">Cargando...</p>}

      {editing && <ProductForm product={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td className="actions">
                  <button className="btn" onClick={() => setEditing(p)}>
                    Editar
                  </button>
                  <button className="btn danger" onClick={() => handleDelete(p)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
