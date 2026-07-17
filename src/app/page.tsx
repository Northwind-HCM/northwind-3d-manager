import { AlertTriangle, Boxes, CircleDollarSign, Printer } from "lucide-react";
import { initialFilaments } from "@/lib/filaments";

export default function Dashboard() {
  const rolls = initialFilaments.reduce((sum, item) => sum + item.stock, 0);
  const critical = initialFilaments.filter((item) => item.stock <= 1).length;

  return (
    <>
      <header className="page-head">
        <div>
          <div className="eyebrow">Northwind Studio 3D</div>
          <h1>Produktion im Blick.</h1>
          <p>Filamentbestand, Kalkulation und Druckplanung in einer eigenständigen Anwendung.</p>
        </div>
        <span className="badge">MVP aktiv</span>
      </header>

      <section className="grid stats">
        <article className="card"><Boxes size={20}/><div className="stat-label">Rollen auf Lager</div><div className="stat-value">{rolls}</div><div className="stat-note">über alle erfassten Farben</div></article>
        <article className="card"><AlertTriangle size={20}/><div className="stat-label">Kritische Bestände</div><div className="stat-value">{critical}</div><div className="stat-note">0 oder 1 Rolle verfügbar</div></article>
        <article className="card"><Printer size={20}/><div className="stat-label">Drucker</div><div className="stat-value">5</div><div className="stat-note">4 × Bambu P1S · 1 × Creality K2</div></article>
        <article className="card"><CircleDollarSign size={20}/><div className="stat-label">Kalkulationsbasis</div><div className="stat-value">15%</div><div className="stat-note">Etsy-Gebühr als Standard</div></article>
      </section>

      <section className="grid two-col">
        <article className="card">
          <div className="section-title"><h2>Bestand mit Handlungsbedarf</h2><span className="badge">Live aus Stammdaten</span></div>
          <div className="list">
            {initialFilaments.filter((item) => item.stock <= 1).map((item) => (
              <div className="list-row" key={item.id}>
                <div><strong>{item.color}</strong><div className="muted">{item.material} · {item.brand}</div></div>
                <span className={`stock ${item.stock === 0 ? "zero" : "low"}`}>{item.stock}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <div className="section-title"><h2>Nächste Ausbaustufe</h2></div>
          <div className="list">
            <div className="list-row"><span>Vollständiger Import deiner 67 Farben</span><span className="badge">Als Nächstes</span></div>
            <div className="list-row"><span>Produkt- und Variantenkalkulation</span><span className="muted">Geplant</span></div>
            <div className="list-row"><span>Druckaufträge & Materialreservierung</span><span className="muted">Geplant</span></div>
            <div className="list-row"><span>Firebase-Synchronisierung</span><span className="muted">Geplant</span></div>
          </div>
        </article>
      </section>
    </>
  );
}