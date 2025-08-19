import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingAnimals = [
    { emoji: "🦎", delay: "0s", duration: "6s" },
    { emoji: "🐍", delay: "1s", duration: "8s" },
    { emoji: "🕷️", delay: "2s", duration: "7s" },
    { emoji: "🦂", delay: "0.5s", duration: "9s" },
    { emoji: "🐸", delay: "1.5s", duration: "5s" },
    { emoji: "🦋", delay: "3s", duration: "6s" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-l from-blue-600/10 to-green-600/10 transition-all duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Animals */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingAnimals.map((animal, index) => (
          <div
            key={index}
            className="absolute text-4xl opacity-30 animate-bounce"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
              animationDelay: animal.delay,
              animationDuration: animal.duration,
            }}
          >
            {animal.emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="inline-block animate-pulse">🦎</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Exotic
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Paradise
              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubre el mundo más fascinante de mascotas exóticas. 
              <span className="text-emerald-300 font-semibold"> Reptiles únicos</span>, 
              <span className="text-purple-300 font-semibold"> arácnidos increíbles</span> y 
              <span className="text-pink-300 font-semibold"> anfibios extraordinarios</span> te esperan.
            </p>
          </div>

          {/* Animated Stats */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[
                { number: "500+", label: "Especies Únicas", icon: "🦎" },
                { number: "10+", label: "Años de Experiencia", icon: "⭐" },
                { number: "1000+", label: "Clientes Felices", icon: "❤️" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated CTA Buttons */}
          <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full text-lg hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25">
                <span className="flex items-center gap-2">
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Guías de Cuidado
                </span>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl transition-all duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
        }}
      />
      <div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-xl transition-all duration-700"
        style={{
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
        }}
      />
    </div>
  );
};