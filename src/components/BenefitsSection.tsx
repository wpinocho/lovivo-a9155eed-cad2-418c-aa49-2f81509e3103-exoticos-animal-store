import { Shield, Heart, Award, Truck, Phone, BookOpen, Users, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const BenefitsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Shield,
      title: "Garantía de Salud",
      description: "Todos nuestros animales vienen con certificado veterinario y garantía de 30 días.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      delay: 0,
    },
    {
      icon: Heart,
      title: "Cuidado Experto",
      description: "Más de 10 años de experiencia cuidando y criando animales exóticos.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      delay: 200,
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Seleccionamos solo los mejores ejemplares de criadores certificados.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      delay: 400,
    },
    {
      icon: Truck,
      title: "Envío Especializado",
      description: "Transporte seguro y climatizado para garantizar el bienestar animal.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: 600,
    },
    {
      icon: Phone,
      title: "Soporte 24/7",
      description: "Asesoría veterinaria y de cuidados disponible las 24 horas del día.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      delay: 800,
    },
    {
      icon: BookOpen,
      title: "Guías Completas",
      description: "Manuales detallados de cuidado y alimentación para cada especie.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      delay: 1000,
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Únete a nuestra comunidad de más de 1000 amantes de animales exóticos.",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      delay: 1200,
    },
    {
      icon: Sparkles,
      title: "Experiencia Única",
      description: "Cada animal es especial y viene con su historia y características únicas.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      delay: 1400,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, benefits[index].delay);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">¿Por qué elegirnos?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Beneficios
            </span>
            <br />
            <span className="text-gray-700">Extraordinarios</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre por qué somos la opción número uno para los amantes de animales exóticos. 
            Cada detalle está pensado para brindarte la mejor experiencia.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-10 opacity-0 scale-95'
                }`}
              >
                {/* Card */}
                <div className={`relative ${benefit.bgColor} rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-white/50 backdrop-blur-sm`}>
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
                  
                  {/* Icon Container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {benefit.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Particles on Hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-1000"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Number */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex -space-x-2">
              {['🦎', '🐍', '🕷️', '🦂'].map((emoji, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xl animate-bounce shadow-lg"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-800">¿Listo para comenzar tu aventura?</p>
              <p className="text-gray-600">Explora nuestro catálogo y encuentra tu compañero perfecto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};