const path = require('path');
const { asyncHandler } = require('../middleware/errorHandler');
const Image = require('../models/Image');

const buildImageUrl = (filename) => `/api/upload/file/${encodeURIComponent(filename)}`;

// @desc    Upload a single image, returns its public URL
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const image = await Image.create({
    filename: req.file.filename,
    contentType: req.file.mimetype,
    data: req.file.buffer,
    size: req.file.size,
  });

  res.status(201).json({
    success: true,
    data: { url: buildImageUrl(image.filename), filename: image.filename },
  });
});

// @desc    Upload multiple images, returns array of public URLs
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }

  const savedImages = await Promise.all(
    req.files.map(async (file) => {
      const image = await Image.create({
        filename: file.filename,
        contentType: file.mimetype,
        data: file.buffer,
        size: file.size,
      });

      return { url: buildImageUrl(image.filename), filename: image.filename };
    })
  );

  res.status(201).json({ success: true, data: savedImages });
});

// @desc    Retrieve an uploaded image by filename
// @route   GET /api/upload/file/:filename
// @access  Public
const getImage = asyncHandler(async (req, res) => {
  const image = await Image.findOne({ filename: req.params.filename });

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  res.set('Content-Type', image.contentType || 'application/octet-stream');
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(image.data);
});

// @desc    Delete an uploaded image by filename
// @route   DELETE /api/upload/:filename
// @access  Private
const deleteImage = asyncHandler(async (req, res) => {
  await Image.deleteOne({ filename: req.params.filename });
  res.json({ success: true, message: 'Image deleted' });
});

module.exports = { uploadImage, uploadMultipleImages, getImage, deleteImage };
