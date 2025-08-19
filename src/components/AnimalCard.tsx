import { ShoppingCart, Heart, Info } from "lucide-react";
import { Animal } from "@/types/Animal";
import { useState } from "react";

interface AnimalCardProps {
  animal: Animal;
  onAddToCart: (animal: Animal) => void;
}

export const AnimalCard = ({ animal, onAddToCart }: AnimalCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getCareColor = (care: string) => {
    switch (care) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isLiked 
              ? "bg-red-500 text-white" 
              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
        </button>
        
        {!animal.inStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Agotado
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCareColor(animal.care)}`}>
            {animal.care}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 italic mb-2">{animal.species}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{animal.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${animal.price}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {animal.category}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Info className="w-4 h-4" />
            Detalles
          </button>
          
          <button
            onClick={() => animal.inStock && onAddToCart(animal)}
            disabled={!animal.inStock}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              animal.inStock
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {animal.inStock ? "Agregar" : "Agotado"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Información adicional:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Especie: {animal.species}</li>
              <li>• Nivel de cuidado: {animal.care}</li>
              <li>• Categoría: {animal.category}</li>
              <li>• {animal.description}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};