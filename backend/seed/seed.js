// One-time / repeatable seed script.
// Creates the first admin account (if not present) and a few sample
// categories + projects so the site isn't empty on first run.
// Usage: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Project = require('../models/Project');
const SiteContent = require('../models/SiteContent');

const run = async () => {
  await connectDB();

  // 1. Admin
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin',
    });
    console.log(`Admin created: ${process.env.ADMIN_EMAIL}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  // 2. Categories
  const categoryData = [
    { name: 'Neon Signs', description: 'Custom-fabricated LED neon signage for storefronts and events.', order: 1 },
    { name: 'Acrylic & LED Signboards', description: 'Illuminated acrylic and LED signboards for shops and offices.', order: 2 },
    { name: 'Hoardings & Billboards', description: 'Large-format outdoor hoardings and billboards.', order: 3 },
    { name: 'Vehicle Branding', description: 'Fleet and vehicle wrap branding.', order: 4 },
  ];
  const categories = [];
  for (const c of categoryData) {
    let cat = await Category.findOne({ name: c.name });
    if (!cat) cat = await Category.create(c);
    categories.push(cat);
  }
  console.log(`Categories ready: ${categories.length}`);

  // 3. Sample projects (only if none exist)
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.create([
      {
        title: 'Café Aroma Storefront Neon',
        category: categories[0]._id,
        client: 'Café Aroma',
        location: 'Indore, MP',
        shortDescription: 'Warm custom neon signage for a boutique café entrance.',
        description: 'Designed and installed a custom warm-white LED neon sign for Café Aroma\'s main entrance, improving night-time visibility and brand recall.',
        isFeatured: true,
        tags: ['neon', 'cafe', 'storefront'],
      },
      {
        title: 'Skyline Mall Acrylic Directory Board',
        category: categories[1]._id,
        client: 'Skyline Mall',
        location: 'Indore, MP',
        shortDescription: 'Backlit acrylic directory board for a shopping mall lobby.',
        description: 'Fabricated and installed a large backlit acrylic directory board with modular tenant panels for easy updates.',
        isFeatured: true,
        tags: ['acrylic', 'led', 'mall'],
      },
      {
        title: 'Highway Hoarding Campaign',
        category: categories[2]._id,
        client: 'Confidential',
        location: 'MP Highway',
        shortDescription: 'Large-format outdoor hoarding for a regional ad campaign.',
        description: 'End-to-end design, print, and installation of a 40x20 ft highway hoarding for a regional advertising campaign.',
        isFeatured: false,
        tags: ['hoarding', 'outdoor'],
      },
    ]);
    console.log('Sample projects created.');
  } else {
    console.log('Projects already exist, skipping sample data.');
  }

  // 4. Default site content sections
  const defaults = {
    home_hero: {
      heading: 'Signage That Gets You Noticed',
      subheading: 'Mystry Signage designs, fabricates, and installs custom signs, neon, and branding solutions that make your business impossible to miss.',
      buttonText: 'View Our Work',
      buttonLink: '/portfolio',
      image: '',
    },
    home_why_us: {
      heading: 'Why Businesses Choose Mystry Signage',
      points: [
        { title: 'End-to-End Service', text: 'From design to installation, we handle everything in-house.' },
        { title: 'Premium Materials', text: 'We use durable, weather-resistant materials built to last.' },
        { title: 'On-Time Delivery', text: 'We respect deadlines and deliver projects on schedule.' },
      ],
    },
    about_page: {
      heading: 'About Mystry Signage',
      body: 'Mystry Signage is a signage design and fabrication studio helping businesses stand out with custom neon, LED, acrylic, and large-format signage. We combine craftsmanship with modern fabrication technology to deliver signage that lasts.',
      mission: 'To help every business we work with be instantly recognizable.',
      image: '',
    },
    contact_info: {
      address: 'Indore, Madhya Pradesh, India',
      phone: '+91 90000 00000',
      whatsapp: '919000000000',
      email: 'hello@mystrysignage.com',
      mapEmbedUrl: '',
      businessHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    },
    site_settings: {
      siteName: 'Mystry Signage',
      tagline: 'Signs that speak for your brand',
      logo: '',
      favicon: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    },
  };

  for (const [section, data] of Object.entries(defaults)) {
    const exists = await SiteContent.findOne({ section });
    if (!exists) {
      await SiteContent.create({ section, data });
    }
  }
  console.log('Default site content ensured.');

  console.log('Seeding complete.');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
