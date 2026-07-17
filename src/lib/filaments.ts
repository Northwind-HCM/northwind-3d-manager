export type Filament = {
  id: number;
  color: string;
  material: string;
  brand: string;
  stock: number;
  ordered: number;
  pricePerKg: number;
};

export const initialFilaments: Filament[] = [
  { id: 1, color: "Jade-Weiß", material: "PLA Basic", brand: "Bambu", stock: 3, ordered: 0, pricePerKg: 12.5 },
  { id: 2, color: "Beige", material: "PLA Basic", brand: "Bambu", stock: 3, ordered: 0, pricePerKg: 12.5 },
  { id: 3, color: "Hellgrau", material: "PLA Basic", brand: "Bambu", stock: 2, ordered: 0, pricePerKg: 12.5 },
  { id: 4, color: "Elfenbeinweiß", material: "PLA Matt", brand: "Bambu", stock: 3, ordered: 0, pricePerKg: 12.5 },
  { id: 5, color: "Knochenweiß", material: "PLA Matt", brand: "Bambu", stock: 2, ordered: 0, pricePerKg: 12.5 },
  { id: 6, color: "Mandarin-Orange", material: "PLA Matt", brand: "Bambu", stock: 1, ordered: 0, pricePerKg: 12.5 },
  { id: 7, color: "Champagner", material: "PLA Silk", brand: "Bambu", stock: 3, ordered: 0, pricePerKg: 17.5 },
  { id: 8, color: "Pink", material: "PLA Silk", brand: "Bambu", stock: 2, ordered: 0, pricePerKg: 17.5 },
  { id: 9, color: "Schwarz", material: "PETG", brand: "Bambu", stock: 0, ordered: 0, pricePerKg: 15.0 },
  { id: 10, color: "Weiß", material: "PETG", brand: "Bambu", stock: 0, ordered: 0, pricePerKg: 15.0 }
];
