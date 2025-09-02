import React, { useState, useEffect } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';
import { translations } from '../data/mock';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = [
    { id: 'all', name: 'Všetky fotografie' },
    ...mockData.services.map(service => ({
      id: service.slug,
      name: service.title.sk
    }))
  ];

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    try {
      const uploadedPhotos = JSON.parse(localStorage.getItem('uploadedPhotos') || '[]');
      setPhotos(uploadedPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const deletePhoto = async (photo) => {
    if (!window.confirm('Naozaj chcete vymazať túto fotografiu?')) {
      return;
    }

    try {
      // Delete from Firebase Storage
      const photoRef = ref(storage, `photos/${photo.category}/${photo.fileName}`);
      await deleteObject(photoRef);

      // Remove from localStorage
      const updatedPhotos = photos.filter(p => p.fileName !== photo.fileName);
      localStorage.setItem('uploadedPhotos', JSON.stringify(updatedPhotos));
      setPhotos(updatedPhotos);

      alert('Fotografia bola úspešne vymazaná!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Chyba pri mazaní fotografie. Skúste to znova.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('sk-SK');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-2 text-slate-400">Načítavanie...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Správa fotografií</h2>
          <div className="text-sm text-slate-400">
            Celkom: {photos.length} fotografií
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Filtrovať podľa kategórie
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-slate-400">
              {selectedCategory === 'all' ? 'Žiadne fotografie' : 'Žiadne fotografie v tejto kategórii'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div key={index} className="group relative bg-slate-700 rounded-lg overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={photo.url}
                    alt="Uploaded photo"
                    className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                </div>
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-full"
                      title="Zobraziť"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deletePhoto(photo)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      title="Vymazať"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Photo info */}
                <div className="p-3">
                  <p className="text-xs text-slate-400 truncate">
                    {getCategoryName(photo.category)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(photo.uploadedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto.url}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
              <p className="font-medium">{getCategoryName(selectedPhoto.category)}</p>
              <p className="text-sm text-slate-300">{formatDate(selectedPhoto.uploadedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;