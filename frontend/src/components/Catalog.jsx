import { useEffect, useState } from "react";
import { getProducts, CATEGORIES, formatPrice } from "../api.js";
import ProductImage from "./ProductImage.jsx";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // pequeña espera para no pedir en cada tecla
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        setProducts(await getProducts({ category, search }));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [category, search]);

  return (
    <section>
      <div className="filters">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chips">
          <button className={category === "" ? "chip active" : "chip"} onClick={() => setCategory("")}>
            Todos
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={category === c ? "chip active" : "chip"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="msg error">{error}</p>}
      {loading && <p className="msg">Cargando...</p>}
      {!loading && !error && products.length === 0 && <p className="msg">No se encontraron productos.</p>}

      <div className="grid">
        {products.map((p) => (
          <article key={p._id} className="card" onClick={() => setSelected(p)}>
            <ProductImage src={p.image} name={p.name} className="card-img" />
            <div className="card-body">
              <span className="card-cat">{p.category}</span>
              <h3>{p.name}</h3>
              <p className="price">{formatPrice(p.price)}</p>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar">
              ×
            </button>
            <ProductImage src={selected.image} name={selected.name} className="modal-img" />
            <div className="modal-body">
              <span className="card-cat">{selected.category}</span>
              <h2>{selected.name}</h2>
              <p className="price">{formatPrice(selected.price)}</p>
              <p>{selected.description || "Sin descripción."}</p>
              <p className={selected.stock > 0 ? "stock ok" : "stock none"}>
                {selected.stock > 0 ? `${selected.stock} unidades disponibles` : "Sin stock"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
