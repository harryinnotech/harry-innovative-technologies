# Store product images

Place product images for the Store in this folder.

Recommended naming:

- `hybrid-solar-inverter-5kva-front.jpg`
- `hybrid-solar-inverter-5kva-rear.jpg`
- `hybrid-solar-inverter-5kva-display.jpg`

Then update the product record in `src/data/products.js`:

```js
images: [
  "/products/images/hybrid-solar-inverter-5kva-front.jpg",
  "/products/images/hybrid-solar-inverter-5kva-rear.jpg",
  "/products/images/hybrid-solar-inverter-5kva-display.jpg",
],
```

The first image is used as the main image. Additional images appear as selectable thumbnails on the product detail page. Keep `image` as a fallback until your local images are ready.
