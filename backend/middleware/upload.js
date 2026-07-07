const multer = require('multer');
const path = require('path');

// Buffer files in memory so they can be stored directly in MongoDB.
const storage = multer.memoryStorage();

const allowedTypes = /jpeg|jpg|png|webp|gif|svg/;

const buildFilename = (originalName) => {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .slice(0, 40) || 'image';

  return `${base}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
};

const fileFilter = (req, file, cb) => {
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowedTypes.test(file.mimetype);
  if (extOk && mimeOk) {
    file.filename = buildFilename(file.originalname);
    return cb(null, true);
  }
  cb(new Error('Only image files (jpeg, jpg, png, webp, gif, svg) are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: (Number(process.env.MAX_UPLOAD_MB) || 5) * 1024 * 1024 },
});

module.exports = upload;
