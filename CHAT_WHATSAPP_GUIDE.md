# Live Chat & WhatsApp Integration Guide

## ✅ Features Implemented

### 1. **Live Chat Widget**
- Fixed chat button in bottom-right corner
- Chat window with message history
- Quick reply buttons
- Bot responses to common questions
- Unread message badge
- WhatsApp link in chat footer

### 2. **WhatsApp Integration**
- Floating WhatsApp button (bottom-right)
- Quick contact buttons in contact section
- Click-to-chat functionality
- Pre-filled messages for booking

### 3. **Contact Form with File Upload**
- File upload support
- Drag & drop functionality
- Multiple file selection
- File preview and removal
- File size validation (10MB max)
- File type validation

## 📱 WhatsApp Setup

### Update Phone Number

Find and replace `911234567890` with your actual WhatsApp number:

**Files to update:**
1. `index.html` - Contact section and floating button
2. All WhatsApp links use format: `https://wa.me/PHONE_NUMBER`

**Format:** Use country code + number (no spaces, dashes, or + sign)
- Example: `911234567890` (India: +91 1234567890)
- Example: `1234567890` (US: +1 234567890)

### WhatsApp Links Created

1. **General Chat**: `https://wa.me/911234567890?text=Hello%20DJ%20Lakhan...`
2. **Booking**: `https://wa.me/911234567890?text=Hello%2C%20I%20would%20like%20to%20book...`
3. **Floating Button**: Quick chat link
4. **Chat Widget Footer**: WhatsApp link

## 💬 Live Chat Widget

### Features

- **Chat Toggle**: Click to open/close chat window
- **Quick Replies**: Pre-defined buttons for common questions
- **Bot Responses**: Automatic replies based on keywords
- **Message History**: Scrollable chat messages
- **Unread Badge**: Shows number of unread messages
- **WhatsApp Link**: Direct link to WhatsApp in footer

### Customize Chat Responses

Edit `script.js` - `chatResponses` object:

```javascript
const chatResponses = {
    'book': 'Your custom booking response...',
    'remix': 'Your remix response...',
    // Add more responses
};
```

### Connect to Real Chat Service

Replace bot responses with actual API:

```javascript
// Example with API
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    addMessage(message, 'user');
    
    // Call your chat API
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage(data.reply, 'bot');
});
```

**Popular Chat Services:**
- **Tawk.to** (Free)
- **Intercom** (Paid)
- **Crisp** (Free tier)
- **Zendesk Chat** (Paid)
- **Custom Backend** (Your own API)

## 📎 File Upload Features

### Supported File Types
- Images: `image/*` (jpg, png, gif, webp, etc.)
- Documents: `.pdf`, `.doc`, `.docx`
- Audio: `audio/*` (mp3, wav, etc.)
- Video: `video/*` (mp4, mov, etc.)

### File Limits
- **Max Size**: 10MB per file
- **Multiple Files**: Yes, multiple files can be uploaded
- **Validation**: Automatic file type and size checking

### Customize File Limits

Edit `script.js`:

```javascript
const maxSize = 10 * 1024 * 1024; // Change 10 to your desired MB
const allowedTypes = ['image/', '.pdf', '.doc']; // Add/remove types
```

### Backend Integration

For file uploads, you need a backend that accepts multipart/form-data:

**Formspree (Free tier supports files):**
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData // FormData with files
});
```

**Custom Backend:**
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData
});
```

## 🎨 Customization

### Change Chat Widget Position

Edit `styles.css`:
```css
.chat-widget {
    bottom: 20px; /* Change position */
    right: 20px; /* Change position */
}
```

### Change WhatsApp Button Position

Edit `styles.css`:
```css
.whatsapp-float {
    bottom: 100px; /* Adjust based on music player */
    right: 20px;
}
```

### Change Chat Colors

Edit `styles.css`:
```css
.chat-toggle {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

## 📋 Quick Reply Buttons

Current quick replies:
- "Book Event"
- "Remixes"
- "Pricing"

Add more in `index.html`:
```html
<button class="quick-reply-btn" data-message="Your message">
    Button Text
</button>
```

## 🔔 Chat Integration Options

### Option 1: Tawk.to (Free)
1. Sign up at https://www.tawk.to
2. Get widget code
3. Replace chat widget HTML with Tawk.to code

### Option 2: Custom Backend
1. Create chat API endpoint
2. Update `chatForm` submit handler
3. Connect to your backend

### Option 3: Keep Current Bot
- Works offline
- No backend needed
- Customize responses in JavaScript

## 📱 Mobile Experience

- Chat widget adapts to mobile screens
- Full-width chat window on mobile
- Touch-friendly buttons
- WhatsApp button adjusts position
- File upload works on mobile

## ✅ Testing Checklist

- [ ] Update WhatsApp phone number
- [ ] Test chat widget open/close
- [ ] Test quick reply buttons
- [ ] Test file upload
- [ ] Test drag & drop files
- [ ] Test file removal
- [ ] Test WhatsApp links
- [ ] Test on mobile devices
- [ ] Customize chat responses
- [ ] Connect to real chat service (optional)

## 🚀 Next Steps

1. **Update WhatsApp Number**: Replace `911234567890` with your number
2. **Customize Chat**: Update bot responses in `script.js`
3. **Connect Backend**: Set up form submission endpoint
4. **Add Chat Service**: Integrate Tawk.to or similar (optional)
5. **Test**: Test all features on desktop and mobile

---

**All features are ready to use!** Just update the WhatsApp number and customize as needed.
