import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 mb-6">
            <span className="text-zinc-300 text-sm font-medium">
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
              className="group bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-xl flex items-center justify-center mb-6 group-hover:from-zinc-600 group-hover:to-zinc-500 transition-all duration-300">
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-zinc-200 transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors cursor-pointer">
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