# Mistry Signage — Full-Stack Website (MERN)

A production-ready website + admin CMS for Mistry Signage, built with MongoDB, Express, React (Vite), and Node.js.

## What's included

**Public website**

- Home (hero, featured projects, category showcase, "why us")
- About Us (fully admin-editable)
- Portfolio (search + filter by category)
- Project detail pages with an image gallery
- Project Categories (grid + category detail with its projects)
- Contact page with a validated form that emails the business and stores every enquiry
- Floating WhatsApp chat button
- SEO meta tags on every page, responsive down to mobile, keyboard-accessible

**Admin dashboard** (`/admin/login`)

- JWT authentication (httpOnly cookie + bearer token fallback)
- Dashboard with quick stats (projects, categories, unread enquiries)
- Full CRUD for Projects (title, category, images, gallery, tags, featured flag, etc.)
- Full CRUD for Categories
- A generic **Site Content editor** — the admin can edit the hero heading/subheading/button, "Why Us" points, About page text, contact details, site name/logo/social links — all without a developer touching code
- Image upload & management (drag-free click-to-upload, stored on disk under `/uploads`)
- Enquiries inbox (read/unread, delete)
- Change password screen

## Tech stack

- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Axios, react-hot-toast, react-helmet-async, lucide-react
- **Backend:** Express, Mongoose (MongoDB), JWT + bcrypt auth, Multer (image uploads), Nodemailer (email), express-validator, helmet, rate-limiting, mongo-sanitize

## Folder structure

```
Mistry-signage/
├── backend/
│   ├── config/         # DB connection
│   ├── models/         # Mongoose schemas (Admin, Project, Category, Message, SiteContent)
│   ├── controllers/    # Route handlers / business logic
│   ├── routes/         # Express routers
│   ├── middleware/     # auth, upload, validation, error handling
│   ├── utils/          # email + JWT helpers
│   ├── uploads/         # uploaded images are stored here, served at /uploads
│   ├── seed/            # seed.js — creates first admin + sample content
│   └── server.js
└── frontend/
    └── src/
        ├── api/          # axios instance
        ├── context/      # AuthContext
        ├── hooks/        # useFetch
        ├── components/   # layout, common, home, projects, categories, contact, admin
        └── pages/        # public pages + pages/admin (CMS)
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An SMTP account for sending emails (Gmail app password, SendGrid, Mailgun, etc.) — optional but recommended for the contact form

## 2. Backend setup

```bash
cd backend
# edit .env: set MONGO_URI, JWT_SECRET, SMTP_*, ADMIN_EMAIL/ADMIN_PASSWORD, etc.
npm install
npm run dev      # starts on http://localhost:5000
```

Your admin login will be whatever you set as `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before running `npm run seed`.

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev      # starts on http://localhost:5173
```
