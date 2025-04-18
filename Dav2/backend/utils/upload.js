const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const AppError = require('./appError');

// 1. Create directory if it doesn't exist
const createUploadDir = () => {
  const dir = path.join(__dirname, '../public/img/packages');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
createUploadDir();

// 2. Store images in memory for processing
const multerStorage = multer.memoryStorage();

// 3. File filter to accept only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// 4. Configure multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// 5. Handle multiple file uploads
exports.uploadPackageImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

// 6. Process and resize images
exports.resizePackageImages = async (req, res, next) => {
  try {
    if (!req.files) return next();

    // Process cover image
    if (req.files.imageCover) {
      req.body.imageCover = `package-${req.params.id || Date.now()}-cover.jpeg`;
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, `../public/img/packages/${req.body.imageCover}`));
    }

    // Process multiple images
    if (req.files.images) {
      req.body.images = [];
      
      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `package-${req.params.id || Date.now()}-${i + 1}.jpeg`;
          
          await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(path.join(__dirname, `../public/img/packages/${filename}`));
          
          req.body.images.push(filename);
        })
      );
    }
    
    next();
  } catch (err) {
    next(err);
  }
};