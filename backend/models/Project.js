const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    client: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    shortDescription: { type: String, trim: true, maxlength: 200, default: '' },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
      },
    ],
    coverImage: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    tags: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    completionDate: { type: Date },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-5);
  }
  next();
});

ProjectSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);
