import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../data/mock';
import Modal from './Modal';
import ServiceGallery from './ServiceGallery';

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Všetky');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = t('portfolio.categories');
  
  const filteredItems = activeCategory === 'Všetky' || activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  // Map category names to service names for modal
  const categoryToService = {
    'Vstavané skrine': 'Vstavané skrine',
    'Šatníky': 'Šatníky',
    'Deliace priečky': 'Deliace priečky', 
    'Prechodové dvere': 'Prechodové dvere',
    'Nábytok': 'Komody, nábytok a iné',
    'Postele': 'Postele'
  };

  const handleProjectClick = (project) => {
    const serviceName = categoryToService[project.category] || project.category;
    setSelectedCategory(serviceName);
    setIsModalOpen(true);
  };

  const handleViewAll = () => {
    setIsModalOpen(false);
    // Convert service name to slug and navigate
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

    const slug = createSlug(selectedCategory);
    window.location.href = `/services/${slug}`;
  };

  const getProjectsForCategory = (serviceName) => {
    const category = Object.keys(categoryToService).find(key => categoryToService[key] === serviceName);
    return portfolioItems.filter(item => item.category === category);
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full border border-yellow-500/50 mb-6">
            <span className="text-black text-sm font-bold">
              {t('portfolio.subtitle')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            {t('portfolio.title')}
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70 hover:text-yellow-400 border border-slate-700 hover:border-yellow-400/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProjectClick(item)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Click to view gallery indicator */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm">📸</span>
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-yellow-400/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-400 transition-colors">
                    <span className="text-black text-xl font-bold">↗</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-sm text-yellow-400 mb-2 font-medium">{item.category}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Gallery Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          size="full"
        >
          {selectedCategory && (
            <ServiceGallery 
              serviceName={selectedCategory}
              projects={getProjectsForCategory(selectedCategory)}
              onViewAll={handleViewAll}
            />
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Portfolio;