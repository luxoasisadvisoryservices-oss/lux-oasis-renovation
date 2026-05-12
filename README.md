# Lux Oasis Renovation — Website

Premium renovation project management brand site.
**Part of the Lux Oasis Advisory & Services LLC ecosystem.**

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 📁 Media Upload Guide

This is the most important section — read carefully before uploading photos and videos.

### Folder Structure in GitHub

All photos and videos go inside the `/public` folder in your repo.
Vite/Vercel serve everything in `/public` at the root URL automatically.

```
public/
├── favicon.svg
├── images/
│   ├── greens/
│   │   ├── hero.jpg           ← MAIN HERO — use your best Greens full shot
│   │   ├── before-1.jpg       ← Before shot: living room
│   │   ├── after-1.jpg        ← After shot: living room
│   │   ├── before-2.jpg       ← Before shot: kitchen
│   │   ├── after-2.jpg        ← After shot: kitchen
│   │   ├── kitchen.jpg        ← Feature kitchen photo
│   │   └── living-room.jpg    ← Feature living room photo
│   │
│   ├── holiday-home-1/
│   │   ├── cover.jpg          ← JBR / Murjan hero photo
│   │   ├── living-room.jpg    ← Living area
│   │   ├── bedroom.jpg        ← Bedroom
│   │   └── details.jpg        ← Styling details / accessories
│   │
│   └── holiday-home-2/
│       ├── cover.jpg          ← Marina area hero photo
│       ├── living-room.jpg    ← Living area
│       ├── bedroom.jpg        ← Bedroom
│       └── details.jpg        ← Styling details
│
└── videos/
    ├── greens-walkthrough.mp4
    ├── holiday-home-1-tour.mp4
    └── holiday-home-2-tour.mp4
```

### Image Format Recommendations

| Use | Format | Max Size | Aspect Ratio |
|-----|--------|----------|--------------|
| Hero images | JPG (80% quality) | 800KB | 16:10 or wider |
| Gallery thumbs | JPG (75% quality) | 300KB | Square (1:1) |
| Before/After | JPG (80% quality) | 400KB | 4:3 |
| Cover cards | JPG (80% quality) | 500KB | 16:10 |

> Tip: Use Squoosh (squoosh.app) or TinyJPG to compress before uploading.

### Video Format Recommendations

- Format: `.mp4` (H.264 codec for maximum browser support)
- Resolution: 1080p or 720p — do not upload raw 4K
- Length: 30–90 seconds per walkthrough
- File size target: under 50MB per video

### Enabling Videos

Once you upload a video file, open `src/App.jsx` and find the `VideoBlock` component:

```jsx
function VideoBlock({ src, poster, label }) {
  const [hasFile] = useState(false); // ← CHANGE THIS TO true ONCE VIDEO IS UPLOADED
```

Change `false` to `true` and the video player will appear instead of the placeholder.

---

## ✏️ Editing Content

All editable copy lives in one file:

```
src/data/content.js
```

From there you can update:
- **services** — the 6 service cards
- **projects** — titles, copy, tags, image paths, video paths
- **processSteps** — the 6 process steps
- **faqs** — questions and answers
- **ecosystemBrands** — the ecosystem section cards

### Updating Contact Details

Search for these placeholders in `src/App.jsx` and replace:

| Placeholder | Replace with |
|-------------|--------------|
| `info@luxoasis.ae` | Your real email |
| `+971 XX XXX XXXX` | Your real phone |
| `https://wa.me/971XXXXXXXXX` | Your WhatsApp link |
| `href="#"` on "Visit Main Company" | Your main company URL |

---

## 🌐 Deploying to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy ✅

No environment variables needed.

---

## 🎨 Customisation

### Colours
Edit `tailwind.config.js` → `theme.extend.colors.brand`

Main accent colours used throughout:
- `amber-800` — primary CTA buttons, active states
- `amber-700` — eyebrow labels, tags
- `stone-900` — dark section backgrounds
- `amber-900` — ecosystem section

### Fonts
Loaded from Google Fonts in `src/index.css`:
- **Display / Headings:** Cormorant Garamond (elegant serif)
- **Body:** DM Sans (clean, modern)

To change fonts: update the `@import` URL in `index.css` and the `fontFamily` in `tailwind.config.js`.

---

## 📂 File Map

```
lux-oasis-renovation/
├── index.html              ← SEO meta tags, page title
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── images/             ← Upload all photos here
│   └── videos/             ← Upload all videos here
└── src/
    ├── main.jsx            ← React entry point
    ├── index.css           ← Fonts + Tailwind base
    ├── App.jsx             ← Full landing page
    └── data/
        └── content.js      ← All editable content
```

---

## 🔍 SEO

Update these in `index.html` before going live:

- `<title>` — already optimised
- `<meta name="description">` — already set
- `<link rel="canonical">` — update to your real domain
- `og:url` and `og:image` — update to real domain + real hero image
- Schema.org JSON-LD — update `contactPoint` with real email/phone

---

Built for: **Lux Oasis Advisory & Services LLC** — Dubai, UAE
