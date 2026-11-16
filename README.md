# Frequent Posters (Premium Creative Agency & Custom Admin CMS)

> **DESIGN • BRAND • CREATE • GROW**  
> Premium creative design, branding, and digital solutions studio based in Hyderabad, India.

---

## 1. Features & Architecture

- **Next.js (App Router)** built exclusively with pure **JavaScript (ESM / JSX)**.
- **Production Build Verified**: 10 public pages, full suite of dynamic API endpoints, and a custom Admin CMS interface.
- **10 Public Website Pages**:
  1. **Home (`/`)**: Split creative hero, value proposition, 6 agency service cards, signature 4-pillar approach, Frequent Posters Academy highlights with 3 pricing tiers, portfolio preview, verified clients logo showcase, founder section (Nelli Bhavani), and final CTA with direct WhatsApp integration.
  2. **About Us (`/about`)**: Full brand story, vision, mission, and core values (Creativity, Consistency, Clarity, Professionalism, Accessibility).
  3. **Creative Services (`/services`)**: In-depth breakdown with categorized deliverables and direct enquiry triggers.
  4. **Learn With Us (`/learn-with-us`)**: Frequent Posters Academy featuring 8 learning modules and 3 structured workshop tiers.
  5. **Our Clients (`/clients`)**: Showcase of authentic clients (Ekranfix, Traditions, Newline Show Production, Swift Digitals, Sri Durga Ladies Tailor, Golden Eye Security, Kernel Masters, i-Leaf Doors, Christiva Ministries).
  6. **Portfolio (`/portfolio`)**: Interactive category filtering, image lightbox details modal, and dynamic work showcase.
  7. **Packages & Pricing (`/pricing`)**: Transparent workshop pricing + bespoke creative design quotes.
  8. **Reviews (`/reviews`)**: Authentic client testimonials and direct Google Business Profile review link.
  9. **Blog & Insights (`/blog`)**: Practical branding guides, design tips, and reading time.
  10. **Contact Us (`/contact`)**: Validated contact form, direct phone link, WhatsApp floating trigger, and email info.
- **Custom Admin CMS (`/admin`)**:
  - Secure login with bcrypt password hashing and HTTP-Only JWT session cookies.
  - Initial seed administrator account seeded and protected.
  - Complete CRUD for:
    - **Services Management** (`/admin/dashboard/services`)
    - **Portfolio Projects** (`/admin/dashboard/portfolio`)
    - **Clients Management** (`/admin/dashboard/clients`)
    - **Pricing Packages** (`/admin/dashboard/pricing`)
    - **Testimonials & Reviews** (`/admin/dashboard/testimonials`)
    - **Blog & Insights** (`/admin/dashboard/blog`)
    - **Enquiries & Leads Management** (`/admin/dashboard/enquiries`)
    - **Website & Founder Settings** (`/admin/dashboard/settings`)
- **Cloudinary Integration**:
  - Server-side secure image upload handler at `/api/admin/upload`.
  - Configured with official credentials, delivery optimization, and deletion capabilities.
- **WhatsApp Integration**:
  - Floating WhatsApp trigger button with contextual pre-filled messages across pages (+91 7780271948).

---

## 2. Environment Variables (`.env.local`)

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://nellibhavaniwork_db_user:vzZTBUUR5FvpwcKN@cluster0.akzbnjc.mongodb.net/frequent_posters?retryWrites=true&w=majority

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=ew2tcjy5
CLOUDINARY_API_KEY=713663139356954
CLOUDINARY_API_SECRET=YsS3cCPhT_TanMmlaXeu7GfGNLc
CLOUDINARY_URL=cloudinary://713663139356954:YsS3cCPhT_TanMmlaXeu7GfGNLc@ew2tcjy5

# Next & Auth Secrets
JWT_SECRET=frequent_posters_super_secure_jwt_secret_key_2026_hyderabad
ADMIN_EMAIL=frequentposters@redadmin.in
ADMIN_DEFAULT_PASSWORD=one two three four five six seven eight nine zero

# Public Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME="Frequent Posters"
NEXT_PUBLIC_PHONE="+91 7780271948"
NEXT_PUBLIC_WHATSAPP="+91 7780271948"
NEXT_PUBLIC_EMAIL="frequentposters@gmail.com"
NEXT_PUBLIC_LOCATION="Hyderabad, Telangana, India"
NEXT_PUBLIC_INSTAGRAM="@frequentposters"
```

---

## 3. Database Seeding & Admin Login

To seed or re-seed the initial database records safely:
```bash
npm run seed
```

### Initial Administrator Credentials:
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `frequentposters@redadmin.in`
- **Temporary Password**: `one two three four five six seven eight nine zero`
*(Can be updated along with email from the Admin Settings tab)*

---

## 4. Development & Production Commands

### Start in Development Mode:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Start Production Server:
```bash
npm start
```
