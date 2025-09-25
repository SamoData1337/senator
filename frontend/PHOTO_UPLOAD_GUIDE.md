# Photo Upload Guide - Folder-based System

## 📁 **Folder Structure**

The website automatically loads images from the following folder structure:

```
/app/frontend/public/images/portfolio/
├── vstavane-skrine/        # Built-in wardrobes
├── satniky/                # Wardrobes  
├── deliace-priecky/        # Partition walls
├── prechodove-dvere/       # Sliding doors
├── komody-a-nabytok/       # Furniture & dressers
└── postele/                # Beds
```

## 📸 **How to Add Photos**

### **Method 1: Direct FTP Upload**
1. Connect to your server via FTP
2. Navigate to `/app/frontend/public/images/portfolio/`
3. Choose the appropriate category folder
4. Upload your images with the naming convention: `image-1.jpg`, `image-2.jpg`, etc.

### **Method 2: Manual File Upload**
1. Access your server file manager
2. Go to the portfolio folder
3. Select the service category
4. Upload images following the naming pattern

## 🏷️ **Image Naming Convention**

**Format:** `image-{number}.{extension}`

**Examples:**
- `image-1.jpg`
- `image-2.png` 
- `image-3.jpeg`
- `image-4.webp`

**Supported formats:** JPG, JPEG, PNG, WebP

## 📂 **Category Mapping**

| Folder Name | Service Category | Display Name |
|-------------|------------------|--------------|
| `vstavane-skrine` | Built-in wardrobes | Vstavané skrine |
| `satniky` | Wardrobes | Šatníky |
| `deliace-priecky` | Partition walls | Deliace priečky |
| `prechodove-dvere` | Sliding doors | Prechodové dvere |
| `komody-a-nabytok` | Furniture | Komody a nábytok |
| `postele` | Beds | Postele |

## ⚡ **How It Works**

1. **Automatic Detection:** Website automatically scans each category folder
2. **Dynamic Loading:** Images are loaded based on sequential naming (image-1, image-2, etc.)
3. **Real-time Updates:** New images appear immediately after upload
4. **No Limits:** Upload any number of images per category
5. **Responsive:** Images automatically resize for different devices

## 📱 **Where Images Appear**

### **Homepage Portfolio Section:**
- Shows all images from all categories
- Filter by category available
- Click to open modal gallery

### **Service Detail Pages:**
- Shows only images for that specific service
- Large gallery slider format
- Lightbox for full-size viewing

### **Modal Galleries:**
- Quick preview when clicking portfolio items
- Filtered by service category
- "View All Projects" link to detail page

## 🚀 **Adding New Images**

1. **Choose Category:** Determine which service the photos belong to
2. **Find Next Number:** Look at existing images to find the next sequential number
3. **Upload:** Add your image as `image-{next-number}.jpg`
4. **Test:** Visit the website to confirm images appear correctly

**Example:** If `vstavane-skrine` folder has `image-1.jpg` through `image-5.jpg`, upload your new image as `image-6.jpg`

## 🔧 **Technical Notes**

- **Performance:** Images are loaded progressively for optimal performance
- **SEO:** All images have proper alt text and metadata
- **Caching:** Browser caching ensures fast loading for return visitors
- **Backup:** Always backup images before making changes

## ❗ **Important Guidelines**

1. **Consistent Naming:** Always follow the `image-{number}.{ext}` pattern
2. **Sequential Numbers:** Don't skip numbers in the sequence
3. **File Sizes:** Optimize images (recommended: under 500KB each)
4. **Aspect Ratios:** Use consistent aspect ratios for best visual results
5. **Quality:** Use high-quality images that represent your work professionally

## 🆘 **Troubleshooting**

**Images not showing?**
- Check file names match the pattern exactly
- Verify images are in the correct category folder
- Ensure file extensions are supported
- Clear browser cache and refresh

**Need to reorder images?**
- Rename files to change the display order
- Use FTP client or file manager to batch rename

**Want to remove images?**
- Simply delete the image file
- Website will automatically update

---

**Note:** This system provides maximum flexibility - you can upload any number of images to any category, and they will automatically appear on your website without any coding or database changes required!