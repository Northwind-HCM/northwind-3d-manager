"use client";

import { useEffect, useMemo, useState } from "react";
import { initialFilaments, type Filament } from "@/lib/filaments";

const storageKey = "northwind-filaments";

export default function FilamentPage() {
  const [items, setItems] = useState<Filament[]>(initialFilaments);
  const [query, setQuery] = useState("");
  const [material, setMaterial] = useState("Alle");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const materials = ["Alle", ...Array.from(new Set(items.map((item) => item.material)))];
  const filtered = useMemo(() => items.filter((item) => {
    const matchesQuery = `${item.color} ${item.material} ${item.brand}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (material === "Alle" || item.material === material);
  }), [items, query, material]);

  function changeStock(id: number, delta: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item));
  }

  return (
    <>
      <header className="page-head"><div><div className="eyebrow">Lagerverwaltung</div><h1>Filamente</h1><p>Bestände direkt pflegen. Änderungen werden auf diesem Gerät automatisch gespeichert.</p></div><span className="badge">{items.reduce((sum, item) => sum + item.stock, 0)} Rollen</span></header>
      <article className="card">
        <div className="toolbar">
          <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Farbe, Material oder Marke suchen …" />
          <select className="select" style={{maxWidth:220}} value={material} onChange={(event) => setMaterial(event.target.value)}>{materials.map((entry) => <option key={entry}>{entry}</option>)}</select>
          <button className="button secondary" onClick={() => setItems(initialFilaments)}>Bestände zurücksetzen</button>
        </div>
        <div className="table-wrap">
          <table className="table"><thead><tr><th>Farbe</th><th>Material</th><th>Marke</th><th>Preis/kg</th><th>Bestand</th><th>Anpassen</th></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id}>
              <td><strong>{item.color}</strong></td><td>{item.material}</td><td className="muted">{item.brand}</td><td>{item.pricePerKg.toFixed(2).replace(".", ",")} €</td>
              <td><span className={`stock ${item.stock === 0 ? "zero" : item.stock === 1 ? "low" : "good"}`}>{item.stock}</span></td>
              <td><div className="stepper"><button onClick={() => changeStock(item.id,-1)}>−</button><button onClick={() => changeStock(item.id,1)}>+</button></div></td>
            </tr>)}</tbody>
          </table>
        </div>
      </article>
    </>
  );
}