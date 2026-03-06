# How to Add YouTube Video IDs

## 📹 Getting Your YouTube Video ID

### Method 1: From YouTube URL
1. Go to your YouTube video
2. Copy the URL from the address bar
3. The video ID is the part after `v=` in the URL

**Example:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Video ID: dQw4w9WgXcQ
```

### Method 2: From YouTube Share Link
1. Click "Share" on your YouTube video
2. Copy the link
3. Extract the video ID (the part after `v=`)

**Example:**
```
Share Link: https://youtu.be/dQw4w9WgXcQ
Video ID: dQw4w9WgXcQ
```

## 🔧 How to Update Video IDs in the Website

### Step 1: Open `index.html`
Open the file in a text editor or code editor.

### Step 2: Find the Videos Section
Search for `<!-- Videos Section -->` or look for `data-video` attributes.

### Step 3: Replace Placeholder IDs
Find these lines:
```html
<button class="play-btn" data-video="YOUR_VIDEO_ID_1">
<button class="play-btn" data-video="YOUR_VIDEO_ID_2">
<button class="play-btn" data-video="YOUR_VIDEO_ID_3">
```

Replace `YOUR_VIDEO_ID_1`, `YOUR_VIDEO_ID_2`, `YOUR_VIDEO_ID_3` with your actual YouTube video IDs.

### Example:
```html
<!-- Before -->
<button class="play-btn" data-video="YOUR_VIDEO_ID_1">

<!-- After -->
<button class="play-btn" data-video="dQw4w9WgXcQ">
```

## 📝 Video Card Structure

Each video card has:
- **Title**: Update `<h3>` text with your video title
- **Description**: Update the release date or description
- **Video ID**: Update `data-video` attribute
- **Duration**: Update the time display (optional)

### Complete Example:
```html
<div class="video-card group">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <div class="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <i class="fas fa-play-circle text-6xl text-white/80"></i>
        </div>
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button class="play-btn" data-video="YOUR_VIDEO_ID_HERE">
                <i class="fas fa-play"></i>
            </button>
        </div>
        <div class="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-rajdhani">
            <i class="fas fa-clock mr-1"></i> 3:45
        </div>
    </div>
    <h3 class="text-xl font-orbitron mb-2">Your Video Title</h3>
    <p class="text-gray-400 font-rajdhani text-sm">Released: 2024</p>
</div>
```

## ➕ Adding More Videos

To add more videos, copy one of the video card sections and:
1. Update the `data-video` attribute with a new video ID
2. Update the title and description
3. Optionally change the gradient colors for variety

## 🎬 Video Thumbnails (Optional Enhancement)

Currently, videos show placeholder gradients. To add actual YouTube thumbnails:

Replace the gradient div with:
```html
<img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg" 
     alt="Video Thumbnail" 
     class="w-full h-full object-cover">
```

## ✅ Testing

After adding video IDs:
1. Open `index.html` in your browser
2. Navigate to the Videos section
3. Click the play button on any video card
4. The video should open in a modal and play automatically

## 🔗 Your YouTube Channel

Your YouTube channel: [https://www.youtube.com/@DjLakhanNandurbar18](https://www.youtube.com/@DjLakhanNandurbar18)

Visit your channel to get video IDs from your uploaded videos.

---

**Note**: Only the video ID is needed (the part after `v=`), not the full URL!
