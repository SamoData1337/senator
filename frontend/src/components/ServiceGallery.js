import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageLightbox from './ImageLightbox';

const ServiceGallery = ({ serviceName, projects, onViewAll }) => {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const serviceNames = {
    sk: {
      'Vstavané skrine': 'Vstavané skrine',
      'Šatníky': 'Šatníky', 
      'Deliace priečky': 'Deliace priečky',
      'Prechodové dvere': 'Prechodové dvere',
      'Komody, nábytok a iné': 'Komody a nábytok',
      'Postele': 'Postele'
    },
    en: {
      'Vstavané skrine': 'Built-in Wardrobes',
      'Šatníky': 'Wardrobes',
      'Deliace priečky': 'Partition Walls', 
      'Prechodové dvere': 'Sliding Doors',
      'Komody, nábytok a iné': 'Furniture & Dressers',
      'Postele': 'Beds'
    }
  };

  const displayName = serviceNames[language]?.[serviceName] || serviceName;
  
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setSelectedImageIndex(
      selectedImageIndex === 0 ? projects.length - 1 : selectedImageIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex(
      selectedImageIndex === projects.length - 1 ? 0 : selectedImageIndex + 1
    );
  };
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full mb-4">
          <span className="text-black text-sm font-bold">
            Naše realizácie
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          {displayName}
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Pozrite si našu galériu dokončených projektov v kategórii {displayName.toLowerCase()}
        </p>
      </div>

      {/* Gallery Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.slice(0, 6).map((project, index) => (
            <div
              key={project.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Click to enlarge indicator */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm">🔍</span>
                </div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-sm mb-1">{project.title}</h3>
                  <p className="text-slate-300 text-xs">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl text-slate-600 mb-4">🏗️</div>
          <p className="text-slate-400">Momentálne pripravujeme galériu pre túto kategóriu</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onViewAll}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
        >
          Zobraziť všetky projekty
        </button>
        <button
          className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-6 py-3 rounded-lg transition-all duration-300"
        >
          Požiadať o ponuku
        </button>
      </div>
    </div>
  );
};

export default ServiceGallery;