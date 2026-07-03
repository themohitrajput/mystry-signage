const express = require('express');
const { getAllContent, getContentSection, upsertContentSection } = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllContent);
router.get('/:section', getContentSection);
router.put('/:section', protect, upsertContentSection);

module.exports = router;
