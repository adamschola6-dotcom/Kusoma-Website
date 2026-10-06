# Kusoma Web Experience Plan

## Outcome
Deliver a polished, responsive, interactive marketing website for Kusoma, Nyota Tech's Android AI-powered floating study assistant. The page is a one-route product story that moves from a dark hero into a cinematic product showcase and ends with glassmorphism feature cards.

## Architecture
- **Serving arrangement:** static frontend only. All content is authored in the browser and can be built ahead of time; no database, auth, or server API is required.
- **Runtime:** a small Vite development server on the managed Web Dev port 3000; production output is the repository root for this static page.
- **Routes:** `/` only, plus the required `/manus-routes.json` manifest. No API routes.
- **Caching:** published static assets can be long-lived when versioned; HTML remains revalidated by the hosting layer. Development uses relative asset URLs so Cloud Preview works cross-origin.
- **Motion:** CSS 3D transforms and a small requestAnimationFrame scroll controller keep the experience lightweight while creating a Spline/WebGL-like depth system.

## Structure
- `index.html` — semantic page shell, hero, product showcase, feature narrative, and footer.
- `styles.css` — design system, responsive layout, 3D phone, glass cards, and motion states.
- `app.js` — scroll progress, pointer parallax, nav state, reduced-motion handling, and minor interaction affordances.
- `public/assets/` — Nyota Tech/Kusoma mark and favicon.
- `public/manus-routes.json` — origin route manifest.
- `app.config.ts` — project logo metadata for Web Dev branding sync.

## Design direction
A premium "night lab" language: warm off-white typography on deep ink-black surfaces, a restrained cyan/lilac/acid-lime accent system, large typographic moments, thin technical rules, and frosted panels. The Kusoma phone is the hero object: it floats in a deep field, rotates around a soft light, and shifts from center to the side as feature cards arrive.

## Verification
- Register host-managed TypeScript diagnostics before starting the development server.
- Start the project with its declared port and confirm HTTP readiness.
- Request `/manus-routes.json` and validate it is HTTP 200 JSON matching the route-manifest contract.
- Run the project's typecheck/build command once after implementation.
- Inspect the source for route consistency, responsive breakpoints, reduced-motion behavior, and the required Nyota Tech / Kusoma feature copy.
