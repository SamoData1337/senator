import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/7614609/pexels-photo-7614609.jpeg"
          alt="Built-in wardrobe"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/60" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNDB2MUgwVjB6TTAgMGgxdjQwSDBWMHoiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+')]" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 backdrop-blur-sm rounded-full border border-yellow-500/50 mb-6">
            <span className="text-black text-sm font-bold">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('#portfolio')}
              className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group shadow-lg"
            >
              {t('hero.cta')}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('#contact')}
              className="border-amber-600 text-amber-100 hover:bg-amber-800/50 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              <span>📞</span>
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;