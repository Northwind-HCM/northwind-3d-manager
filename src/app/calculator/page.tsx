"use client";

import { useMemo, useState } from "react";

const money = (value: number) => `${value.toFixed(2).replace(".", ",")} €`;

export default function CalculatorPage() {
  const [grams, setGrams] = useState(206);
  const [hours, setHours] = useState(5);
  const [filamentPerKg, setFilamentPerKg] = useState(12.5);
  const [electricityPerHour, setElectricityPerHour] = useState(.09);
  const [wearPerHour, setWearPerHour] = useState(.5);
  const [packaging, setPackaging] = useState(.75);
  const [shipping, setShipping] = useState(4.95);
  const [profit, setProfit] = useState(5);
  const [etsyPercent, setEtsyPercent] = useState(15);
  const [discountPercent, setDiscountPercent] = useState(0);

  const result = useMemo(() => {
    const material = grams / 1000 * filamentPerKg;
    const electricity = hours * electricityPerHour;
    const wear = hours * wearPerHour;
    const production = material + electricity + wear + packaging;
    const desiredAfterFees = production + profit;
    const feeFactor = Math.max(.01, 1 - etsyPercent / 100);
    const priceBeforeDiscount = desiredAfterFees / feeFactor;
    const listPrice = priceBeforeDiscount / Math.max(.01, 1 - discountPercent / 100);
    const etsyFee = priceBeforeDiscount * etsyPercent / 100;
    return { material, electricity, wear, production, etsyFee, priceBeforeDiscount, listPrice, totalWithShipping: listPrice + shipping };
  }, [grams,hours,filamentPerKg,electricityPerHour,wearPerHour,packaging,shipping,profit,etsyPercent,discountPercent]);

  const numberField = (label: string, value: number, setter: (value:number)=>void, step="0.01") => <div className="field"><label>{label}</label><input className="input" type="number" min="0" step={step} value={value} onChange={(e)=>setter(Number(e.target.value))}/></div>;

  return <>
    <header className="page-head"><div><div className="eyebrow">Preisfindung</div><h1>Kalkulation</h1><p>Material, Druckzeit, Etsy-Gebühren und Gewinnwunsch werden live in einen Verkaufspreis umgerechnet.</p></div></header>
    <section className="grid two-col">
      <article className="card"><div className="section-title"><h2>Eingaben</h2><span className="badge">Live-Berechnung</span></div><div className="form-grid">
        {numberField("Materialverbrauch in Gramm",grams,setGrams,"1")}{numberField("Druckzeit in Stunden",hours,setHours,"0.25")}{numberField("Filamentpreis je kg",filamentPerKg,setFilamentPerKg)}{numberField("Stromkosten je Stunde",electricityPerHour,setElectricityPerHour)}{numberField("Verschleiß je Stunde",wearPerHour,setWearPerHour)}{numberField("Verpackung",packaging,setPackaging)}{numberField("Versandkosten",shipping,setShipping)}{numberField("Gewinnwunsch",profit,setProfit)}{numberField("Etsy-Gebühr in %",etsyPercent,setEtsyPercent,"0.1")}{numberField("Rabatt in %",discountPercent,setDiscountPercent,"0.1")}
      </div></article>
      <article className="card"><div className="section-title"><h2>Ergebnis</h2></div>
        <div className="result"><span className="muted">Material</span><strong>{money(result.material)}</strong></div><div className="result"><span className="muted">Strom</span><strong>{money(result.electricity)}</strong></div><div className="result"><span className="muted">Verschleiß</span><strong>{money(result.wear)}</strong></div><div className="result"><span className="muted">Herstellung inkl. Verpackung</span><strong>{money(result.production)}</strong></div><div className="result"><span className="muted">Etsy-Gebühr</span><strong>{money(result.etsyFee)}</strong></div><div className="result"><span className="muted">Preis vor Rabattaufschlag</span><strong>{money(result.priceBeforeDiscount)}</strong></div>
        <div className="price-box"><small>Empfohlener Etsy-Listenpreis</small><div>{money(result.listPrice)}</div><small>Mit Versand: {money(result.totalWithShipping)}</small></div>
      </article>
    </section>
  </>;
}