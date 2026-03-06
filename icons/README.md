# PWA Icons Required

## Required Icon Sizes

Create PNG icons in the following sizes and place them in this `icons` folder:

- `icon-16x16.png` - 16x16 pixels
- `icon-32x32.png` - 32x32 pixels
- `icon-72x72.png` - 72x72 pixels
- `icon-96x96.png` - 96x96 pixels
- `icon-128x128.png` - 128x128 pixels
- `icon-144x144.png` - 144x144 pixels
- `icon-152x152.png` - 152x152 pixels
- `icon-192x192.png` - 192x192 pixels (Required)
- `icon-384x384.png` - 384x384 pixels
- `icon-512x512.png` - 512x512 pixels (Required)

## Quick Generation

### Option 1: Online Tools
1. Visit https://realfavicongenerator.net/
2. Upload your logo (512x512px recommended)
3. Generate all sizes
4. Download and place in this folder

### Option 2: PWA Builder
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload your icon
3. Generate PWA icons
4. Download and extract to this folder

### Option 3: Favicon.io
1. Visit https://favicon.io/
2. Upload your image
3. Generate favicon package
4. Use the generated PNG files

## Icon Design Tips

- Use a square image (1:1 aspect ratio)
- Include padding around the logo
- Use transparent background or solid color
- Ensure logo is centered
- High contrast for visibility
- Simple design works best at small sizes

## Minimum Required

At minimum, you need:
- `icon-192x192.png` (for Android)
- `icon-512x512.png` (for splash screens)

The PWA will work with just these two, but more sizes provide better quality on different devices.

## Testing

After adding icons:
1. Open Chrome DevTools
2. Go to Application → Manifest
3. Check if icons are detected
4. Verify all sizes are listed

---

**Note**: The website will work without icons, but the PWA install prompt and app icon won't display properly until icons are added.
