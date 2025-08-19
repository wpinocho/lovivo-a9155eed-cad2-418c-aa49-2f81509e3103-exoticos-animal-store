export interface Animal {
  id: number;
  name: string;
  species: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  care: "Fácil" | "Intermedio" | "Avanzado";
}