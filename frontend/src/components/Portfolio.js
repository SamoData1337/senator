import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../data/mock';
import Modal from './Modal';
import ServiceGallery from './ServiceGallery';

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Všetky');

  const categories = t('portfolio.categories');
  
  const filteredItems = activeCategory === 'Všetky' || activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

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
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
      </div>
    </section>
  );
};

export default Portfolio;