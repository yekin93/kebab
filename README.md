# KÖZ KEBAP

A fictional Austrian restaurant presentation built with React 19, TypeScript, Vite, Tailwind CSS 4, Motion, and Lucide.

## Run locally

```sh
npm install
npm run dev
```

Production validation: `npm run build`. Preview the build: `npm run preview`.

## Replace demo content

- `src/data/restaurant.ts`: brand, address, phone, and opening hours. Set `routeUrl` and `phoneHref` only when real destinations are available. Until then, contact buttons explain the demo status.
- `src/data/menu.ts`: typed menu, categories, specialties, and demo prices.
- `src/data/navigation.ts` and `src/data/gallery.ts`: navigation links and gallery images.
- `src/sections/AboutSection.tsx`: restaurant story.
- `src/data/infoMessages.ts`: contact, social, and legal placeholder dialog content. Supply valid legal text before business use.
- `public/images/`: local Pexels placeholder photographs. See `IMAGE-CREDITS.md`.
- `index.html`: title, description, and Open Graph metadata. Set the absolute production Open Graph image URL when a real domain is chosen.

All contact details and prices are fictional. No ordering, payments, analytics, or backend. Fonts load from Google Fonts. Legal copy is explicitly a placeholder.

## Browser QA

Open `/qa/responsive.html` on the development server for a four-width preview and overflow report. This helper is outside `public/` and is not included in the production build.

Validated: production TypeScript/build; menu category filtering; gallery opening, arrow-key navigation and Escape dismissal; mobile navigation opening and closing on selection; route-placeholder dialog. The four viewport checks (375, 768, 1024, 1440px iframe widths) reported no horizontal content overflow or broken loaded images. Lighthouse scoring has not been run.


## Digital menu and QR table card

- `/speisekarte`: public, mobile-first menu. All six categories are visible; sticky links jump to each category. Products, descriptions, and prices come from `src/data/menu.ts`, shared with the homepage. `MenuProduct` renders both menus.
- `/entwickler/qr`: unlisted developer preview for QR generation, PNG/SVG export, and printing. It has `noindex, nofollow`, but **is not access-controlled**. No secrets belong here.
- The existing homepage composition is now `src/pages/HomePage.tsx`. Its rendered initial HTML and existing stylesheet are unchanged. App only selects the page; ordinary links use native browser navigation, including back/forward. Page modules are lazy-loaded, so QR generation is not loaded for menu visitors.

### Configure the production QR destination

Copy `.env.example` to `.env.local` and set `VITE_PUBLIC_SITE_URL` to the real public HTTPS origin you control. The variable is public build-time configuration, not a secret. It must contain only the origin, without a port, subpath, query, or fragment. Local/private IP addresses, HTTP, and local/reserved suffixes are rejected. This project is designed for domain-root deployment.

Restart the dev server after changing the environment, or run `npm run build` again and deploy the updated `dist/`. The encoded destination is exactly `${VITE_PUBLIC_SITE_URL}/speisekarte`. The current browser origin is never used as a fallback. With missing or invalid configuration, no QR image is generated and print/export buttons remain disabled.

Open `/entwickler/qr` to download the QR as a 2048 × 2048 PNG or scalable SVG. Both use the local `qrcode` package, high error correction, a four-module quiet zone, and a dark code on white. There is no external QR service. Do not overlay artwork or crop the white border.

The print button opens the browser print dialog for an A6 card (105 × 148 mm), with a 60mm QR. Select A6, 100% scale, no browser headers/footers, and background graphics. Verify the displayed destination, deployed menu, and a physical test scan before printing a batch. Updating menu data later does not require a new QR as long as its public URL remains the same.

### Hosting and direct URLs

`npm run build` includes `scripts/create-route-entries.mjs`, which generates:

```text
dist/index.html
dist/speisekarte/index.html
dist/entwickler/qr/index.html
```

Upload the **entire** `dist/` to a static host serving directory `index.html` files at the domain root. Menu and QR direct access work with or without trailing slashes, without relying on an SPA fallback. A host may redirect `/speisekarte` to `/speisekarte/`; both resolve to the same page. If your host does not support directory indexes, configure rewrites for `/speisekarte` and `/entwickler/qr` to their respective entry files. No hosting provider is configured in this repository; no deployment was performed.

### Feature checks

```sh
npm run build
npm run test:menu
```

The tests check public URL handling, the missing-config disabled state, shared products, PNG/SVG dimensions/content and download payloads, and built route entries. Run the build first. Test QR fixtures use `https://example.com/speisekarte` **only in QA**, are generated under ignored `qa/qr-validation/`, and must never be used for the restaurant.

Optional PNG decoding can be repeated by setting `QR_DECODER_PATH` to an installed `jsqr` module's absolute JavaScript entry path before running `npm run test:menu`. A temporary decoder was used during implementation; it is not an application dependency.

Open `/qa/digital-responsive.html` in development for the four-width menu check. Full implementation verification and limitations are in `qa/DIGITAL-MENU.md`.
