# ST. ROBERT ACADEMY — Paperless Digital School ERP & LMS Portal

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/priyanshuyadavv123/aether-digital-school-erp)

A modern, 100% paperless **School Enterprise Resource Planning (ERP) & Learning Management System (LMS)** for **ST. ROBERT ACADEMY**, built with React 18, Vite, Tailwind CSS, Lucide Icons, and Framer Motion. Engineered specifically for contemporary CBSE-affiliated K-12 institutions with full Indian context, white-label personalization, cross-tab live state sync, and high-craft design polish.

---

## Live Demo Roles & One-Click Credentials

The login portal includes **1-Click Demo Login** shortcuts for instant role switching without typing:

| Portal Role | Demo Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@strobert.edu` | `admin123` | Institutional Control Center, Digital Admissions Queue, School White-Label Branding, Student/Staff Directory, Fee Ledger |
| **Teacher** | `teacher@strobert.edu` | `teach123` | Interactive Attendance Marker with Parent SMS Alert, Digital Homework Manager, Quiz Builder, CBSE Marksheet Publisher |
| **Student** | `student@strobert.edu` | `student123` | Digital Learning Arena, Smart ID Badge with QR Gate Pass, Timetable Matrix, Homework Submissions, Report Cards |
| **Parent** | `parent@strobert.edu` | `parent123` | Ward Transparency Hub, Real-Time Attendance Log, Daily Homework Monitor, Paperless Leave Clearance, Indian UPI QR Fee Checkout |

---

## Key Features & Architecture

### 1. Cross-Tab Live State Synchronization
- Centralized Data Engine (`src/context/SchoolDataContext.jsx`) backed by `localStorage` with reactive `window.addEventListener('storage')`.
- Actions taken in one browser tab (e.g., Teacher marking Absent in Window 1) immediately reflect in real-time across other open tabs (e.g., Parent Attendance Meter in Window 2) without page reloads.

### 2. High-Craft Human Studio Polish
- Zero raw emojis: clean, bordered Lucide icon badges throughout all views.
- Editorial typography stack: **Plus Jakarta Sans** for tight headings, **Inter** for UI copy, and **JetBrains Mono** for roll numbers, fees (`₹`), and percentages.
- Bento Grid asymmetric landing page with subtle dot-matrix background styling.

### 3. Dynamic School White-Label Engine
- Live customization inside the Admin Portal: School Name, CBSE Affiliation Number, Address, Contact Phone, and Official UPI ID.
- Changes propagate instantaneously to the Public Landing Page, Navbar, Certified Report Cards, Fee Invoices, and Smart ID Badges.

### 4. Interactive Power Widgets
- **Global Command Palette (`Cmd + K` / `Ctrl + K`):** Quick-jump spotlight search modal for students, classes, receipts, and portal actions.
- **Tuition & Scholarship Calculator:** Real-time fee estimator factoring grade slab, academic stream, bus transport distance, and merit discounts in Indian Rupees (`₹`).
- **Interactive Weekly Routine Matrix:** Day-wise / period-wise class schedule with live indicator for ongoing classes and room tags.
- **Indian UPI / QR Payment Modal:** Dynamic UPI QR code generator, UPI ID verifier, simulation payment processing, and printable tax invoice generation.
- **Smart ID Badges & Official Report Cards:** Glassmorphic ID badges and CBSE report cards with `@media print` CSS optimization for clean PDF export.

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ installed on your machine.

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/priyanshuyadavv123/aether-digital-school-erp.git
cd aether-digital-school-erp

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
```

---

## Deploying to Netlify

This repository comes pre-configured with `netlify.toml` and `public/_redirects` for Single Page Application routing.

### Option A: 1-Click Deploy
Click the button below to import and deploy directly to your Netlify account:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/priyanshuyadavv123/aether-digital-school-erp)

### Option B: Manual Netlify Import
1. Go to [Netlify Dashboard](https://app.netlify.com/).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and select `priyanshuyadavv123/aether-digital-school-erp`.
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy Site"**. Your app will be live on a secure HTTPS URL within seconds!
