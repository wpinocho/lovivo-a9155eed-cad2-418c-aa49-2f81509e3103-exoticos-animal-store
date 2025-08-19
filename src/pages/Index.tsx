import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { AnimalCard } from "@/components/AnimalCard";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Animal } from "@/types/Animal";

const EXOTIC_ANIMALS: Animal[] = [
  {
    id: 1,
    name: "Iguana Verde",
    species: "Iguana iguana",
    price: 150,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    description: "Hermosa iguana verde, perfecta para principiantes en reptiles.",
    category: "Reptiles",
    inStock: true,
    care: "Fácil"
  },
  {
    id: 2,
    name: "Gecko Leopardo",
    species: "Eublepharis macularius",
    price: 80,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Gecko leopardo dócil y colorido, ideal para terrarios.",
    category: "Reptiles",
    inStock: true,
    care: "Fácil"
  },
  {
    id: 3,
    name: "Pitón Real",
    species: "Python regius",
    price: 200,
    image: "https://images.unsplash.com/photo-1516728778615-2d590ea18d8d?w=400&h=300&fit=crop",
    description: "Serpiente dócil y hermosa, perfecta para coleccionistas.",
    category: "Reptiles",
    inStock: true,
    care: "Intermedio"
  },
  {
    id: 4,
    name: "Tarántula Rosada",
    species: "Grammostola rosea",
    price: 45,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Tarántula tranquila y de bajo mantenimiento.",
    category: "Arácnidos",
    inStock: true,
    care: "Fácil"
  },
  {
    id: 5,
    name: "Axolotl",
    species: "Ambystoma mexicanum",
    price: 120,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
    description: "Salamandra acuática única y fascinante.",
    category: "Anfibios",
    inStock: false,
    care: "Intermedio"
  },
  {
    id: 6,
    name: "Camaleón Velado",
    species: "Chamaeleo calyptratus",
    price: 180,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    description: "Camaleón colorido con capacidad de cambiar de color.",
    category: "Reptiles",
    inStock: true,
    care: "Avanzado"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<Animal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["Todos", "Reptiles", "Arácnidos", "Anfibios"];

  const filteredAnimals = selectedCategory === "Todos" 
    ? EXOTIC_ANIMALS 
    : EXOTIC_ANIMALS.filter(animal => animal.category === selectedCategory);

  const addToCart = (animal: Animal) => {
    setCartItems(prev => [...prev, animal]);
    console.log(`Added ${animal.name} to cart`);
  };

  const removeFromCart = (animalId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== animalId));
    console.log(`Removed animal with id ${animalId} from cart`);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen">
      <Header 
        cartItemsCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Products Section */}
      <main className="container mx-auto px-4 py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestro Catálogo Exótico
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada mascota viene con certificado de salud y guía de cuidados completa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-green-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnimals.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No hay animales disponibles en esta categoría.
            </p>
          </div>
        )}
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Index;