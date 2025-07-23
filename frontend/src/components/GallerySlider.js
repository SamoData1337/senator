import React, { useState } from 'react';

const GallerySlider = ({ projects, title = "Naše realizácie" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl text-slate-600 mb-4">🏗️</div>
        <p className="text-slate-400">Momentálne pripravujeme galériu pre túto kategóriu</p>
      </div>
    );
  }

  // Show 3 items per slide (1 row)
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(projects.length / itemsPerSlide);
  
  const getCurrentSlideProjects = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return projects.slice(startIndex, startIndex + itemsPerSlide);
  };

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const openLightbox = (projectIndex) => {
    const globalIndex = currentSlide * itemsPerSlide + projectIndex;
    setSelectedImageIndex(globalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex(
      selectedImageIndex === 0 ? projects.length - 1 : selectedImageIndex - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex(
      selectedImageIndex === projects.length - 1 ? 0 : selectedImageIndex + 1
    );
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-slate-300 text-lg">Pozrite si galériu našich dokončených projektov</p>
      </div>

      {/* Gallery Container */}
      <div className="relative">
        {/* Projects Grid - 2 rows, 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentSlideProjects().map((project, index) => (
            <div
              key={`${currentSlide}-${project.id}-${index}`}
              className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-sm mb-1">{project.title}</h3>
                  <p className="text-slate-300 text-xs">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
              aria-label="Previous slide"
            >
              <span className="text-black font-bold text-xl">‹</span>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
              aria-label="Next slide"
            >
              <span className="text-black font-bold text-xl">›</span>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
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
        <div className="text-center mt-4">
          <span className="text-slate-400 text-sm">
            {currentSlide + 1} z {totalSlides}
          </span>
        </div>
      )}
    </div>
  );
};

export default GallerySlider;