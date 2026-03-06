# Content Examples & Integration Guide

This file shows examples of how to add real content to your DJ website.

## YouTube Video Integration

Replace placeholder cards with actual YouTube embeds:

```html
<!-- In Remixes or Acting Section -->
<div class="music-card group">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
    <h3 class="text-xl font-orbitron mb-2">Your Remix Title</h3>
    <p class="text-gray-400 font-rajdhani text-sm">Original Artist Name</p>
</div>
```

**To get YouTube Video ID:**
- URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Use only the `VIDEO_ID` part

## SoundCloud Integration

```html
<div class="music-card group">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/YOUR_TRACK_ID&color=%23a855f7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
        </iframe>
    </div>
    <h3 class="text-xl font-orbitron mb-2">Your Track Title</h3>
</div>
```

## Spotify Integration

```html
<div class="music-card group">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <iframe 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/track/YOUR_TRACK_ID?utm_source=generator" 
            width="100%" 
            height="352" 
            frameborder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
    </div>
    <h3 class="text-xl font-orbitron mb-2">Your Song Title</h3>
</div>
```

## Example Remix Card with Real Content

```html
<div class="music-card group">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
    </div>
    <h3 class="text-xl font-orbitron mb-2">Bollywood Remix 2024</h3>
    <p class="text-gray-400 font-rajdhani text-sm">Original: Song Name</p>
    <div class="flex items-center mt-4 space-x-4">
        <a href="https://youtube.com/watch?v=VIDEO_ID" target="_blank" class="text-purple-400 hover:text-purple-300">
            <i class="fab fa-youtube"></i>
        </a>
        <a href="https://open.spotify.com/track/TRACK_ID" target="_blank" class="text-green-400 hover:text-green-300">
            <i class="fab fa-spotify"></i>
        </a>
    </div>
</div>
```

## Example Lyrics Format

```html
<div class="lyrics-card mb-6">
    <h3 class="text-2xl font-orbitron mb-4 text-purple-400">Song Title - Lyrics</h3>
    <div class="space-y-4 font-rajdhani text-gray-300 leading-relaxed">
        <p class="text-purple-400 font-semibold">[Verse 1]</p>
        <p>तू जो मिला तो लगा</p>
        <p>जैसे खिल गया फूल</p>
        <p>सारी दुनिया मुझे</p>
        <p>रास आने लगी</p>
        
        <p class="mt-4 text-purple-400 font-semibold">[Chorus]</p>
        <p>ओ मेरे दिल के चैन</p>
        <p>तू ही तू है मेरा</p>
        <p>हर एक पल में</p>
        <p>तू ही तू है मेरा</p>
    </div>
    <div class="mt-6 pt-6 border-t border-gray-700">
        <p class="text-sm text-gray-400">Written by: DJ Lakhan</p>
        <p class="text-sm text-gray-400">Music: DJ Lakhan</p>
    </div>
</div>
```

## Example About Section Content

```html
<div class="about-card">
    <div class="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div class="w-full md:w-64 h-64 rounded-full overflow-hidden flex-shrink-0">
            <img src="images/dj-lakhan-photo.jpg" alt="DJ Lakhan" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 text-center md:text-left">
            <h3 class="text-3xl font-orbitron mb-4 text-purple-400">DJ Lakhan</h3>
            <p class="text-gray-300 font-rajdhani text-lg leading-relaxed">
                Hailing from Nandurbar, Maharashtra, DJ Lakhan is a renowned Indian DJ, music producer, 
                and lyricist known for creating electrifying remixes and original compositions. With over 
                10 years of experience in the music industry, he has carved a unique space for himself 
                by blending traditional Indian music with modern electronic beats.
            </p>
        </div>
    </div>
    
    <!-- Rest of the content -->
</div>
```

## Form Integration Examples

### Formspree Integration

1. Sign up at https://formspree.io
2. Create a new form
3. Get your form endpoint (e.g., `https://formspree.io/f/xpzgqkny`)
4. Update `script.js`:

```javascript
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            contactForm.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    }
});
```

### EmailJS Integration

1. Sign up at https://www.emailjs.com
2. Create email service and template
3. Add EmailJS script to HTML:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

4. Update form handler:

```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
    .then(() => {
        alert('Message sent successfully!');
        contactForm.reset();
    }, (error) => {
        alert('Error: ' + error.text);
    });
```

## Social Media Links Update

Update all social media links in `index.html`:

```html
<!-- Hero Section -->
<a href="https://instagram.com/djlakhan" target="_blank" class="social-icon" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
</a>
<a href="https://youtube.com/@djlakhan" target="_blank" class="social-icon" aria-label="YouTube">
    <i class="fab fa-youtube"></i>
</a>
<!-- etc. -->
```

## Image Optimization Tips

1. **Use WebP format** for better compression
2. **Compress images** before uploading (use TinyPNG or similar)
3. **Use appropriate sizes**:
   - Hero images: 1920x1080px
   - Thumbnails: 400x400px
   - Profile photos: 500x500px
4. **Lazy load images** (already implemented in script.js)

## Adding More Sections

To add a new section (e.g., "Events" or "Gallery"):

1. Add navigation link in `<nav>`
2. Create new section with `id="section-name"`
3. Style it similar to existing sections
4. Add smooth scroll link

Example:

```html
<!-- In Navigation -->
<li><a href="#events" class="nav-link">Events</a></li>

<!-- New Section -->
<section id="events" class="py-20 bg-gray-900">
    <div class="container mx-auto px-4">
        <h2 class="text-5xl font-bebas mb-4">UPCOMING EVENTS</h2>
        <!-- Your content here -->
    </div>
</section>
```

## Performance Optimization

1. **Minify CSS/JS** for production
2. **Use CDN** for libraries (already done)
3. **Optimize images** (WebP format)
4. **Enable GZIP compression** on server
5. **Use browser caching** headers

---

**Note**: Replace all placeholder content with your actual content before going live!
