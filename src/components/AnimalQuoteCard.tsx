import { Package, Truck, Shield, AlertTriangle, Clock, DollarSign } from "lucide-react";
import { QuoteResult } from "@/types/Quote";

interface AnimalQuoteCardProps {
  quote: QuoteResult;
}

export const AnimalQuoteCard = ({ quote }: AnimalQuoteCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
        <h3 className="text-xl font-bold">{quote.animalName}</h3>
        <p className="text-emerald-100">Cotización detallada</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Precio base (x{quote.quantity})</span>
            <span className="font-semibold">${quote.subtotal}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Envío
            </span>
            <span className="font-semibold">${quote.shippingCost}</span>
          </div>
          
          {quote.permitCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Permisos
              </span>
              <span className="font-semibold">${quote.permitCost}</span>
            </div>
          )}
          
          {quote.setupCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <Package className="w-4 h-4" />
                Instalación
              </span>
              <span className="font-semibold">${quote.setupCost}</span>
            </div>
          )}
          
          {quote.insuranceCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Seguro</span>
              <span className="font-semibold">${quote.insuranceCost}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Impuestos ({(quote.taxRate * 100).toFixed(1)}%)</span>
            <span className="font-semibold">${quote.taxes}</span>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-emerald-600">${quote.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Tiempo de Entrega</span>
          </div>
          <p className="text-blue-700">{quote.estimatedDelivery}</p>
        </div>

        {/* Special Requirements */}
        {quote.specialRequirements.length > 0 && (
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Requisitos Especiales</span>
            </div>
            <ul className="text-amber-700 text-sm space-y-1">
              {quote.specialRequirements.map((req, index) => (
                <li key={index}>• {req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5" />
          Proceder con esta Cotización
        </button>
      </div>
    </div>
  );
};