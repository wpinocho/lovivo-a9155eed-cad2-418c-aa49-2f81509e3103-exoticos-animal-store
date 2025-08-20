import { ShoppingBag, Truck, Calculator } from "lucide-react";
import { Animal } from "@/types/Animal";

interface OrderSummaryProps {
  items: Animal[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderSummary = ({ items, subtotal, shipping, tax, total }: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Resumen del Pedido</h3>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item: Animal, index: number) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
              <p className="text-xs text-gray-500">{item.species}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal ({items.length} artículos)</span>
          <span className="font-semibold">${subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Envío
          </span>
          <span className="font-semibold">
            {shipping === 0 ? "GRATIS" : `$${shipping}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-1">
            <Calculator className="w-4 h-4" />
            Impuestos (16%)
          </span>
          <span className="font-semibold">${tax}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-emerald-600">${total}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {shipping === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700 font-medium">
            🎉 ¡Envío gratuito! Tu pedido supera los $300
          </p>
        </div>
      )}

      {/* Estimated Delivery */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Truck className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Entrega Estimada</span>
        </div>
        <p className="text-sm text-blue-700">3-5 días hábiles</p>
        <p className="text-xs text-blue-600 mt-1">
          Transporte especializado para animales exóticos
        </p>
      </div>
    </div>
  );
};