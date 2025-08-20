import { MapPin, Building } from "lucide-react";
import { Address } from "@/types/Checkout";

interface ShippingAddressFormProps {
  shippingAddress: Address;
  onShippingAddressChange: (address: Address) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ShippingAddressForm = ({ 
  shippingAddress, 
  onShippingAddressChange, 
  onNext, 
  onPrev 
}: ShippingAddressFormProps) => {
  const countries = ["México", "Estados Unidos", "Canadá", "España"];
  const states = ["Ciudad de México", "Jalisco", "Nuevo León", "Yucatán", "Quintana Roo"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingAddress.firstName && shippingAddress.lastName && shippingAddress.address1 && 
        shippingAddress.city && shippingAddress.state && shippingAddress.zipCode) {
      onNext();
    }
  };

  const handleChange = (field: keyof Address, value: string) => {
    onShippingAddressChange({ ...shippingAddress, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Dirección de Envío</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Building className="w-4 h-4 inline mr-1" />
          Empresa (opcional)
        </label>
        <input
          type="text"
          value={shippingAddress.company}
          onChange={(e) => handleChange('company', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección *
        </label>
        <input
          type="text"
          required
          value={shippingAddress.address1}
          onChange={(e) => handleChange('address1', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Calle y número"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección 2 (opcional)
        </label>
        <input
          type="text"
          value={shippingAddress.address2}
          onChange={(e) => handleChange('address2', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Apartamento, suite, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <select
            required
            value={shippingAddress.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código Postal *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          País *
        </label>
        <select
          required
          value={shippingAddress.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Continuar a Pago
        </button>
      </div>
    </form>
  );
};