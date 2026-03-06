# Audio/Video Player Integration Guide

## ✅ Player Features

The website now includes a fully functional audio/video player modal that supports:
- **YouTube Videos** - Full video playback
- **SoundCloud Audio** - Audio track playback

## 🎬 How to Add YouTube Videos

### Step 1: Get Your YouTube Video ID

1. Go to your YouTube video
2. Copy the URL from the address bar
3. Extract the video ID (the part after `v=`)

**Example:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Video ID: dQw4w9WgXcQ
```

### Step 2: Add to Remix/Song Cards

Find your remix or song card in `index.html` and add the `data-youtube` attribute:

```html
<!-- Remix Card Example -->
<div class="music-card group" data-type="youtube" data-youtube="YOUR_VIDEO_ID">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <!-- ... -->
        <button class="play-btn" data-type="youtube" data-youtube="YOUR_VIDEO_ID">
            <i class="fas fa-play"></i>
        </button>
    </div>
    <!-- ... -->
</div>
```

**Replace `YOUR_VIDEO_ID` with your actual YouTube video ID.**

### Example:
```html
<!-- Before -->
<div class="music-card group" data-type="youtube" data-youtube="YOUR_YOUTUBE_VIDEO_ID_1">

<!-- After -->
<div class="music-card group" data-type="youtube" data-youtube="dQw4w9WgXcQ">
```

## 🎵 How to Add SoundCloud Audio

### Step 1: Get Your SoundCloud Track URL or ID

**Option A: Track URL**
1. Go to your SoundCloud track
2. Copy the full URL
3. Use the URL directly

**Option B: Track ID**
1. Go to your SoundCloud track
2. Look at the URL or use the track ID
3. Use just the numeric ID

### Step 2: Add to Music Cards

```html
<!-- SoundCloud Example -->
<div class="music-card group" data-type="soundcloud" data-soundcloud="YOUR_TRACK_URL_OR_ID">
    <div class="relative overflow-hidden rounded-lg mb-4">
        <!-- ... -->
        <button class="play-btn" data-type="soundcloud" data-soundcloud="YOUR_TRACK_URL_OR_ID">
            <i class="fas fa-play"></i>
        </button>
    </div>
    <!-- ... -->
</div>
```

**Examples:**
```html
<!-- Using Track URL -->
<div class="music-card group" data-type="soundcloud" data-soundcloud="https://soundcloud.com/user/track-name">

<!-- Using Track ID -->
<div class="music-card group" data-type="soundcloud" data-soundcloud="123456789">
```

## 📍 Where to Add Video IDs

### Remixes Section
- **Remix Card 1**: `data-youtube="YOUR_YOUTUBE_VIDEO_ID_1"`
- **Remix Card 2**: `data-youtube="YOUR_YOUTUBE_VIDEO_ID_2"`
- **Remix Card 3**: `data-youtube="YOUR_YOUTUBE_VIDEO_ID_3"`

### Songs Section
- **Song Card 1**: `data-youtube="YOUR_YOUTUBE_VIDEO_ID_4"`
- **Song Card 2**: `data-youtube="YOUR_YOUTUBE_VIDEO_ID_5"`

### Videos Section
- Already configured with `data-video` attribute (uses video modal)

### Acting/Performance Section
- Can be updated similarly with `data-youtube` attribute

## 🎯 Player Behavior

### When Play Button is Clicked:
1. **If YouTube ID is valid**: Opens YouTube player in modal
2. **If SoundCloud ID is valid**: Opens SoundCloud player in modal
3. **If placeholder**: Shows helpful alert with instructions
4. **If no ID**: Opens YouTube channel in new tab

### Player Features:
- ✅ Full-screen modal overlay
- ✅ Auto-play when opened
- ✅ Close button (X) to stop playback
- ✅ Click outside modal to close
- ✅ Responsive design
- ✅ YouTube: 16:9 aspect ratio
- ✅ SoundCloud: 400px height audio player

## 🔧 Advanced: Using Both YouTube and SoundCloud

You can add both options to a single card:

```html
<div class="music-card group" 
     data-type="youtube" 
     data-youtube="VIDEO_ID"
     data-soundcloud="TRACK_ID">
    <!-- Player will use YouTube by default, but SoundCloud is available -->
</div>
```

The player prioritizes YouTube if both are present.

## 📝 Quick Reference

### YouTube Video ID Format:
- **Full URL**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- **Video ID**: `dQw4w9WgXcQ`
- **Short URL**: `https://youtu.be/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`

### SoundCloud Format:
- **Full URL**: `https://soundcloud.com/user/track-name`
- **Track ID**: `123456789` (numeric)

## ✅ Testing

After adding video/audio IDs:
1. Open `index.html` in your browser
2. Navigate to Remixes or Songs section
3. Click the play button on any card
4. The player modal should open and start playing

## 🎨 Customization

### Change Player Size:
Edit `styles.css`:
```css
.video-modal-content {
    width: 900px; /* Change this */
}
```

### Change SoundCloud Player Height:
Edit `styles.css`:
```css
#soundcloud-player iframe {
    height: 400px; /* Change this */
}
```

## 🚀 Your YouTube Channel

Your YouTube channel: [https://www.youtube.com/@DjLakhanNandurbar18](https://www.youtube.com/@DjLakhanNandurbar18)

Visit your channel to get video IDs from your uploaded videos.

---

**Note**: Only add the video ID (not the full URL) for YouTube. For SoundCloud, you can use either the full URL or track ID.
