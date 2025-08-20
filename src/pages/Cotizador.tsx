import { useState } from "react";
import { Calculator, Plus, Minus, Settings, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationSelector } from "@/components/LocationSelector";
import { AnimalQuoteCard } from "@/components/AnimalQuoteCard";
import { Animal } from "@/types/Animal";
import { Location, QuoteRequest, QuoteResult, ShippingZone } from "@/types/Quote";

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
    inStock: true,
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

const SHIPPING_ZONES: ShippingZone[] = [
  {
    name: "Nacional",
    countries: ["México"],
    baseCost: 50,
    perAnimalCost: 25,
    deliveryDays: 3,
    restrictions: []
  },
  {
    name: "América del Norte",
    countries: ["Estados Unidos", "Canadá"],
    baseCost: 150,
    perAnimalCost: 75,
    deliveryDays: 7,
    restrictions: ["Requiere certificado CITES", "Inspección veterinaria"]
  },
  {
    name: "América Latina",
    countries: ["Argentina", "Colombia", "Chile", "Perú"],
    baseCost: 200,
    perAnimalCost: 100,
    deliveryDays: 10,
    restrictions: ["Certificado sanitario", "Permiso de importación"]
  },
  {
    name: "Europa",
    countries: ["España"],
    baseCost: 300,
    perAnimalCost: 150,
    deliveryDays: 14,
    restrictions: ["Certificado CITES", "Cuarentena obligatoria", "Seguro internacional"]
  }
];

const Cotizador = () => {
  const [selectedAnimals, setSelectedAnimals] = useState<{ [key: number]: number }>({});
  const [location, setLocation] = useState<Location>({
    country: "",
    state: "",
    city: "",
    zipCode: ""
  });
  const [includeSetup, setIncludeSetup] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [quotes, setQuotes] = useState<QuoteResult[]>([]);

  const updateAnimalQuantity = (animalId: number, quantity: number) => {
    if (quantity <= 0) {
      const newSelected = { ...selectedAnimals };
      delete newSelected[animalId];
      setSelectedAnimals(newSelected);
    } else {
      setSelectedAnimals(prev => ({ ...prev, [animalId]: quantity }));
    }
  };

  const calculateQuote = (animal: Animal, quantity: number, location: Location): QuoteResult => {
    const shippingZone = SHIPPING_ZONES.find(zone => 
      zone.countries.includes(location.country)
    ) || SHIPPING_ZONES[0];

    const basePrice = animal.price;
    const subtotal = basePrice * quantity;
    const shippingCost = shippingZone.baseCost + (shippingZone.perAnimalCost * quantity);
    
    // Permit costs based on animal type and location
    let permitCost = 0;
    if (location.country !== "México") {
      permitCost = animal.category === "Reptiles" ? 100 : 
                   animal.category === "Arácnidos" ? 50 : 75;
    }

    const setupCost = includeSetup ? Math.round(subtotal * 0.15) : 0;
    const insuranceCost = includeInsurance ? Math.round(subtotal * 0.08) : 0;
    
    // Tax rates by country
    const taxRates: { [key: string]: number } = {
      "México": 0.16,
      "Estados Unidos": 0.08,
      "Canadá": 0.13,
      "España": 0.21,
      "Argentina": 0.21,
      "Colombia": 0.19,
      "Chile": 0.19,
      "Perú": 0.18
    };

    const taxRate = taxRates[location.country] || 0.16;
    const taxableAmount = subtotal + shippingCost + permitCost + setupCost + insuranceCost;
    const taxes = Math.round(taxableAmount * taxRate);
    const total = taxableAmount + taxes;

    const estimatedDelivery = `${shippingZone.deliveryDays}-${shippingZone.deliveryDays + 3} días hábiles`;
    
    const specialRequirements = [
      ...shippingZone.restrictions,
      ...(animal.care === "Avanzado" ? ["Requiere experiencia previa"] : []),
      ...(animal.category === "Anfibios" ? ["Ambiente controlado durante transporte"] : [])
    ];

    return {
      animalId: animal.id,
      animalName: animal.name,
      basePrice,
      quantity,
      subtotal,
      shippingCost,
      permitCost,
      setupCost,
      insuranceCost,
      taxRate,
      taxes,
      total,
      estimatedDelivery,
      specialRequirements
    };
  };

  const generateQuotes = () => {
    if (!location.country || Object.keys(selectedAnimals).length === 0) {
      alert("Por favor selecciona al menos un animal y completa la ubicación");
      return;
    }

    const newQuotes: QuoteResult[] = [];
    
    Object.entries(selectedAnimals).forEach(([animalId, quantity]) => {
      const animal = EXOTIC_ANIMALS.find(a => a.id === parseInt(animalId));
      if (animal) {
        const quote = calculateQuote(animal, quantity, location);
        newQuotes.push(quote);
      }
    });

    setQuotes(newQuotes);
    console.log("Generated quotes:", newQuotes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header cartItemsCount={0} onCartClick={() => {}} />
      
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center')`,
          }}
        >
          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-cyan-900/80">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse" />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Animals */}
          <div className="absolute inset-0 pointer-events-none">
            {['🦎', '🐍', '🕷️', '🦂', '🐸', '🦋'].map((emoji, index) => (
              <div
                key={index}
                className="absolute text-6xl opacity-20 animate-bounce"
                style={{
                  left: `${10 + (index * 15)}%`,
                  top: `${20 + (index * 10)}%`,
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full animate-spin-slow">
                <Calculator className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                  Cotizador
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
                  Exótico
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
              Obtén cotizaciones precisas para tus animales exóticos favoritos, 
              incluyendo envío, permisos y todos los costos asociados según tu ubicación.
              <span className="block mt-2 text-emerald-200 font-semibold">
                ¡Precios transparentes desde cualquier parte del mundo!
              </span>
            </p>

            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { number: "50+", label: "Países Atendidos", icon: "🌍" },
                { number: "24/7", label: "Soporte Experto", icon: "🔧" },
                { number: "100%", label: "Garantía de Salud", icon: "💚" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group hover:scale-110 transition-all duration-300 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-12">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mx-auto">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
              </div>
              <p className="text-white/60 text-sm mt-2">Desliza para cotizar</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-ping" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location Selector */}
            <LocationSelector location={location} onLocationChange={setLocation} />

            {/* Animal Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Selecciona tus Animales</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXOTIC_ANIMALS.map(animal => (
                  <div key={animal.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={animal.image} 
                        alt={animal.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{animal.name}</h4>
                        <p className="text-sm text-gray-500">{animal.species}</p>
                        <p className="text-lg font-bold text-emerald-600">${animal.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateAnimalQuantity(animal.id, (selectedAnimals[animal.id] || 0) - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {selectedAnimals[animal.id] || 0}
                        </span>
                        <button
                          onClick={() => updateAnimalQuantity(animal.id, (selectedAnimals[animal.id] || 0) + 1)}
                          className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Servicios Adicionales</h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSetup}
                    onChange={(e) => setIncludeSetup(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-semibold text-gray-800">Instalación y Setup</span>
                    <p className="text-sm text-gray-600">Incluye terrario, iluminación y configuración inicial (+15%)</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-semibold text-gray-800">Seguro de Transporte</span>
                    <p className="text-sm text-gray-600">Protección completa durante el envío (+8%)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Generate Quote Button */}
            <button
              onClick={generateQuotes}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Calculator className="w-6 h-6" />
              Generar Cotización
            </button>
          </div>

          {/* Right Column - Quotes */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cotizaciones</h3>
              
              {quotes.length === 0 ? (
                <div className="text-center py-8">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Selecciona animales y genera tu cotización
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map(quote => (
                    <AnimalQuoteCard key={quote.animalId} quote={quote} />
                  ))}
                  
                  {/* Total Summary */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg p-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total General:</span>
                      <span className="text-2xl font-bold">
                        ${quotes.reduce((sum, quote) => sum + quote.total, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cotizador;