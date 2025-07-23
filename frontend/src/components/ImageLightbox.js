import React from 'react';

const ImageLightbox = ({ isOpen, onClose, image, onPrevious, onNext, showNavigation = false }) => {
  if (!isOpen || !image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && onPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && onNext) {
      onNext();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={handleBackdropClick}
      />
      
      {/* Image Container */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {/* Navigation Arrows */}
        {showNavigation && onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
            aria-label="Previous image"
          >
            <span className="text-black font-bold text-xl">‹</span>
          </button>
        )}
        
        {showNavigation && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400/90 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
            aria-label="Next image"
          >
            <span className="text-black font-bold text-xl">›</span>
          </button>
        )}
        
        {/* Main Image */}
        <img
          src={image.image || image.src}
          alt={image.title || image.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-bold text-lg mb-1">
            {image.title || image.alt}
          </h3>
          {image.description && (
            <p className="text-slate-300 text-sm">
              {image.description}
            </p>
          )}
        </div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <span className="text-white text-2xl">×</span>
      </button>
    </div>
  );
};

export default ImageLightbox;