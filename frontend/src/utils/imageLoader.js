// Utility functions for dynamic image loading from folder structure

/**
 * Dynamically discover images in a category folder
 * @param {string} category - The service category (e.g., 'vstavane-skrine')
 * @param {number} maxImages - Maximum number of images to check (default: 10)
 * @returns {Promise<Array>} - Array of image objects with url and metadata
 */
export const loadCategoryImages = async (category, maxImages = 15) => {
  const images = [];
  const basePath = `/images/portfolio/${category}`;
  
  // Check for actual existing images by trying to load them
  const checkImageExists = (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imagePath;
    });
  };
  
  // Check images sequentially to maintain order
  for (let i = 1; i <= maxImages; i++) {
    const imagePath = `${basePath}/image-${i}.jpg`;
    const exists = await checkImageExists(imagePath);
    
    if (exists) {
      images.push({
        id: `${category}-${i}`,
        url: imagePath,
        category: category,
        filename: `image-${i}.jpg`,
        title: `${getCategoryDisplayName(category)} - Foto ${i}`,
        description: `Realizácia v kategórii ${getCategoryDisplayName(category)}`
      });
    } else {
      // If image doesn't exist, stop checking (assumes images are numbered sequentially)
      break;
    }
  }
  
  return images;
};

/**
 * Load all images from multiple categories
 * @param {Array<string>} categories - Array of category names
 * @returns {Promise<Array>} - Array of all images from all categories
 */
export const loadAllPortfolioImages = async (categories) => {
  const allImages = [];
  
  for (const category of categories) {
    const categoryImages = await loadCategoryImages(category);
    allImages.push(...categoryImages);
  }
  
  return allImages;
};

/**
 * Get display name for category slug
 * @param {string} categorySlug - Category slug (e.g., 'vstavane-skrine')
 * @returns {string} - Display name (e.g., 'Vstavané skrine')
 */
export const getCategoryDisplayName = (categorySlug) => {
  const categoryNames = {
    'vstavane-skrine': 'Vstavané skrine',
    'satniky': 'Šatníky', 
    'deliace-priecky': 'Deliace priečky',
    'prechodove-dvere': 'Prechodové dvere',
    'komody-a-nabytok': 'Komody a nábytok',
    'postele': 'Postele'
  };
  
  return categoryNames[categorySlug] || categorySlug;
};

/**
 * Get all available categories
 * @returns {Array<string>} - Array of category slugs
 */
export const getAvailableCategories = () => {
  return [
    'vstavane-skrine',
    'satniky', 
    'deliace-priecky',
    'prechodove-dvere',
    'komody-a-nabytok',
    'postele'
  ];
};

/**
 * Create slug from service title (matches the function used in Services.js)
 * @param {string} title - Service title
 * @returns {string} - URL-friendly slug
 */
export const createSlug = (title) => {
  const accents = {
    'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
    'í': 'i', 'ľ': 'l', 'ĺ': 'l', 'ň': 'n', 'ó': 'o', 'ô': 'o',
    'ŕ': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y',
    'ž': 'z', 'Á': 'A', 'Ä': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E',
    'Ě': 'E', 'Í': 'I', 'Ľ': 'L', 'Ĺ': 'L', 'Ň': 'N', 'Ó': 'O',
    'Ô': 'O', 'Ŕ': 'R', 'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U',
    'Ý': 'Y', 'Ž': 'Z'
  };
  
  return title
    .split('')
    .map(char => accents[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};