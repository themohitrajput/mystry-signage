const Category = require('../models/Category');
const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all categories (public: only active, sorted)
// @route   GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { isActive: true }; // admin can pass ?all=true
  const categories = await Category.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: categories.length, data: categories });
});

// @desc    Get single category by slug (includes its projects)
// @route   GET /api/categories/:slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  const projects = await Project.find({ category: category._id, isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: { ...category.toObject(), projects } });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: category });
});

// @desc    Delete category (blocks deletion if projects still reference it)
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const linkedProjects = await Project.countDocuments({ category: req.params.id });
  if (linkedProjects > 0) {
    res.status(400);
    throw new Error(`Cannot delete: ${linkedProjects} project(s) still use this category`);
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, message: 'Category deleted' });
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };
