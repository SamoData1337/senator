import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, autoSlide = true, slideInterval = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    if (autoSlide && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === images.length - 1 ? 0 : prevSlide + 1
        );
      }, slideInterval);

      return () => clearInterval(timer);
    }
  }, [autoSlide, slideInterval, images.length, currentSlide]);

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!images || images.length === 0) {
    return <div className="text-center text-slate-400">No images available</div>;
  }

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
      {/* Main Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            
            {/* Image Caption */}
            {image.caption && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-medium text-sm">{image.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group"
            aria-label="Previous image"
          >
            <span className="text-black font-bold text-lg group-hover:transform group-hover:-translate-x-0.5 transition-transform">‹</span>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group"
            aria-label="Next image"
          >
            <span className="text-black font-bold text-lg group-hover:transform group-hover:translate-x-0.5 transition-transform">›</span>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-yellow-400 scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1">
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default ImageSlider;