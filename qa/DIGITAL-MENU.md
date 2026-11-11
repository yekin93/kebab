# Digital menu verification

## Implemented

- `/speisekarte`: all 15 current shared menu products, 6 sticky category links, prices, intro, restaurant contact details, opening hours, and homepage links. No login, ordering, or payments.
- `/entwickler/qr`: unlisted QR preview using build-time `VITE_PUBLIC_SITE_URL`, local PNG/SVG generation, export buttons, and A6 print card.
- Components: DigitalMenuPage, MenuCategoryNavigation, MenuProduct, QRCodeGenerator, QRMenuPrintCard, QRPreviewPage.
- Utilities: typed public URL validation, QR asset generation and downloads. Only qrcode and its TypeScript definitions were added.
- Per-route HTML entries are emitted into dist to support plain static hosting and refreshes.

## Passed

- Strict TypeScript compilation and production build.
- Automated URL checks: absent/malformed values, HTTP, local/IP addresses, reserved suffixes, credentials, port, path, query, and fragment rejection; valid origin normalization.
- Automated missing-config markup check: alert present, three controls disabled, no generated image.
- Shared menu data: every product appears on the digital menu, using the same MenuProduct component as the homepage menu.
- PNG: 2048 × 2048 pixels, opaque white border. SVG: 2048px dimensions, valid generated SVG and data URL. Both use high correction and four-module quiet zone.
- Download utility: PNG/SVG filenames, MIME types, and byte-for-byte matching payloads.
- Generated test PNG decoded using jsQR to exactly `https://example.com/speisekarte`. This is a QA-only fixture, not the production destination.
- Browser: missing-URL warning and disabled controls; configured test QR rendered; PNG/SVG clicks initiate downloads and show status.
- Browser: sticky desktop/mobile category navigation and active category state, all products visible.
- Responsive frames at 375/768/1024/1440px: no horizontal content overflow (native vertical scrollbars consume 15px).
- Plain static server with no SPA fallback: HTTP 200 for /speisekarte, /speisekarte/, /entwickler/qr. Browser direct load and refresh of production /speisekarte render the heading and all 15 products, without console errors.
- A6 print styling simulated in a QA-only page at 396.84 × 559.36 CSS pixels (105 × 148 mm); final instruction text remains inside the card. This is layout simulation, not a physical print test.
- Homepage preservation: initial HTML SHA256 remains `5395b3951048d8555cd70724b0b980bd13feae918ef9db19b66d225dda05366a`; styles.css SHA256 remains `ced48766f1a84ef1174f136c46c3a31d3a52cfb1e85c673fd26806634b6c1155`.

## Limits

No public production URL was supplied; configuration is deliberately left empty and production QR export/printing stays disabled. A configured domain's ownership and reachability must be confirmed before printing. No hosting deployment, physical smartphone scan, iPhone/Android device test, or physical print was performed. Print-dialog behavior and paper-size support depend on the browser/printer. The developer preview is unlisted, not authenticated. No lint script exists.
