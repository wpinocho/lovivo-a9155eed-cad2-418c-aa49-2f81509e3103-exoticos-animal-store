import { X, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Animal } from "@/types/Animal";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Animal[];
  onRemoveItem: (id: number) => void;
  totalPrice: number;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem, totalPrice }: CartProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length > 0) {
      onClose();
      navigate("/checkout", { 
        state: { 
          cartItems: items, 
          totalPrice: totalPrice 
        } 
      });
      console.log("Redirecting to checkout with items:", items);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Carrito ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm mt-2">
                Agrega algunos animales exóticos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.species}</p>
                    <p className="text-lg font-bold text-green-600">${item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-green-600">${totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Proceder al Pago
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Envío gratuito en compras mayores a $300
            </p>
          </div>
        )}
      </div>
    </div>
  );
};