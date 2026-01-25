# Browning's Welding Website

**Client:** Browning's Welding Service, Inc.
**Type:** Business Website
**Status:** In Production
**URL:** browningswelding.com

---

## Project Overview

Family-owned metal fabrication business website showcasing their services, team, and capabilities. Modern Next.js site with smooth animations and mobile-first design.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + Custom scroll hooks
- **Hosting:** Vercel
- **Repo:** github.com/bnlcollectivellc/brownings-welding

---

## Key Pages

- `/` - Home (hero, services, carousels, testimonials, CTA)
- `/about` - Company story and values
- `/team` - Full team with photos
- `/services` - Service offerings
- `/industries` - Industries served with client logos
- `/gallery` - Project showcase
- `/contact` - Contact form

---

## Notable Implementations

### Infinite Scroll Carousels
- **ClientsSection:** Partner logos, links to /industries
- **TeamSection:** Team member photos, links to /team
- **TestimonialsSection:** Customer reviews (50% slower speed)

**Pattern:** Triple items for seamless loop, useRef for animation state, smooth speed interpolation, transparent mobile overlay for tappable links.

### Hero Image Positioning
- Used `object-[center_XX%]` for precise control
- Extended `vh` heights rather than over-adjusting position

### Navbar
- Hidden by default, hover-reveals on desktop
- Fixed mobile menu controls with higher z-index

---

## Lessons Learned This Project

1. **Mobile carousel links need overlay approach** - Auto-scroll prevents touch events from registering as taps
2. **Use useRef not useState for animation loop state** - Prevents effect re-runs
3. **Smooth speed interpolation** - `speed += (target - speed) * 0.05` for natural deceleration
4. **Separate init and animation useEffects** - Both with empty deps to prevent re-initialization
5. **Hero image vh > object-position** - More reliable for showing full subjects

---

## Session Notes

### 2026-01-23
- Fixed mobile carousel links with transparent overlay pattern
- ClientsSection overlay → /industries
- TeamSection overlay → /team
- Testimonials carousel slowed to 50% (0.25 speed vs 0.5)
- All carousels now cohesive with same behavior

---

## Open Items

- None currently

---

*Last updated: 2026-01-23*
