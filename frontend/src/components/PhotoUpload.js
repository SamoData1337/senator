import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { translations } from '../data/mock';

const PhotoUpload = ({ onPhotoUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('vstavane-skrine');
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Get available categories from mock data
  const categories = mockData.services.map(service => ({
    id: service.slug,
    name: service.title.sk
  }));

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const uploadPromises = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `photos/${selectedCategory}/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(prev => ({
                ...prev,
                [i]: progress
              }));
            },
            (error) => {
              console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({
                  url: downloadURL,
                  fileName: fileName,
                  category: selectedCategory,
                  uploadedAt: new Date().toISOString()
                });
              } catch (error) {
                reject(error);
              }
            }
          );
        })
      );
    }

    try {
      const uploadResults = await Promise.all(uploadPromises);
      console.log('All uploads completed:', uploadResults);
      
      // Save metadata to localStorage for now (later can be saved to database)
      const existingPhotos = JSON.parse(localStorage.getItem('uploadedPhotos') || '[]');
      const updatedPhotos = [...existingPhotos, ...uploadResults];
      localStorage.setItem('uploadedPhotos', JSON.stringify(updatedPhotos));
      
      // Reset form
      setSelectedFiles([]);
      setUploadProgress({});
      
      // Notify parent component
      if (onPhotoUploaded) {
        onPhotoUploaded();
      }
      
      alert('Všetky fotografie boli úspešne nahrané!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Chyba pri nahrávaní fotografií. Skúste to znova.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Nahrať nové fotografie</h2>
        
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Kategória služby
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-yellow-500 bg-yellow-500/10'
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-slate-400">
            <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg mb-2">
              Pretiahnite fotografie sem alebo kliknite pre výber
            </p>
            <p className="text-sm">PNG, JPG, GIF až do 10MB</p>
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">
              Vybrané súbory ({selectedFiles.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-10 w-10 rounded object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{file.name}</p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploading && uploadProgress[index] !== undefined && (
                      <div className="text-xs text-yellow-500">
                        {Math.round(uploadProgress[index])}%
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={uploadFiles}
            disabled={selectedFiles.length === 0 || uploading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {uploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                Nahráva sa...
              </div>
            ) : (
              `Nahrať ${selectedFiles.length} fotografií`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;