import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { getCategoryDisplayName, createSlug } from '../utils/imageLoader';
import Modal from './Modal';
import ServiceGallery from './ServiceGallery';

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Všetky');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = t('portfolio.categories');

  // Load images from folder structure on component mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const availableCategories = getAvailableCategories();
        const allImages = await loadAllPortfolioImages(availableCategories);
        setPortfolioItems(allImages);
      } catch (error) {
        console.error('Error loading portfolio images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);
  
  const filteredItems = activeCategory === 'Všetky' || activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => getCategoryDisplayName(item.category) === activeCategory);

  // Map category names to service names for modal
  const categoryToService = {
    'Vstavané skrine': 'Vstavané skrine',
    'Šatníky': 'Šatníky',
    'Deliace priečky': 'Deliace priečky', 
    'Prechodové dvere': 'Prechodové dvere',
    'Komody a nábytok': 'Komody a nábytok',
    'Postele': 'Postele'
  };

  const handleProjectClick = (project) => {
    const displayName = getCategoryDisplayName(project.category);
    const serviceName = categoryToService[displayName] || displayName;
    setSelectedCategory(serviceName);
    setIsModalOpen(true);
  };

  const handleViewAll = () => {
    setIsModalOpen(false);
    const slug = createSlug(selectedCategory);
    window.location.href = `/services/${slug}`;
  };

  const getProjectsForCategory = (serviceName) => {
    const category = Object.keys(categoryToService).find(key => categoryToService[key] === serviceName);
    const categorySlug = createSlug(category);
    return portfolioItems.filter(item => item.category === categorySlug);
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <span className="ml-3 text-slate-400">Načítavanie realizácií...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              {activeCategory === 'Všetky' ? 'Žiadne realizácie' : `Žiadne realizácie v kategórii "${activeCategory}"`}
            </p>
          </div>
        ) : (
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
                    src={item.url}
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
                  <div className="text-sm text-yellow-400 mb-2 font-medium">{getCategoryDisplayName(item.category)}</div>
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
        )}

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