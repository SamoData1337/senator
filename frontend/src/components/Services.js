import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../data/mock';
import Modal from './Modal';
import ServiceGallery from './ServiceGallery';

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map service titles to portfolio categories
  const serviceToCategory = {
    'Vstavané skrine': 'Vstavané skrine',
    'Šatníky': 'Šatníky',
    'Deliace priečky': 'Deliace priečky', 
    'Prechodové dvere': 'Prechodové dvere',
    'Komody, nábytok a iné': 'Nábytok',
    'Postele': 'Postele'
  };

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  // Function to convert Slovak text to URL-friendly slug
  const createSlug = (text) => {
    const accents = {
      'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
      'í': 'i', 'ľ': 'l', 'ĺ': 'l', 'ň': 'n', 'ó': 'o', 'ô': 'o',
      'ŕ': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y',
      'ž': 'z', 'Á': 'A', 'Ä': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E',
      'Ě': 'E', 'Í': 'I', 'Ľ': 'L', 'Ĺ': 'L', 'Ň': 'N', 'Ó': 'O',
      'Ô': 'O', 'Ŕ': 'R', 'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U',
      'Ý': 'Y', 'Ž': 'Z'
    };
    
    return text
      .split('')
      .map(char => accents[char] || char)
      .join('')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleViewAll = () => {
    setIsModalOpen(false);
    // Navigate to dedicated service page with proper slug
    const slug = createSlug(selectedService);
    window.location.href = `/services/${slug}`;
  };

  const getProjectsForService = (serviceTitle) => {
    const category = serviceToCategory[serviceTitle];
    return portfolioItems.filter(item => item.category === category);
  };

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full border border-yellow-500/50 mb-6">
            <span className="text-black text-sm font-bold">
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
              onClick={() => handleServiceClick(service.title)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-slate-800/70 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300 shadow-lg">
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-slate-400 group-hover:text-yellow-400 transition-colors">
                <span className="text-sm font-medium">Zobraziť galériu</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Service Gallery Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          size="full"
        >
          {selectedService && (
            <ServiceGallery 
              serviceName={selectedService}
              projects={getProjectsForService(selectedService)}
              onViewAll={handleViewAll}
            />
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Services;