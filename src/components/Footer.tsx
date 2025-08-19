import { Heart, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🦎</span>
              <h3 className="text-xl font-bold">Exotic Pets Paradise</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Tu tienda de confianza para animales exóticos. 
              Más de 10 años de experiencia cuidando mascotas únicas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Reptiles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Arácnidos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Anfibios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accesorios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Consulta Veterinaria</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guías de Cuidado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instalación de Terrarios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantía de Salud</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Av. Exótica 123, Ciudad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@exoticpets.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p className="flex items-center justify-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> 
            para los amantes de animales exóticos
          </p>
          <p className="mt-2 text-sm">
            © 2024 Exotic Pets Paradise. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};