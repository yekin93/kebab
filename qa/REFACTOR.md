# Architecture refactor

## Source structure

```text
src/
  App.tsx
  main.tsx
  styles.css
  components/
    layout/
      Header.tsx
      MobileNavigation.tsx
      Footer.tsx
      Logo.tsx
    ui/
      Reveal.tsx
      SectionHeading.tsx
      Modal.tsx
      InfoDialog.tsx
    menu/
      MenuCard.tsx
      MenuCategoryFilter.tsx
    gallery/
      GalleryLightbox.tsx
  sections/
    HeroSection.tsx
    FeaturesSection.tsx
    SpecialtiesSection.tsx
    MenuSection.tsx
    AboutSection.tsx
    GallerySection.tsx
    ContactSection.tsx
  data/
    restaurant.ts
    menu.ts
    navigation.ts
    gallery.ts
    infoMessages.ts
  hooks/
    useScrollPosition.ts
  types/
    restaurant.ts
    menu.ts
  lib/
    formatPrice.ts
```

## Ownership

- App composes the page, preserves MotionConfig, and coordinates menu category selection between specialties and the digital menu. It also owns the shared information dialog used by header, hero, contact, and footer actions.
- Header owns mobile menu state, Escape handling, and active-section observation. The scroll hook preserves the original 30px threshold and passive listener cleanup.
- GallerySection owns the selected image. GalleryLightbox owns its keyboard subscription and preserves functional state updates, wraparound, and the shared Modal's focus/scroll handling.
- MenuCategoryFilter owns tab keyboard interactions; MenuSection owns menu rendering and transitions. Category state remains shared with SpecialtiesSection.
- Shared UI helpers were split from the original combined ui.tsx file without markup changes. No extra layout wrappers were introduced.
- Navigation, gallery, and dialog text have dedicated typed data modules. Menu and restaurant types are separate from their data. Category is derived from the single categories tuple using a type-only import; it creates no runtime import cycle.
- formatPrice retains the existing de-AT currency formatting. No Button or Container abstraction was added because it would not meaningfully simplify this implementation.

## Verification

- Strict TypeScript: passed (`tsc -b`, also included in the build).
- Production build: passed (`npm run build`).
- Lint: no lint script exists; no new lint dependency was added.
- Initial server-rendered HTML: byte-for-byte identical to the pre-refactor source (SHA256 `5395b3951048d8555cd70724b0b980bd13feae918ef9db19b66d225dda05366a`).
- Desktop hero screenshots: byte-for-byte identical PNGs (SHA256 `1feac7ccdf1c40de87f55842b32d6dff163a1697c4d1db770820960730c041bf`).
- Mobile: original and refactored pages compared side by side at 375px. No visible difference in the captured hero. See mobile-comparison.png.
- Responsive frames at 375, 768, 1024, and 1440px: content width equals available viewport width, with no broken loaded images. Native vertical scrollbars consume 15px in these checks.
- All original Motion initial, animate, exit, transition, and reducedMotion props: structurally compared against the original App source and unchanged. Reveal's implementation was moved intact; CSS is unchanged.
- Browser checks passed: navigation to the menu; all six category filters; category arrow-key navigation; specialty selection updating the menu; gallery opening, left-key wraparound, next button wraparound, and Escape dismissal; mobile menu opening, link selection closing it, and Escape dismissal.
- Browser application console errors: none observed.
- Stylesheet, package.json, and package-lock.json: unchanged. No images, content values, dependencies, or responsive rules were changed.

## Deliberate boundaries

The existing global stylesheet remains intact to preserve all selectors and layouts. Shared menu selection and shared information-dialog state remain in App; introducing context or global state would add complexity. Existing placeholder legal and business information remains unchanged. No new architectural blocker was found.

Visual comparison covers captured mobile and desktop views, not an exhaustive pixel comparison of every scroll position or animation frame.
