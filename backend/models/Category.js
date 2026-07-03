const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, trim: true, default: '' },
    image: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    order: { type: Number, default: 0 }, // controls display order on the site
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
