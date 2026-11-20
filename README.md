# Jai S Ramani — Data Analyst | AI & ML Engineer

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-34D399?style=for-the-badge)](LICENSE)

**Official Production Portfolio** of **Jai S Ramani** — Data Analyst & AI/ML Engineer based in Bangalore, India.  
Designed with an editorial typography aesthetic, real-time System theme sync, interactive data sandboxes, and custom chibi companion art.

[Live Demo](https://jaisramani.dev/) • [View Resume (PDF)](https://jaisramani.dev/Jai_S_Ramani_Resume.pdf) • [LinkedIn](https://linkedin.com/in/jai-s-ramani-2948532bb) • [GitHub](https://github.com/Jai-S-Ramani)

</div>

---

## 🎨 Design Philosophy & Features

### 1. Cardova Editorial Aesthetic
- **Curated Palette**: Soft Ivory Cream (`#F5F3E9`) for daytime reading and deep Dark Forest (`#070C09`) accented with Emerald Mint (`#34D399`) for focused nocturnal viewing.
- **Balanced Typography Hierarchy**:
  - Display Titles: **Playfair Display** (classic editorial serif)
  - Technical Data & KPIs: **JetBrains Mono** (monospace clarity)
  - Body & Microcopy: **Plus Jakarta Sans** (contemporary geometric sans)
- **Lenis Kinetic Smooth Scroll**: Inertial smooth wheel physics integrated throughout the single-page narrative.

### 2. True System Theme Engine
- **OS-Level Sync**: Direct real-time listening to browser and operating system `prefers-color-scheme` media queries.
- **Instant Pre-Paint Execution**: Zero-dependency inline bootstrap script in `<head>` ensures zero flash of unstyled theme on initial load.
- **One-Click Manual Toggle**: Easily cycle through **System** ⇄ **Dark (Forest)** ⇄ **Light (Ivory)** via the header pill or mobile drawer.

### 3. Custom Anime Chibi Companion System
- **Hero Coding Chibi (`avatar-coding.jpg`)**: Focused late-night terminal engineering setup with headphones and subtle green illumination.
- **About Section Chibi (`avatar-standing.jpg`)**: Confident, friendly thumbs-up greeting representing collaborative communication.
- **Footer Closing Card Chibi (`avatar-sleeping.jpg`)**: Whimsical resting pose alongside a Minecraft companion wolf, paired with live contact and resume actions.

---

## 🚀 Key Sections & Modules

- **Editorial Hero**: Split-column introduction with live availability pulse, quantitative stats pills (`59/59 Pytest pass rate`, `18 retail feeds`, `5 Amazon regions`, `<30ms MongoDB ping`), and quick action buttons.
- **Featured Projects**:
  - **PricePilot**: End-to-end retail price intelligence platform benchmarking 18 marketplaces with 30-day moving averages, volatility indicators, and automated BUY/WAIT alerts.
  - **Samyukt**: High-performance semantic cloud version control system utilizing AST-based chunk hashing and atomic diff pipelines.
  - **PresenceIQ**: Edge-optimized biometric attendance platform with InsightFace facial embedding and sub-20ms inference liveness verification.
- **Technical Arsenal**: Grouped taxonomy spanning **Quantitative Analysis** (SQL, Pandas, NumPy, Power BI, Tableau), **Applied ML & Computer Vision** (OpenCV, InsightFace, PyTorch, Scikit-learn), and **Production Infrastructure** (Docker, Flask, REST APIs, Pytest).
- **Interactive Sandbox & Terminal**: Embedded SQL engine simulator with query result sets, predictive volatility slider, and responsive command-line prompt.
- **Honors & Accreditations**:
  - 🏆 **Second Place – Best Paper & Presentation Award** (*PresenceIQ*, Smartworld 2025 Conference)
  - 🏆 **1st Prize – Artificial Intelligence Theme** (*Intercollegiate Project Expo 2026*, BTI)
  - 🏅 **Elite Certification – Artificial Intelligence: Concepts and Techniques** (*NPTEL / IISc Bangalore*, 75%)
  - 📜 **Introduction to Industry 4.0 and Industrial Internet of Things** (*NPTEL*, 72%)
- **Direct PDF Resume**: Direct in-browser viewing and downloading of `Jai_S_Ramani_Resume.pdf`.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Framework & Core** | React 19, TypeScript, Vite 8 |
| **Styling & Design System** | Tailwind CSS v4, Custom CSS Variables |
| **Animation & Interaction** | Motion (Framer Motion), Lenis Smooth Scroll |
| **Icons & Media** | Lucide React, Custom Optimized Web Images |
| **SEO & Performance** | Canonical OpenGraph Metadata, Robots.txt, XML Sitemap |
| **Hosting & Deployment** | Vercel / Netlify / GitHub Pages |

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Jai-S-Ramani/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start the local development server (with network host enabled)
npm run dev

# 4. Build for production (TypeScript check + Vite bundler)
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📁 Project Directory Structure

```text
Portfolio/
├── public/
│   ├── images/
│   │   ├── avatar-coding.jpg        # Hero chibi artwork
│   │   ├── avatar-standing.jpg      # About section chibi
│   │   └── avatar-sleeping.jpg      # Footer companion chibi
│   ├── Jai_S_Ramani_Resume.pdf      # Direct downloadable resume PDF
│   ├── robots.txt                   # Search crawler directives
│   └── sitemap.xml                  # Canonical XML sitemap
├── src/
│   ├── components/
│   │   └── trial5/                  # Main Cardova Editorial component suite
│   │       ├── EditorialHeader.tsx  # Dynamic glassmorphic navbar with theme toggle
│   │       ├── EditorialHero.tsx    # Split-screen editorial hero section
│   │       ├── EditorialAbout.tsx   # Narrative background & philosophy
│   │       ├── EditorialProjects.tsx# Bento grid for flagship projects
│   │       ├── EditorialSkills.tsx  # Grouped skill badges & competencies
│   │       ├── EditorialAchievements.tsx # Awards & certifications
│   │       ├── EditorialContact.tsx # Contact & direct messaging trigger
│   │       ├── EditorialFooterCard.tsx # Closing card with sleeping chibi & dog
│   │       ├── EditorialLoader.tsx  # Initial monogram preloader
│   │       ├── InteractiveSandbox.tsx # Embedded SQL & terminal simulator
│   │       ├── ThemeContext.tsx     # OS/Browser System Theme provider
│   │       └── Trial5App.tsx        # Main application layout
│   ├── data/
│   │   └── portfolioData.ts         # Portfolio content, projects & metrics
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # React DOM entry point
│   └── index.css                    # Tailwind CSS v4 directives & font styles
├── index.html                       # HTML shell with zero-flicker theme script
├── package.json                     # Project manifest and scripts
├── tsconfig.json                    # TypeScript compiler configuration
└── vite.config.ts                   # Vite configuration
```

---

## 📬 Contact & Connect

- **Email**: [jaisramani05@gmail.com](mailto:jaisramani05@gmail.com)
- **LinkedIn**: [linkedin.com/in/jai-s-ramani-2948532bb](https://linkedin.com/in/jai-s-ramani-2948532bb)
- **GitHub**: [github.com/Jai-S-Ramani](https://github.com/Jai-S-Ramani)
- **Website**: [https://jaisramani.dev](https://jaisramani.dev)
