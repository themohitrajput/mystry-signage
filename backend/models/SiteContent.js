const mongoose = require('mongoose');

// Single flexible document that stores every editable piece of site copy.
// Using a loose "section -> data" map keeps the CMS generic: the admin can
// edit any text/image/button without new schema changes or deployments.
const SiteContentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, unique: true, index: true },
    // e.g. section: "home_hero", data: { heading, subheading, buttonText, buttonLink, image }
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', SiteContentSchema);
