# Mystry Signage — Full-Stack Website (MERN)

A production-ready website + admin CMS for Mystry Signage, built with MongoDB, Express, React (Vite), and Node.js.

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
mystry-signage/
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
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, SMTP_*, ADMIN_EMAIL/ADMIN_PASSWORD, etc.
npm install
npm run seed     # creates the first admin account + sample categories/projects/content
npm run dev      # starts on http://localhost:5000
```

Your admin login will be whatever you set as `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before running `npm run seed`.

## 3. Frontend setup
```bash
cd frontend
cp .env.example .env
# edit .env if your API isn't on localhost:5000
npm install
npm run dev      # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to `http://localhost:5000`, so the two apps talk to each other automatically in development.

## 4. Log in to the admin dashboard
Visit `http://localhost:5173/admin/login` and sign in with the admin credentials from your `.env`. From there you can:
- Add/edit categories under **Categories**
- Add/edit projects (with images) under **Projects**
- Edit every homepage/about/contact text and image under **Site Content**
- Read and manage enquiries under **Messages**

## 5. Production build
```bash
# frontend
cd frontend && npm run build     # outputs static files to frontend/dist
# serve frontend/dist with any static host (Vercel, Netlify, Nginx, or Express static)

# backend
cd backend && NODE_ENV=production npm start
```
In production, set `CLIENT_URL` in the backend `.env` to your real frontend origin (for CORS), and put the backend behind HTTPS so the auth cookie's `secure` flag works correctly.

## 6. Image storage note
Images are stored on the server's local disk under `backend/uploads` and served statically at `/uploads/<filename>`. For a multi-server or serverless deployment, swap the storage engine in `backend/middleware/upload.js` for a cloud adapter (S3, Cloudinary, etc.) — the rest of the app (models, controllers, frontend) doesn't need to change since it only ever deals with a `url` string.

## 7. Security notes
- Passwords are hashed with bcrypt; JWTs are signed with `JWT_SECRET` (change this in production!)
- Auth cookie is httpOnly; CORS is restricted to `CLIENT_URL`
- Rate limiting is applied globally and more strictly on `/api/auth/login`
- All inputs are validated server-side (express-validator) and sanitized against NoSQL injection
- Uploaded files are restricted to image types and a configurable max size (`MAX_UPLOAD_MB`)

## 8. Customizing the design
Color tokens, fonts, and component styles live in `frontend/tailwind.config.js` and `frontend/src/index.css` — update the `amber`/`cyan`/`ink`/`paper` palette there to re-theme the whole site in one place.
