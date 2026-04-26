# William Portfolio

Personal portfolio of William ([@williamm168](https://x.com/williamm168)), a Web3 content creator and community builder based in Vietnam.

**Live site:** [william-portfolio.vercel.app](https://william-portfolio.vercel.app)

---

## About

4+ years building the Sui ecosystem in Vietnam through grassroots meetups, hackathons, and foundation-scale content. This site showcases my work across experience, achievements, content, and side projects.

---

## Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, no config file)
- **Framer Motion** for page animations and transitions
- **GSAP** for hero entrance animations
- **Lenis 1.3.x** for smooth scroll
- **hls.js** for HLS video background (Mux stream)
- **Google Fonts**: Inter + Instrument Serif

## Features

- Cinematic hero section with HLS video background and dot grid overlay
- Scramble text role cycling animation
- Mouse-follow radial glow
- Smooth scroll with Lenis
- Animated experience timeline cards
- Achievements section with event carousels and counters
- Floating YouTube video cards (content section)
- Terminal-style side project cards
- Responsive layout with hamburger navigation on mobile
- Loading screen with animated counter

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
  components/
    Navbar.tsx          # Top navigation + mobile hamburger menu
    Hero.tsx            # Full-screen hero with video background
    Experience.tsx      # Work history timeline cards
    Achievements.tsx    # Competitions, events, and social stats
    YouTubeContent.tsx  # Video content showcase
    Building.tsx        # Side projects (terminal card style)
    Connect.tsx         # Contact links section
    Footer.tsx          # Marquee + social links
    LoadingScreen.tsx   # Animated intro loader
  index.css             # Global styles, keyframes, CSS variables
  App.tsx               # Root component with Lenis scroll setup
  main.tsx
public/
  images/               # Event and profile images
```

---

## Deploy on Vercel

This project is configured for zero-config deployment on Vercel.

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework: **Vite** (auto-detected)
4. Click Deploy

Or use the CLI:

```bash
npm install -g vercel
vercel --prod
```

---

## Contact

- X: [@williamm168](https://x.com/williamm168)
- YouTube: [@williamm168](https://youtube.com/@williamm168)
- Telegram: [t.me/williamm168](https://t.me/williamm168)
- LinkedIn: [tan-phat-8619203a7](https://linkedin.com/in/tan-phat-8619203a7/)
- Email: trantanphat1501@gmail.com
