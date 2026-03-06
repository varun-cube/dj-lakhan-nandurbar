# DJ Lakhan - Official Website

A modern, responsive website for Indian DJ featuring remixes, original songs, lyrics, performances, and booking functionality.

## Features

- 🎵 **Music Sections**: Remixes, Original Songs, Lyrics
- 🎬 **Performance Gallery**: Acting and stage performances
- 📱 **Fully Responsive**: Works on all devices
- 🌙 **Dark Theme**: Modern dark design with neon accents
- 🎨 **Modern UI**: Glassmorphism effects, smooth animations
- 📧 **Contact & Booking Forms**: Easy to contact and book events
- 🔗 **Social Media Integration**: Links to all social platforms
- ⚡ **Fast & Lightweight**: Pure HTML/CSS/JavaScript

## Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Google Fonts**: Bebas Neue, Orbitron, Rajdhani
- **Font Awesome**: Icons
- **Vanilla JavaScript**: No frameworks, pure JS

## Setup Instructions

1. **Download/Clone** all files to your local directory
2. **Open** `index.html` in a web browser
3. **That's it!** No build process needed

## Customization Guide

### 1. Update Social Media Links

Edit `script.js` and update the social media URLs:

```javascript
const urls = {
    instagram: 'https://instagram.com/YOUR_USERNAME',
    youtube: 'https://youtube.com/@YOUR_CHANNEL',
    spotify: 'https://open.spotify.com/artist/YOUR_ID',
    facebook: 'https://facebook.com/YOUR_PAGE',
    twitter: 'https://twitter.com/YOUR_HANDLE'
};
```

Also update the `href` attributes in `index.html` for social icons.

### 2. Add Your Content

#### Remixes Section
- Replace placeholder remix cards with your actual remixes
- Add YouTube/SoundCloud embed codes or links
- Update titles and artist names

#### Original Songs Section
- Add your song titles and descriptions
- Update streaming platform links (Spotify, YouTube, Apple Music)
- Add album artwork or thumbnails

#### Lyrics Section
- Replace placeholder lyrics with your actual written lyrics
- Format with verses and choruses

#### Acting Section
- Add your performance videos
- Update movie/show names and years
- Add YouTube embeds or video links

#### About Section
- Update the bio text
- Modify statistics (number of remixes, songs, followers)
- Add real achievements and highlights

### 3. Update Contact Information

In the Contact section, update:
- Email address
- Phone number
- Location/Address

### 4. Form Integration

The forms currently show alerts. To make them functional:

**Option 1: Formspree (Free)**
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Update form submissions in `script.js`:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

**Option 2: EmailJS (Free)**
1. Sign up at https://www.emailjs.com
2. Configure email templates
3. Add EmailJS script and update form handlers

**Option 3: Backend API**
- Connect to your own backend API
- Update fetch URLs in `script.js`

### 5. Add Audio/Video Players

To add actual audio/video playback:

**For YouTube Videos:**
```html
<iframe 
    width="100%" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

**For SoundCloud:**
```html
<iframe 
    width="100%" 
    height="300" 
    scrolling="no" 
    frameborder="no" 
    src="https://w.soundcloud.com/player/?url=YOUR_TRACK_URL">
</iframe>
```

**For Spotify:**
```html
<iframe 
    style="border-radius:12px" 
    src="https://open.spotify.com/embed/track/TRACK_ID" 
    width="100%" 
    height="352" 
    frameborder="0">
</iframe>
```

### 6. Color Scheme Customization

Edit `styles.css` to change colors:

- **Purple**: `#a855f7` (primary accent)
- **Cyan**: `#06b6d4` (secondary accent)
- **Pink**: `#ec4899` (tertiary accent)

Search and replace these hex codes to match your brand.

### 7. Add Images

Replace placeholder icons with actual images:

1. Create an `images` folder
2. Add your photos (DJ photos, album covers, performance shots)
3. Update `src` attributes in HTML

Example:
```html
<img src="images/dj-photo.jpg" alt="DJ Lakhan" class="rounded-full">
```

## Deployment

### Free Hosting Options:

1. **Vercel** (Recommended)
   - Go to https://vercel.com
   - Sign up with GitHub
   - Import your repository
   - Deploy automatically

2. **Netlify**
   - Go to https://netlify.com
   - Drag and drop your folder
   - Or connect GitHub repository

3. **GitHub Pages**
   - Push code to GitHub repository
   - Go to Settings > Pages
   - Select main branch
   - Your site will be live at `username.github.io/repo-name`

4. **Cloudflare Pages**
   - Go to https://pages.cloudflare.com
   - Connect GitHub repository
   - Deploy automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Optimize images before uploading (use WebP format)
2. Minimize custom CSS if needed
3. Use CDN for fonts and icons (already done)
4. Enable browser caching
5. Consider lazy loading for images

## License

Free to use and modify for your personal/professional use.

## Support

For customization help or questions, refer to the code comments or modify as needed.

---

**Built with ❤️ for DJ Lakhan**
