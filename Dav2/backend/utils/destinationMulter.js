const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const AppError = require('./appError');

// Create directory if it doesn't exist
const createUploadDir = () => {
  const dir = path.join(__dirname, '../public/img/destinations');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
createUploadDir();

// Store images in memory for processing
const multerStorage = multer.memoryStorage();

// File filter to accept only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// Configure multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Handle multiple file uploads
exports.uploadDestinationImages = upload.fields([
  { name: 'images', maxCount: 5 }
]);

// Process and resize images
exports.resizeDestinationImages = async (req, res, next) => {
  try {
    if (!req.files) return next();

    // Process images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `destination-${Date.now()}-${i + 1}.jpeg`;
          await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(path.join(__dirname, `../public/img/destinations/${filename}`));
          
          req.body.images.push(filename);
        })
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};