# Jai S Ramani — Futuristic Engineering Portfolio (Finalized Production Build)

> **Official Production Portfolio** of **Jai S Ramani** — Data Analyst & AI/ML Engineer.
> Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, and **Motion**.

---

## 🌐 Finalized Production Architecture
- **Signature Theme**: Electric Teal (`#00D9C0`) with glowing glass borders and deep cyber space background (`#020617`).
- **Interactive Three.js Background**: Real-time undulating 3D Cyber Horizon Wave Grid with 450 celestial starlight particles and smooth cursor perspective tracking.
- **Master Rounded Frame**: Ultra-clean large rounded viewport frame with soft ambient corner gradients and theme-reactive borders.
- **Top Pinned Header**: Minimal production layout — Monogram `JR` logo, Command Palette trigger (`⌘K`), "Initiate Contact" primary CTA, and direct Resume button.
- **Floating Vertical Left Dock**: Pinned capsule dock with section anchors and circular SVG scroll meter showing live reading percentage (`0%` to `100%`).
- **Interactive 3D Companion ("Aero")**: Three.js WebGL character companion with cursor gaze tracking, articulated wave greeting, 360° spin, and toggle to 💎 3D Math Geometry.
- **3D Tilt Project Cards**: 2-column balanced grid with real-time 3D cursor perspective tilt, dynamic cursor spotlights, 3-column metric strips, and direct GitHub source code links.
- **The Interactive Lab**: Web Audio API harmonic resonance frequency generator with live spectrum analyzer and `arbitrage_engine.py` code viewer.
- **Honors & Accreditations**:
  - 🏆 Second Place – Best Presentation Award (*PresenceIQ*, Smartworld 2025 Conference)
  - 📜 Introduction to Industry 4.0 and Industrial Internet of Things (*NPTEL*, 72%)
  - 🏅 Elite Certification – Artificial Intelligence: Concepts and Techniques (*NPTEL / IISc Bangalore*, 75%)
  - 🏆 1st Prize – Artificial Intelligence Theme (*Intercollegiate Project Expo 2026*, BTI)
- **Direct Resume**: [`https://github.com/Jai-S-Ramani/Resume.git`](https://github.com/Jai-S-Ramani/Resume.git).

---

## 🚀 Live Development & Build Commands

```bash
# Install dependencies
npm install

# Run local development server (port 5173)
npm run dev

# Run production build (TypeScript + Vite)
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deployment to Custom Domain (Vercel / Netlify / Cloudflare)

Since **Trial 4** is now the main root application, deploying to your custom domain takes 2 minutes:

1. **Push to GitHub:**
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Finalized production portfolio with Electric Teal & Cyber Grid"
   git remote add origin https://github.com/Jai-S-Ramani/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Import your repository on [Vercel](https://vercel.com).
   - Leave Root Directory as `./` (default).
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click **Deploy**.

3. **Add Your Custom Domain:**
   - In Vercel Project Settings → **Domains**, add your domain.
   - Point your domain's DNS `A` record to `76.76.21.21` and `CNAME` for `www` to `cname.vercel-dns.com`.
