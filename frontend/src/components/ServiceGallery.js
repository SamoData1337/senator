import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageLightbox from './ImageLightbox';

const ServiceGallery = ({ serviceName, onViewAll }) => {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load images for the specific service category
  useEffect(() => {
    const loadServiceImages = async () => {
      try {
        const categorySlug = createSlug(serviceName);
        const categoryImages = await loadCategoryImages(categorySlug);
        setProjects(categoryImages);
      } catch (error) {
        console.error('Error loading service images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceName) {
      loadServiceImages();
    }
  }, [serviceName]);

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
  
  // Slider configuration - 3 images per slide
  const imagesPerSlide = 3;
  const totalSlides = Math.ceil((projects?.length || 0) / imagesPerSlide);
  
  const getCurrentSlideProjects = () => {
    if (!projects) return [];
    const startIndex = currentSlide * imagesPerSlide;
    return projects.slice(startIndex, startIndex + imagesPerSlide);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const openLightbox = (slideIndex) => {
    const globalIndex = currentSlide * imagesPerSlide + slideIndex;
    setSelectedImageIndex(globalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setSelectedImageIndex(
      selectedImageIndex === 0 ? (projects?.length || 1) - 1 : selectedImageIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex(
      selectedImageIndex === (projects?.length || 1) - 1 ? 0 : selectedImageIndex + 1
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
        <div className="relative mb-8">
          {/* Slider Container */}
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentSlideProjects().map((project, index) => (
                <div
                  key={`${currentSlide}-${project.id}-${index}`}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.url}
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
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                aria-label="Previous slide"
              >
                <span className="text-black font-bold text-xl">‹</span>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                aria-label="Next slide"
              >
                <span className="text-black font-bold text-xl">›</span>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-yellow-400 scale-110'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          {totalSlides > 1 && (
            <div className="text-center mt-2">
              <span className="text-slate-400 text-sm">
                {currentSlide + 1} z {totalSlides}
              </span>
            </div>
          )}
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

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        image={projects?.[selectedImageIndex]}
        onPrevious={projects?.length > 1 ? goToPrevious : null}
        onNext={projects?.length > 1 ? goToNext : null}
        showNavigation={projects?.length > 1}
      />
    </div>
  );
};

export default ServiceGallery;