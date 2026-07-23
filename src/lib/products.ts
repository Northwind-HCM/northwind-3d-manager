export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  printMinutes: number;
  materialGrams: number;
  salePrice: number;
  active: boolean;
};

export const initialProducts: Product[] = [
  {
    id: "product-1",
    name: "Personalisierter Namenszug",
    sku: "NW-NAME-001",
    category: "Dekoration",
    printMinutes: 145,
    materialGrams: 82,
    salePrice: 24.9,
    active: true,
  },
  {
    id: "product-2",
    name: "Schlüsselanhänger Classic",
    sku: "NW-KEY-001",
    category: "Accessoires",
    printMinutes: 32,
    materialGrams: 18,
    salePrice: 8.9,
    active: true,
  },
];
