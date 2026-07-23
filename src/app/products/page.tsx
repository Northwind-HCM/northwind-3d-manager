"use client";

import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { initialProducts, type Product } from "@/lib/products";

const storageKey = "northwind-products";
const emptyForm = {
  name: "",
  sku: "",
  category: "Dekoration",
  printMinutes: 60,
  materialGrams: 50,
  salePrice: 19.9,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (db) {
      return onSnapshot(collection(db, "products"), (snapshot) => {
        setProducts(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }) as Product));
        setReady(true);
      });
    }

    const saved = window.localStorage.getItem(storageKey);
    if (saved) setProducts(JSON.parse(saved));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !db) window.localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products, ready]);

  const filtered = useMemo(
    () => products.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.toLowerCase())),
    [products, query],
  );

  async function createProduct(event: FormEvent) {
    event.preventDefault();
    const product = { ...form, active: true };

    if (db) {
      await addDoc(collection(db, "products"), product);
    } else {
      setProducts((current) => [...current, { ...product, id: crypto.randomUUID() }]);
    }
    setForm(emptyForm);
  }

  async function toggleProduct(product: Product) {
    if (db) await setDoc(doc(db, "products", product.id), { ...product, active: !product.active });
    else setProducts((current) => current.map((entry) => entry.id === product.id ? { ...entry, active: !entry.active } : entry));
  }

  async function removeProduct(product: Product) {
    if (db) await deleteDoc(doc(db, "products", product.id));
    else setProducts((current) => current.filter((entry) => entry.id !== product.id));
  }

  return (
    <>
      <header className="page-head">
        <div><div className="eyebrow">Produktverwaltung</div><h1>Produkte & Varianten</h1><p>Druckdaten, Materialbedarf und Verkaufspreise zentral verwalten.</p></div>
        <span className="badge">{isFirebaseConfigured ? "Firebase verbunden" : "Lokaler Modus"}</span>
      </header>

      <section className="grid two-col">
        <article className="card">
          <div className="section-title"><h2>Produkt anlegen</h2></div>
          <form className="form-grid" onSubmit={createProduct}>
            <div className="field"><label>Name</label><input className="input" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}/></div>
            <div className="field"><label>SKU</label><input className="input" required value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })}/></div>
            <div className="field"><label>Kategorie</label><input className="input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}/></div>
            <div className="field"><label>Druckzeit (Min.)</label><input className="input" type="number" min="1" value={form.printMinutes} onChange={(event) => setForm({ ...form, printMinutes: Number(event.target.value) })}/></div>
            <div className="field"><label>Material (g)</label><input className="input" type="number" min="1" value={form.materialGrams} onChange={(event) => setForm({ ...form, materialGrams: Number(event.target.value) })}/></div>
            <div className="field"><label>Verkaufspreis (€)</label><input className="input" type="number" min="0" step="0.01" value={form.salePrice} onChange={(event) => setForm({ ...form, salePrice: Number(event.target.value) })}/></div>
            <button className="button" type="submit">Produkt speichern</button>
          </form>
        </article>

        <article className="card">
          <div className="section-title"><h2>Übersicht</h2><span className="badge">{products.length} Produkte</span></div>
          <div className="result"><span>Aktive Produkte</span><strong>{products.filter((product) => product.active).length}</strong></div>
          <div className="result"><span>Ø Verkaufspreis</span><strong>{(products.reduce((sum, product) => sum + product.salePrice, 0) / Math.max(products.length, 1)).toFixed(2).replace(".", ",")} €</strong></div>
          <div className="result"><span>Ø Materialbedarf</span><strong>{Math.round(products.reduce((sum, product) => sum + product.materialGrams, 0) / Math.max(products.length, 1))} g</strong></div>
        </article>
      </section>

      <article className="card" style={{ marginTop: 18 }}>
        <div className="toolbar"><input className="input" placeholder="Produkt, SKU oder Kategorie suchen …" value={query} onChange={(event) => setQuery(event.target.value)}/></div>
        <div className="table-wrap"><table className="table"><thead><tr><th>Produkt</th><th>SKU</th><th>Kategorie</th><th>Druckzeit</th><th>Material</th><th>Preis</th><th>Status</th><th>Aktionen</th></tr></thead>
          <tbody>{filtered.map((product) => <tr key={product.id}>
            <td><strong>{product.name}</strong></td><td className="muted">{product.sku}</td><td>{product.category}</td><td>{product.printMinutes} Min.</td><td>{product.materialGrams} g</td><td>{product.salePrice.toFixed(2).replace(".", ",")} €</td>
            <td><span className={`stock ${product.active ? "good" : "zero"}`}>{product.active ? "Aktiv" : "Pausiert"}</span></td>
            <td><div className="stepper"><button title="Status ändern" onClick={() => toggleProduct(product)}>↻</button><button title="Löschen" onClick={() => removeProduct(product)}>×</button></div></td>
          </tr>)}</tbody>
        </table></div>
      </article>
    </>
  );
}
