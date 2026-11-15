import { useState } from "react";

// Muestra la imagen del producto o un recuadro con la inicial si no hay imagen / falla la carga
export default function ProductImage({ src, name, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`img-placeholder ${className}`} aria-label={name}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return <img className={className} src={src} alt={name} onError={() => setFailed(true)} />;
}
