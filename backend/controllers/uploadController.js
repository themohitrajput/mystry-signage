const fs = require('fs');
const path = require('path');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Upload a single image, returns its public URL
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ success: true, data: { url, filename: req.file.filename } });
});

// @desc    Upload multiple images, returns array of public URLs
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }
  const data = req.files.map((f) => ({ url: `/uploads/${f.filename}`, filename: f.filename }));
  res.status(201).json({ success: true, data });
});

// @desc    Delete an uploaded image by filename
// @route   DELETE /api/upload/:filename
// @access  Private
const deleteImage = asyncHandler(async (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.json({ success: true, message: 'Image deleted' });
});

module.exports = { uploadImage, uploadMultipleImages, deleteImage };
