const SiteContent = require('../models/SiteContent');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all site content sections as a { sectionKey: data } map
// @route   GET /api/content
const getAllContent = asyncHandler(async (req, res) => {
  const items = await SiteContent.find();
  const map = {};
  items.forEach((item) => {
    map[item.section] = item.data;
  });
  res.json({ success: true, data: map });
});

// @desc    Get a single content section
// @route   GET /api/content/:section
const getContentSection = asyncHandler(async (req, res) => {
  const item = await SiteContent.findOne({ section: req.params.section });
  res.json({ success: true, data: item ? item.data : {} });
});

// @desc    Upsert a content section (creates it if it doesn't exist yet)
// @route   PUT /api/content/:section
// @access  Private
const upsertContentSection = asyncHandler(async (req, res) => {
  const item = await SiteContent.findOneAndUpdate(
    { section: req.params.section },
    { section: req.params.section, data: req.body },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: item.data });
});

module.exports = { getAllContent, getContentSection, upsertContentSection };
