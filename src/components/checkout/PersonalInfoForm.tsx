import { User, Mail, Phone } from "lucide-react";
import { PersonalInfo } from "@/types/Checkout";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onPersonalInfoChange: (info: PersonalInfo) => void;
  onNext: () => void;
}

export const PersonalInfoForm = ({ personalInfo, onPersonalInfoChange, onNext }: PersonalInfoFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalInfo.firstName && personalInfo.lastName && personalInfo.email && personalInfo.phone) {
      onNext();
    }
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onPersonalInfoChange({ ...personalInfo, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            required
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido *
          </label>
          <input
            type="text"
            required
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Tu apellido"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 inline mr-1" />
          Email *
        </label>
        <input
          type="email"
          required
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Phone className="w-4 h-4 inline mr-1" />
          Teléfono *
        </label>
        <input
          type="tel"
          required
          value={personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="+52 55 1234 5678"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
      >
        Continuar a Dirección de Envío
      </button>
    </form>
  );
};