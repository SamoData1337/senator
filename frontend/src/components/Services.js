import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-800/50 rounded-full border border-amber-700/50 mb-6">
            <span className="text-amber-200 text-sm font-medium">
              {t('services.subtitle')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('services.title')}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('services.items').map((service, index) => (
            <div
              key={index}
              className="group bg-amber-800/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/30 hover:border-amber-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-amber-800/30"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-amber-700 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-300 shadow-lg">
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-100 transition-colors">
                {service.title}
              </h3>
              <p className="text-amber-200 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-amber-300 group-hover:text-white transition-colors cursor-pointer">
                <span className="text-sm font-medium">Zistiť viac</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;