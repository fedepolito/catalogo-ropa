import { useState } from "react";
import Catalog from "./components/Catalog.jsx";
import Admin from "./components/Admin.jsx";

export default function App() {
  const [view, setView] = useState("catalog");

  return (
    <>
      <header className="header">
        <div className="brand">
          <span className="brand-name">ATELIER</span>
          <span className="brand-sub">Ropa masculina elegante</span>
        </div>
        <nav className="nav">
          <button className={view === "catalog" ? "active" : ""} onClick={() => setView("catalog")}>
            Catálogo
          </button>
          <button className={view === "admin" ? "active" : ""} onClick={() => setView("admin")}>
            Administrar
          </button>
        </nav>
      </header>
      <main className="container">{view === "catalog" ? <Catalog /> : <Admin />}</main>
      <footer className="footer">Atelier · Proyecto Final Desarrollo de Sistemas Web 2026</footer>
    </>
  );
}
