const express = require('express');
const { uploadImage, uploadMultipleImages, getImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, upload.array('images', 20), uploadMultipleImages);
router.get('/file/:filename', getImage);
router.delete('/:filename', protect, deleteImage);

module.exports = router;
