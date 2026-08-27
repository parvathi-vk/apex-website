# APEX MOTOR WERKS — Static Website Project

A premium, creative and modern static website for **APEX Motor Werks**, a premier motorcycle care & diagnostics studio.

---

## 🏁 Project Overview

This website is engineered to present APEX Motor Werks as an ultra-premium motorcycle care studio, emphasizing high precision, surgical cleanliness, transparent servicing, and dedicated single-bay care.

The core conversion mechanism across the website is **WhatsApp Booking**, pre-formatting structured service requests for maximum conversion rate.

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 with Schema.org JSON-LD LocalBusiness metadata
- **Styling**: Vanilla CSS3 with custom design tokens, dark automotive editorial aesthetic, and responsive breakpoints
- **Interactions**: Vanilla JavaScript (ES6+) with Lucide Icons and optional GSAP ScrollTrigger for smooth motion
- **Dependencies**: Zero build steps required (Pure static files deployable on GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3, or any web server)

---

## 📁 File Structure

```text
apex-website/
│
├── index.html                      # Semantic markup, SEO & structured data
│
├── css/
│   ├── style.css                   # Design tokens, layouts, components & mobile drawer
│   └── animations.css              # Micro-interactions, reveals & reduced motion
│
├── js/
│   └── script.js                   # WhatsApp configuration, modal engine & scroll hooks
│
├── assets/
│   ├── logo/
│   │   ├── apex-logo.svg           # Primary metallic & racing red vector brand mark
│   │   └── apex-mark.svg           # Vector icon badge & favicon
│   ├── hero/
│   │   └── hero-superbike.jpg      # Cinematic superbike studio imagery
│   ├── services/
│   │   ├── big-bike.jpg            # Big bike service imagery
│   │   ├── diagnostics.jpg         # Diagnostic & ECU telemetry imagery
│   │   ├── oil-change.jpg          # Race fluids & synthetic oils imagery
│   │   ├── accessories.jpg         # Exhaust & CNC rearsets fitment imagery
│   │   └── tyre-change.jpg         # Laser balancing & tyre change imagery
│   ├── experience/
│   │   ├── experience-tech.jpg     # Master technician with digital torque wrench
│   │   └── experience-workshop.jpg # Workshop bays & hydraulic lifts
│   └── gallery/
│       ├── workshop.jpg            # Clean studio floor & motorcycle lifts
│       ├── cockpit.jpg             # Brembo radial & clip-on instrumentation
│       ├── brakes.jpg              # Carbon-ceramic brake & monobloc caliper
│       └── superbike.jpg           # Handover superbike studio photography
│
└── README.md
```

---

## ⚙️ Configuration & Customization

### 1. Setting the WhatsApp Number
Open `js/script.js` and edit the constant on line 17:

```javascript
const WHATSAPP_NUMBER = "15551234567"; // Include country code without '+' or spaces
```

### 2. Customizing Workshop Information
In `index.html`, locate the `<!-- CONTACT & LOCATION SECTION -->` to update:
- Workshop Address
- Operating Hours
- Phone Number
- Google Maps URL
- Social media links (`@apexmotorwerks`)

---

## 🚀 How to Run Locally

You can serve this static directory using any local development server:

### Option A: Using Python (Built-in)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

---

## 📱 Mobile Experience

- 100% responsive across smartphones (360px+), tablets, laptops, and ultra-wide displays.
- Persistent mobile bottom action bar: `[ CALL ]` | `[ WHATSAPP ]` | `[ BOOK A SLOT ]`
- Touch-friendly tap targets and zero layout shift.
