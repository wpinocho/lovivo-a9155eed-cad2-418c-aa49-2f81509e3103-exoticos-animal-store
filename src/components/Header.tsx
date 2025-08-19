import { ShoppingCart, Heart, User, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🦎</span>
            <h1 className="text-2xl font-bold text-green-600">
              Exotic Pets Paradise
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
              Inicio
            </Link>
            <Link to="/cotizador" className="text-gray-700 hover:text-green-600 font-medium flex items-center gap-1">
              <Calculator className="w-4 h-4" />
              Cotizador
            </Link>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Cuidados
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Contacto
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};