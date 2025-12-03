## Groceries QR Pages

This project contains five mobile-optimized product landing pages designed to be opened directly from QR codes.

- **Fast loading**: Pure HTML/CSS/JS, no bulky frameworks.
- **Mobile-first UI**: Touch-friendly layout, large tap targets, modern design.
- **Lazy-loaded media**: Product images and carousel items use `loading=\"lazy\"` and IntersectionObserver for low latency.

### Structure

- `index.html` – optional hub page listing all products (can also be opened via QR).
- `pages/product-*.html` – individual product pages for QR.
- `assets/css/styles.css` – shared styling.
- `assets/js/product-page.js` – shared behavior for product pages (carousel, lazy loading, minor interactions).

Open any `pages/product-*.html` file in a mobile browser (or via a QR code URL) to see its product details.

.
