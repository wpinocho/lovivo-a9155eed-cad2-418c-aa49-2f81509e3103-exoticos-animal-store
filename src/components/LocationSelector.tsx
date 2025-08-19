import { MapPin, Globe, Building } from "lucide-react";
import { Location } from "@/types/Quote";

interface LocationSelectorProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export const LocationSelector = ({ location, onLocationChange }: LocationSelectorProps) => {
  const countries = [
    "México", "Estados Unidos", "Canadá", "España", "Argentina", "Colombia", "Chile", "Perú"
  ];

  const statesByCountry: { [key: string]: string[] } = {
    "México": ["Ciudad de México", "Jalisco", "Nuevo León", "Yucatán", "Quintana Roo", "Puebla"],
    "Estados Unidos": ["California", "Texas", "Florida", "New York", "Arizona", "Nevada"],
    "Canadá": ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
    "España": ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"],
    "Argentina": ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"],
    "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    "Chile": ["Santiago", "Valparaíso", "Concepción", "Antofagasta"],
    "Perú": ["Lima", "Arequipa", "Trujillo", "Cusco"]
  };

  const handleChange = (field: keyof Location, value: string) => {
    const newLocation = { ...location, [field]: value };
    
    // Reset state and city when country changes
    if (field === 'country') {
      newLocation.state = '';
      newLocation.city = '';
    }
    
    // Reset city when state changes
    if (field === 'state') {
      newLocation.city = '';
    }
    
    onLocationChange(newLocation);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Ubicación de Entrega</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            País
          </label>
          <select
            value={location.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona un país</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-1" />
            Estado/Provincia
          </label>
          <select
            value={location.state}
            onChange={(e) => handleChange('state', e.target.value)}
            disabled={!location.country}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Selecciona un estado</option>
            {location.country && statesByCountry[location.country]?.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
          <input
            type="text"
            value={location.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Ingresa tu ciudad"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
          <input
            type="text"
            value={location.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            placeholder="12345"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};