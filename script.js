// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.2)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.music-card, .music-card-large, .lyrics-card, .performance-card, .stat-card, .form-card, .contact-info-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Submission with File Upload
const contactForm = document.getElementById('contact-form');
const fileUpload = document.getElementById('file-upload');
const fileList = document.getElementById('file-list');
let selectedFiles = [];

if (fileUpload) {
    // File selection
    fileUpload.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // Drag and drop
    const fileLabel = fileUpload.nextElementSibling;
    if (fileLabel) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileLabel.addEventListener(eventName, preventDefaults, false);
        });
        
        fileLabel.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        });
    }
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleFiles(files) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/', '.pdf', '.doc', '.docx', 'audio/', 'video/'];
    
    Array.from(files).forEach(file => {
        // Check file size
        if (file.size > maxSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return;
        }
        
        // Check file type
        const isValidType = allowedTypes.some(type => 
            file.type.includes(type) || file.name.toLowerCase().endsWith(type)
        );
        
        if (!isValidType) {
            alert(`File type "${file.type}" is not supported.`);
            return;
        }
        
        // Add to selected files
        if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
            selectedFiles.push(file);
            displayFile(file);
        }
    });
    
    // Update file input
    if (fileUpload) {
        const dt = new DataTransfer();
        selectedFiles.forEach(file => dt.items.add(file));
        fileUpload.files = dt.files;
    }
}

function displayFile(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <span class="file-item-name">
            <i class="fas fa-file mr-2"></i>${file.name}
        </span>
        <span class="file-item-size">${formatFileSize(file.size)}</span>
        <button type="button" class="file-item-remove" onclick="removeFile('${file.name}', ${file.size})">
            <i class="fas fa-times"></i>
        </button>
    `;
    if (fileList) {
        fileList.appendChild(fileItem);
    }
}

function removeFile(fileName, fileSize) {
    selectedFiles = selectedFiles.filter(f => !(f.name === fileName && f.size === fileSize));
    
    // Update file input
    if (fileUpload) {
        const dt = new DataTransfer();
        selectedFiles.forEach(file => dt.items.add(file));
        fileUpload.files = dt.files;
    }
    
    // Update display
    if (fileList) {
        fileList.innerHTML = '';
        selectedFiles.forEach(file => displayFile(file));
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Make removeFile available globally
window.removeFile = removeFile;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Add files to FormData
        selectedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        try {
            // Here you would send to your server
            // Example with Formspree (supports file uploads)
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData
            // });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            selectedFiles = [];
            if (fileList) fileList.innerHTML = '';
            
        } catch (error) {
            alert('Error sending message. Please try again or contact us via WhatsApp.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Booking Form Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your booking request! We will contact you soon to confirm the details.');
        bookingForm.reset();
        
        // Example: Send to Formspree or your backend
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Booking request sent successfully!');
        //     bookingForm.reset();
        // })
        // .catch(error => {
        //     alert('Error sending booking request. Please try again.');
        // });
    });
}

// Audio/Video Player Modal
const playerModal = document.getElementById('player-modal');
const youtubePlayer = document.getElementById('youtube-player');
const soundcloudPlayer = document.getElementById('soundcloud-player');
const youtubeIframe = document.getElementById('youtube-iframe');
const soundcloudIframe = document.getElementById('soundcloud-iframe');

if (playerModal) {
    const closeBtn = playerModal.querySelector('.video-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            playerModal.classList.remove('active');
            // Stop playback
            if (youtubeIframe) youtubeIframe.src = '';
            if (soundcloudIframe) soundcloudIframe.src = '';
            youtubePlayer.classList.add('hidden');
            soundcloudPlayer.classList.add('hidden');
        });
    }
    
    playerModal.addEventListener('click', (e) => {
        if (e.target === playerModal) {
            playerModal.classList.remove('active');
            if (youtubeIframe) youtubeIframe.src = '';
            if (soundcloudIframe) soundcloudIframe.src = '';
            youtubePlayer.classList.add('hidden');
            soundcloudPlayer.classList.add('hidden');
        }
    });
}

// Play Button Functionality (for audio/video)
document.querySelectorAll('.play-btn, .play-btn-large').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Get player type and ID from button or parent card
        const playerType = this.getAttribute('data-type') || this.closest('[data-type]')?.getAttribute('data-type');
        const youtubeId = this.getAttribute('data-youtube') || this.closest('[data-youtube]')?.getAttribute('data-youtube');
        const soundcloudId = this.getAttribute('data-soundcloud') || this.closest('[data-soundcloud]')?.getAttribute('data-soundcloud');
        
        if (!playerModal) return;
        
        // Check if it's a placeholder
        if (youtubeId && (youtubeId.startsWith('YOUR_') || youtubeId.startsWith('VIDEO_ID'))) {
            alert('Please add your YouTube video ID to the data-youtube attribute.\n\nTo get your video ID:\n1. Go to your YouTube video\n2. Copy the URL\n3. The video ID is the part after v= in the URL\n\nExample: https://www.youtube.com/watch?v=dQw4w9WgXcQ\nVideo ID: dQw4w9WgXcQ');
            return;
        }
        
        if (soundcloudId && soundcloudId.startsWith('YOUR_')) {
            alert('Please add your SoundCloud track ID or URL to the data-soundcloud attribute.');
            return;
        }
        
        // Open YouTube player
        if (playerType === 'youtube' && youtubeId && youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID_1' && youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID_2' && youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID_3' && youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID_4' && youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID_5') {
            if (youtubeIframe && youtubePlayer) {
                youtubeIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
                youtubePlayer.classList.remove('hidden');
                soundcloudPlayer.classList.add('hidden');
                playerModal.classList.add('active');
            }
        }
        // Open SoundCloud player
        else if (playerType === 'soundcloud' && soundcloudId) {
            if (soundcloudIframe && soundcloudPlayer) {
                // SoundCloud embed URL format
                const soundcloudUrl = soundcloudId.includes('http') 
                    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudId)}&color=%23a855f7&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
                    : `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudId}&color=%23a855f7&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
                
                soundcloudIframe.src = soundcloudUrl;
                soundcloudPlayer.classList.remove('hidden');
                youtubePlayer.classList.add('hidden');
                playerModal.classList.add('active');
            }
        }
        // Fallback: try to open YouTube channel
        else {
            window.open('https://www.youtube.com/@DjLakhanNandurbar18', '_blank');
        }
    });
});

// Social Media Links are now directly in HTML with proper href attributes
// No need for JavaScript handler as links are already configured

// Add particles animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() > 0.5 ? '168, 85, 247' : '6, 182, 212'}, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', createParticles);

// Add typing effect to hero text (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-purple-400');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-purple-400');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Statistics Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('K') ? 'K' : element.textContent.includes('M') ? 'M+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('K') ? 'K' : element.textContent.includes('M') ? 'M+' : '');
        }
    }, 16);
}

// Observe statistics for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Also observe hero stats
    const heroStats = document.querySelectorAll('#home [data-count]');
    heroStats.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !stat.classList.contains('counted')) {
                    stat.classList.add('counted');
                    animateCounter(stat);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(stat);
    });
});

// ============================================
// ADVANCED GALLERY FUNCTIONALITY
// ============================================

class AdvancedGallery {
    constructor() {
        this.currentIndex = 0;
        this.filteredItems = [];
        this.allItems = [];
        this.isSlideshowActive = false;
        this.slideshowInterval = null;
        this.slideshowSpeed = 2000;
        
        this.init();
    }
    
    init() {
        // Get all gallery items
        this.allItems = Array.from(document.querySelectorAll('.gallery-item'));
        this.filteredItems = [...this.allItems];
        
        // Initialize filters
        this.initFilters();
        
        // Initialize sorting
        this.initSorting();
        
        // Initialize lightbox
        this.initLightbox();
        
        // Initialize slideshow
        this.initSlideshow();
        
        // Add data attributes to items
        this.addDataAttributes();
    }
    
    addDataAttributes() {
        this.allItems.forEach((item, index) => {
            const imageContainer = item.querySelector('.gallery-image');
            if (imageContainer && !imageContainer.dataset.index) {
                imageContainer.dataset.index = index;
                imageContainer.dataset.src = imageContainer.querySelector('img')?.src || 
                                           `https://via.placeholder.com/800x800/9333ea/ffffff?text=Image+${index + 1}`;
                imageContainer.dataset.title = `Image ${index + 1}`;
            }
        });
    }
    
    initFilters() {
        const filters = document.querySelectorAll('.gallery-filter');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-filter');
                this.filter(filterValue);
            });
        });
    }
    
    filter(category) {
        if (category === 'all') {
            this.filteredItems = [...this.allItems];
        } else {
            this.filteredItems = this.allItems.filter(item => 
                item.getAttribute('data-category') === category
            );
        }
        
        this.render();
        this.updateSort();
    }
    
    initSorting() {
        const sortSelect = document.getElementById('gallery-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sort(e.target.value);
            });
        }
    }
    
    sort(sortType) {
        const items = [...this.filteredItems];
        
        switch(sortType) {
            case 'newest':
                items.reverse(); // Reverse order (assuming last items are newest)
                break;
            case 'oldest':
                // Keep original order
                break;
            case 'name-asc':
                items.sort((a, b) => {
                    const titleA = a.dataset.title || a.querySelector('h3')?.textContent || '';
                    const titleB = b.dataset.title || b.querySelector('h3')?.textContent || '';
                    return titleA.localeCompare(titleB);
                });
                break;
            case 'name-desc':
                items.sort((a, b) => {
                    const titleA = a.dataset.title || a.querySelector('h3')?.textContent || '';
                    const titleB = b.dataset.title || b.querySelector('h3')?.textContent || '';
                    return titleB.localeCompare(titleA);
                });
                break;
        }
        
        this.filteredItems = items;
        this.render();
    }
    
    updateSort() {
        const sortSelect = document.getElementById('gallery-sort');
        if (sortSelect && sortSelect.value !== 'default') {
            this.sort(sortSelect.value);
        }
    }
    
    render() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;
        
        // Reorder DOM elements
        this.filteredItems.forEach(item => {
            grid.appendChild(item);
            item.classList.remove('hidden');
            item.style.animation = 'fadeIn 0.5s ease';
        });
        
        // Hide items not in filtered list
        this.allItems.forEach(item => {
            if (!this.filteredItems.includes(item)) {
                item.classList.add('hidden');
            }
        });
    }
    
    initLightbox() {
        const modal = document.getElementById('gallery-modal');
        const closeBtn = modal?.querySelector('.gallery-modal-close');
        const prevBtn = modal?.querySelector('.gallery-nav-prev');
        const nextBtn = modal?.querySelector('.gallery-nav-next');
        const downloadBtn = document.getElementById('gallery-download');
        const fullscreenBtn = document.getElementById('gallery-fullscreen');
        
        // Open lightbox on image click
        document.querySelectorAll('.gallery-image').forEach((imageContainer, index) => {
            imageContainer.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        
        // Close on backdrop click
        const backdrop = modal?.querySelector('.gallery-modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeLightbox());
        }
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.showPrevious());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.showNext());
        }
        
        // Download button
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadImage());
        }
        
        // Fullscreen button
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal?.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });
    }
    
    openLightbox(index) {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        // Find index in filtered items
        const clickedItem = this.allItems[index];
        this.currentIndex = this.filteredItems.indexOf(clickedItem);
        
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
        
        this.updateLightbox();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Stop slideshow if active
        if (this.isSlideshowActive) {
            this.stopSlideshow();
        }
    }
    
    closeLightbox() {
        const modal = document.getElementById('gallery-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        this.stopSlideshow();
    }
    
    showPrevious() {
        if (this.filteredItems.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
        this.updateLightbox();
    }
    
    showNext() {
        if (this.filteredItems.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
        this.updateLightbox();
    }
    
    updateLightbox() {
        const modal = document.getElementById('gallery-modal');
        const image = document.getElementById('gallery-modal-image');
        const title = document.getElementById('gallery-image-title');
        const counter = document.getElementById('gallery-image-counter');
        
        if (!modal || !image || this.filteredItems.length === 0) return;
        
        const currentItem = this.filteredItems[this.currentIndex];
        const imageContainer = currentItem.querySelector('.gallery-image');
        const imageSrc = imageContainer?.dataset.src || 
                        imageContainer?.querySelector('img')?.src ||
                        `https://via.placeholder.com/800x800/9333ea/ffffff?text=Image+${this.currentIndex + 1}`;
        const imageTitle = imageContainer?.dataset.title || 
                          currentItem.dataset.title || 
                          `Image ${this.currentIndex + 1}`;
        
        // Show loader
        const loader = modal.querySelector('.gallery-image-loader');
        if (loader) loader.classList.add('active');
        
        // Load image
        const img = new Image();
        img.onload = () => {
            image.src = imageSrc;
            image.alt = imageTitle;
            if (title) title.textContent = imageTitle;
            if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
            if (loader) loader.classList.remove('active');
        };
        img.onerror = () => {
            if (loader) loader.classList.remove('active');
        };
        img.src = imageSrc;
        
        // Store current image data for download
        image.dataset.downloadSrc = imageSrc;
        image.dataset.downloadTitle = imageTitle;
    }
    
    downloadImage() {
        const image = document.getElementById('gallery-modal-image');
        if (!image || !image.dataset.downloadSrc) return;
        
        const link = document.createElement('a');
        link.href = image.dataset.downloadSrc;
        link.download = image.dataset.downloadTitle || 'image.jpg';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    toggleFullscreen() {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        if (!document.fullscreenElement) {
            modal.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    initSlideshow() {
        const toggleBtn = document.getElementById('slideshow-toggle');
        const playPauseBtn = document.getElementById('slideshow-play-pause');
        const speedSelect = document.getElementById('slideshow-speed');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                if (this.isSlideshowActive) {
                    this.stopSlideshow();
                } else {
                    this.startSlideshow();
                }
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (this.isSlideshowActive) {
                    this.stopSlideshow();
                } else {
                    this.resumeSlideshow();
                }
            });
        }
        
        if (speedSelect) {
            speedSelect.addEventListener('change', (e) => {
                this.slideshowSpeed = parseInt(e.target.value);
                if (this.isSlideshowActive) {
                    this.stopSlideshow();
                    this.startSlideshow();
                }
            });
        }
    }
    
    startSlideshow() {
        if (this.filteredItems.length === 0) {
            alert('No images to display in slideshow. Please select a filter.');
            return;
        }
        
        // Open lightbox if not open
        const modal = document.getElementById('gallery-modal');
        if (!modal.classList.contains('active')) {
            this.openLightbox(0);
        }
        
        this.isSlideshowActive = true;
        const toggleBtn = document.getElementById('slideshow-toggle');
        const playPauseBtn = document.getElementById('slideshow-play-pause');
        
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-stop mr-2"></i> Stop Slideshow';
            toggleBtn.classList.add('active');
        }
        
        if (playPauseBtn) {
            playPauseBtn.querySelector('i').className = 'fas fa-pause';
        }
        
        this.slideshowInterval = setInterval(() => {
            this.showNext();
        }, this.slideshowSpeed);
    }
    
    stopSlideshow() {
        this.isSlideshowActive = false;
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }
        
        const toggleBtn = document.getElementById('slideshow-toggle');
        const playPauseBtn = document.getElementById('slideshow-play-pause');
        
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Start Slideshow';
            toggleBtn.classList.remove('active');
        }
        
        if (playPauseBtn) {
            playPauseBtn.querySelector('i').className = 'fas fa-play';
        }
    }
    
    resumeSlideshow() {
        if (this.filteredItems.length === 0) return;
        this.startSlideshow();
    }
}

// Initialize Advanced Gallery
let advancedGallery;
document.addEventListener('DOMContentLoaded', () => {
    advancedGallery = new AdvancedGallery();
});

// Event Tabs
const eventTabs = document.querySelectorAll('.event-tab');
const upcomingEvents = document.getElementById('upcoming-events');
const pastEvents = document.getElementById('past-events');

eventTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        eventTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabType = tab.getAttribute('data-tab');
        
        if (tabType === 'upcoming') {
            upcomingEvents.classList.remove('hidden');
            pastEvents.classList.add('hidden');
        } else {
            upcomingEvents.classList.add('hidden');
            pastEvents.classList.remove('hidden');
        }
    });
});

// Video Modal
const videoModal = document.getElementById('video-modal');
if (videoModal) {
    const closeBtn = videoModal.querySelector('.video-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            const iframe = videoModal.querySelector('iframe');
            if (iframe) iframe.src = '';
        });
    }
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            const iframe = videoModal.querySelector('iframe');
            if (iframe) iframe.src = '';
        }
    });
}

if (videoModal) {
    document.querySelectorAll('.play-btn[data-video]').forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video');
            const iframe = videoModal.querySelector('iframe');
            
            // Check if video ID is a placeholder
            if (!videoId || videoId.startsWith('YOUR_VIDEO_ID') || videoId.startsWith('VIDEO_ID')) {
                alert('Please add your YouTube video ID to the data-video attribute.\n\nTo get your video ID:\n1. Go to your YouTube video\n2. Copy the URL\n3. The video ID is the part after v= in the URL\n\nExample: https://www.youtube.com/watch?v=dQw4w9WgXcQ\nVideo ID: dQw4w9WgXcQ');
                return;
            }
            
            if (iframe && videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModal.classList.add('active');
            }
        });
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const footerNewsletterForm = document.getElementById('footer-newsletter');

function handleNewsletterSubmit(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Here you would send to your email service
        alert('Thank you for subscribing! You will receive updates on new releases and events.');
        form.reset();
        
        // Example: Send to Mailchimp, ConvertKit, or your backend
        // fetch('YOUR_NEWSLETTER_ENDPOINT', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // })
    });
}

if (newsletterForm) {
    handleNewsletterSubmit(newsletterForm);
}

if (footerNewsletterForm) {
    handleNewsletterSubmit(footerNewsletterForm);
}

// Product Card Interactions
document.querySelectorAll('.product-card .btn-stream').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        alert(`Added "${productName}" to cart! (Integrate with your e-commerce platform)`);
    });
});

// Blog Card Read More
document.querySelectorAll('.blog-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would navigate to the full blog post
        alert('Blog post page would open here. Create individual blog post pages.');
    });
});

// Press Card Links
document.querySelectorAll('.press-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow external links to open normally
        // If you want to track clicks, add analytics here
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ============================================
// MINI MUSIC PLAYER FUNCTIONALITY
// ============================================

class MusicPlayer {
    constructor() {
        this.playlist = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        this.isShuffled = false;
        this.repeatMode = 'off'; // 'off', 'one', 'all'
        this.volume = 0.7;
        this.currentTime = 0;
        this.duration = 0;
        this.shuffledPlaylist = [];
        
        this.initElements();
        this.initEventListeners();
        this.loadFromStorage();
    }
    
    initElements() {
        this.miniPlayer = document.getElementById('mini-player');
        this.audioPlayer = document.getElementById('audio-player');
        this.queueSidebar = document.getElementById('player-queue');
        
        // Control buttons
        this.playPauseBtn = document.getElementById('player-play-pause');
        this.prevBtn = document.getElementById('player-prev');
        this.nextBtn = document.getElementById('player-next');
        this.shuffleBtn = document.getElementById('player-shuffle');
        this.repeatBtn = document.getElementById('player-repeat');
        this.muteBtn = document.getElementById('player-mute');
        this.queueToggleBtn = document.getElementById('player-queue-toggle');
        this.queueCloseBtn = document.getElementById('queue-close');
        this.playerCloseBtn = document.getElementById('player-close');
        this.queueClearBtn = document.getElementById('queue-clear');
        
        // Display elements
        this.trackName = this.miniPlayer.querySelector('.player-track-name');
        this.trackArtist = this.miniPlayer.querySelector('.player-track-artist');
        this.thumbnail = this.miniPlayer.querySelector('.player-thumbnail');
        this.currentTimeEl = this.miniPlayer.querySelector('.player-current-time');
        this.durationEl = this.miniPlayer.querySelector('.player-duration');
        this.progressBar = document.getElementById('player-progress');
        this.volumeSlider = document.getElementById('player-volume');
        this.queueCount = document.getElementById('player-queue-count');
        this.queueList = document.getElementById('queue-list');
        
        // Set initial volume
        if (this.audioPlayer) {
            this.audioPlayer.volume = this.volume;
        }
        if (this.volumeSlider) {
            this.volumeSlider.value = this.volume * 100;
        }
    }
    
    initEventListeners() {
        // Play/Pause
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Previous/Next
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.playPrevious());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.playNext());
        }
        
        // Shuffle
        if (this.shuffleBtn) {
            this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        }
        
        // Repeat
        if (this.repeatBtn) {
            this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        }
        
        // Volume
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
        if (this.muteBtn) {
            this.muteBtn.addEventListener('click', () => this.toggleMute());
        }
        
        // Progress bar
        if (this.progressBar) {
            this.progressBar.addEventListener('input', (e) => {
                this.seek(e.target.value);
            });
        }
        
        // Queue toggle
        if (this.queueToggleBtn) {
            this.queueToggleBtn.addEventListener('click', () => this.toggleQueue());
        }
        if (this.queueCloseBtn) {
            this.queueCloseBtn.addEventListener('click', () => this.toggleQueue());
        }
        if (this.queueClearBtn) {
            this.queueClearBtn.addEventListener('click', () => this.clearPlaylist());
        }
        
        // Close player
        if (this.playerCloseBtn) {
            this.playerCloseBtn.addEventListener('click', () => this.hidePlayer());
        }
        
        // Audio player events
        if (this.audioPlayer) {
            this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
            this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
            this.audioPlayer.addEventListener('ended', () => this.onTrackEnd());
            this.audioPlayer.addEventListener('play', () => this.onPlay());
            this.audioPlayer.addEventListener('pause', () => this.onPause());
        }
        
        // Click outside queue to close
        document.addEventListener('click', (e) => {
            if (this.queueSidebar && this.queueSidebar.classList.contains('active')) {
                if (!this.queueSidebar.contains(e.target) && !this.queueToggleBtn.contains(e.target)) {
                    this.toggleQueue();
                }
            }
        });
    }
    
    addToPlaylist(track) {
        // Check if track already exists
        const exists = this.playlist.some(t => t.id === track.id);
        if (!exists) {
            this.playlist.push(track);
            this.updateQueueDisplay();
            this.saveToStorage();
            
            // If no track is playing, play this one
            if (this.currentIndex === -1) {
                this.currentIndex = this.playlist.length - 1;
                this.playTrack(this.currentIndex);
            }
        }
    }
    
    playTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentIndex = index;
        const track = this.playlist[index];
        
        // Update UI
        this.trackName.textContent = track.title || 'Unknown Track';
        this.trackArtist.textContent = track.artist || 'Unknown Artist';
        
        // Play audio if URL is provided
        if (track.audioUrl && this.audioPlayer) {
            this.audioPlayer.src = track.audioUrl;
            this.audioPlayer.play().catch(e => console.log('Play failed:', e));
        }
        
        // For YouTube videos, open in modal
        if (track.type === 'youtube' && track.videoId) {
            const videoModal = document.getElementById('player-modal');
            const youtubeIframe = document.getElementById('youtube-iframe');
            if (videoModal && youtubeIframe) {
                youtubeIframe.src = `https://www.youtube.com/embed/${track.videoId}?autoplay=1&rel=0`;
                videoModal.classList.add('active');
            }
        }
        
        this.showPlayer();
        this.updateQueueDisplay();
    }
    
    togglePlayPause() {
        if (this.currentIndex === -1 && this.playlist.length > 0) {
            this.playTrack(0);
            return;
        }
        
        if (this.audioPlayer) {
            if (this.isPlaying) {
                this.audioPlayer.pause();
            } else {
                this.audioPlayer.play().catch(e => console.log('Play failed:', e));
            }
        }
    }
    
    playPrevious() {
        if (this.playlist.length === 0) return;
        
        let newIndex;
        if (this.isShuffled && this.shuffledPlaylist.length > 0) {
            const currentShuffledIndex = this.shuffledPlaylist.indexOf(this.currentIndex);
            newIndex = currentShuffledIndex > 0 
                ? this.shuffledPlaylist[currentShuffledIndex - 1]
                : this.shuffledPlaylist[this.shuffledPlaylist.length - 1];
        } else {
            newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.playlist.length - 1;
        }
        
        this.playTrack(newIndex);
    }
    
    playNext() {
        if (this.playlist.length === 0) return;
        
        let newIndex;
        if (this.isShuffled && this.shuffledPlaylist.length > 0) {
            const currentShuffledIndex = this.shuffledPlaylist.indexOf(this.currentIndex);
            newIndex = currentShuffledIndex < this.shuffledPlaylist.length - 1
                ? this.shuffledPlaylist[currentShuffledIndex + 1]
                : this.shuffledPlaylist[0];
        } else {
            newIndex = this.currentIndex < this.playlist.length - 1 ? this.currentIndex + 1 : 0;
        }
        
        this.playTrack(newIndex);
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        if (this.shuffleBtn) {
            this.shuffleBtn.classList.toggle('active', this.isShuffled);
        }
        
        if (this.isShuffled) {
            this.createShuffledPlaylist();
        }
    }
    
    toggleRepeat() {
        const modes = ['off', 'all', 'one'];
        const currentModeIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentModeIndex + 1) % modes.length];
        
        if (this.repeatBtn) {
            this.repeatBtn.classList.toggle('active', this.repeatMode !== 'off');
            const icon = this.repeatBtn.querySelector('i');
            if (this.repeatMode === 'one') {
                icon.className = 'fas fa-redo';
                icon.style.opacity = '1';
            } else if (this.repeatMode === 'all') {
                icon.className = 'fas fa-redo';
                icon.style.opacity = '0.7';
            } else {
                icon.className = 'fas fa-redo';
                icon.style.opacity = '0.5';
            }
        }
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.audioPlayer) {
            this.audioPlayer.volume = this.volume;
        }
        if (this.muteBtn) {
            const icon = this.muteBtn.querySelector('i');
            if (this.volume === 0) {
                icon.className = 'fas fa-volume-mute';
            } else if (this.volume < 0.5) {
                icon.className = 'fas fa-volume-down';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        }
    }
    
    toggleMute() {
        if (this.volume > 0) {
            this.lastVolume = this.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.lastVolume || 0.7);
        }
    }
    
    seek(value) {
        const time = (value / 100) * this.duration;
        if (this.audioPlayer) {
            this.audioPlayer.currentTime = time;
        }
    }
    
    updateProgress() {
        if (this.audioPlayer) {
            this.currentTime = this.audioPlayer.currentTime;
            this.duration = this.audioPlayer.duration || 0;
            
            if (this.progressBar) {
                const progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
                this.progressBar.value = progress;
            }
            
            if (this.currentTimeEl) {
                this.currentTimeEl.textContent = this.formatTime(this.currentTime);
            }
            if (this.durationEl) {
                this.durationEl.textContent = this.formatTime(this.duration);
            }
        }
    }
    
    updateDuration() {
        if (this.audioPlayer) {
            this.duration = this.audioPlayer.duration || 0;
            if (this.durationEl) {
                this.durationEl.textContent = this.formatTime(this.duration);
            }
        }
    }
    
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    onTrackEnd() {
        if (this.repeatMode === 'one') {
            if (this.audioPlayer) {
                this.audioPlayer.currentTime = 0;
                this.audioPlayer.play();
            }
        } else if (this.repeatMode === 'all') {
            this.playNext();
        } else {
            if (this.currentIndex < this.playlist.length - 1) {
                this.playNext();
            } else {
                this.isPlaying = false;
                if (this.playPauseBtn) {
                    const icon = this.playPauseBtn.querySelector('i');
                    icon.className = 'fas fa-play';
                }
            }
        }
    }
    
    onPlay() {
        this.isPlaying = true;
        if (this.playPauseBtn) {
            const icon = this.playPauseBtn.querySelector('i');
            icon.className = 'fas fa-pause';
        }
    }
    
    onPause() {
        this.isPlaying = false;
        if (this.playPauseBtn) {
            const icon = this.playPauseBtn.querySelector('i');
            icon.className = 'fas fa-play';
        }
    }
    
    showPlayer() {
        if (this.miniPlayer) {
            this.miniPlayer.classList.remove('hidden');
            document.body.classList.add('player-active');
        }
    }
    
    hidePlayer() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
        }
        if (this.miniPlayer) {
            this.miniPlayer.classList.add('hidden');
            document.body.classList.remove('player-active');
        }
    }
    
    toggleQueue() {
        if (this.queueSidebar) {
            this.queueSidebar.classList.toggle('active');
        }
    }
    
    updateQueueDisplay() {
        if (this.queueCount) {
            this.queueCount.textContent = this.playlist.length;
        }
        
        if (this.queueList) {
            if (this.playlist.length === 0) {
                this.queueList.innerHTML = `
                    <div class="player-queue-empty">
                        <i class="fas fa-music text-4xl text-gray-600 mb-4"></i>
                        <p class="text-gray-400 font-rajdhani">Your playlist is empty</p>
                        <p class="text-gray-500 font-rajdhani text-sm mt-2">Click play on any track to start</p>
                    </div>
                `;
            } else {
                this.queueList.innerHTML = this.playlist.map((track, index) => `
                    <div class="player-queue-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="player-queue-item-thumb">
                            <i class="fas fa-music text-white"></i>
                        </div>
                        <div class="player-queue-item-info">
                            <div class="player-queue-item-title">${track.title || 'Unknown Track'}</div>
                            <div class="player-queue-item-artist">${track.artist || 'Unknown Artist'}</div>
                        </div>
                        <div class="player-queue-item-actions">
                            <button class="player-control-btn" onclick="musicPlayer.removeFromPlaylist(${index})" title="Remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
                
                // Add click listeners to queue items
                this.queueList.querySelectorAll('.player-queue-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        if (!e.target.closest('.player-queue-item-actions')) {
                            const index = parseInt(item.dataset.index);
                            this.playTrack(index);
                        }
                    });
                });
            }
        }
    }
    
    removeFromPlaylist(index) {
        if (index === this.currentIndex && this.playlist.length > 1) {
            if (index === this.playlist.length - 1) {
                this.playTrack(0);
            } else {
                this.playTrack(index);
            }
        }
        this.playlist.splice(index, 1);
        if (this.currentIndex > index) {
            this.currentIndex--;
        }
        if (this.currentIndex >= this.playlist.length) {
            this.currentIndex = -1;
        }
        this.updateQueueDisplay();
        this.saveToStorage();
    }
    
    clearPlaylist() {
        this.playlist = [];
        this.currentIndex = -1;
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.audioPlayer.src = '';
        }
        this.hidePlayer();
        this.updateQueueDisplay();
        this.saveToStorage();
    }
    
    createShuffledPlaylist() {
        this.shuffledPlaylist = [...Array(this.playlist.length).keys()];
        for (let i = this.shuffledPlaylist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledPlaylist[i], this.shuffledPlaylist[j]] = [this.shuffledPlaylist[j], this.shuffledPlaylist[i]];
        }
    }
    
    saveToStorage() {
        try {
            localStorage.setItem('musicPlayerPlaylist', JSON.stringify(this.playlist));
            localStorage.setItem('musicPlayerIndex', this.currentIndex.toString());
            localStorage.setItem('musicPlayerVolume', this.volume.toString());
        } catch (e) {
            console.log('Failed to save to storage:', e);
        }
    }
    
    loadFromStorage() {
        try {
            const savedPlaylist = localStorage.getItem('musicPlayerPlaylist');
            if (savedPlaylist) {
                this.playlist = JSON.parse(savedPlaylist);
            }
            const savedIndex = localStorage.getItem('musicPlayerIndex');
            if (savedIndex) {
                this.currentIndex = parseInt(savedIndex);
            }
            const savedVolume = localStorage.getItem('musicPlayerVolume');
            if (savedVolume) {
                this.volume = parseFloat(savedVolume);
                this.setVolume(this.volume);
            }
            this.updateQueueDisplay();
        } catch (e) {
            console.log('Failed to load from storage:', e);
        }
    }
}

// Initialize Music Player
const musicPlayer = new MusicPlayer();

// Integrate with existing play buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add to playlist when play button is clicked
    document.querySelectorAll('.play-btn, .play-btn-large').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('.music-card, .music-card-large, .video-card');
            if (!card) return;
            
            const trackType = card.getAttribute('data-type') || this.getAttribute('data-type');
            const youtubeId = card.getAttribute('data-youtube') || this.getAttribute('data-youtube');
            const soundcloudId = card.getAttribute('data-soundcloud') || this.getAttribute('data-soundcloud');
            
            if (!youtubeId && !soundcloudId) return;
            
            const title = card.querySelector('h3')?.textContent || 'Unknown Track';
            const artist = card.querySelector('p')?.textContent || 'Unknown Artist';
            
            const track = {
                id: youtubeId || soundcloudId,
                title: title.trim(),
                artist: artist.trim(),
                type: trackType || 'youtube',
                videoId: youtubeId,
                soundcloudId: soundcloudId,
                audioUrl: null // Can be added if you have direct audio URLs
            };
            
            musicPlayer.addToPlaylist(track);
            musicPlayer.playTrack(musicPlayer.playlist.length - 1);
        });
    });
});

// ============================================
// LIVE CHAT WIDGET
// ============================================

const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatBadge = document.querySelector('.chat-badge');

let chatOpen = false;
let unreadCount = 1;

// Chat responses (can be replaced with actual chatbot API)
const chatResponses = {
    'book': 'Great! To book DJ Lakhan for your event, please fill out the booking form or contact us via WhatsApp. You can also call us at +91 72767 73494.',
    'remix': 'Check out all my remixes on the Remixes page! I have 50+ amazing remixes available. Click "See All Remixes" to browse.',
    'song': 'I have 20+ original songs! Visit the Songs page to listen to all my original compositions.',
    'rate': 'Pricing depends on the type of event, location, and duration. Please contact us via WhatsApp or fill out the booking form for a custom quote.',
    'price': 'Pricing depends on the type of event, location, and duration. Please contact us via WhatsApp or fill out the booking form for a custom quote.',
    'event': 'I perform at weddings, corporate events, music festivals, club nights, and private parties. Fill out the booking form with your event details!',
    'collaboration': 'I\'m always open to collaborations! Please email me at djlakhanhirenandurbar556@gmail.com with your proposal.',
    'default': 'Thank you for your message! For detailed inquiries, please contact us via WhatsApp or email at djlakhanhirenandurbar556@gmail.com'
};

// Toggle chat window
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatOpen = !chatOpen;
        if (chatWindow) {
            chatWindow.classList.toggle('active', chatOpen);
        }
        if (chatOpen) {
            unreadCount = 0;
            if (chatBadge) chatBadge.style.display = 'none';
            if (chatInput) chatInput.focus();
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatOpen = false;
        if (chatWindow) {
            chatWindow.classList.remove('active');
        }
    });
}

// Send message
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    });
}

// Quick reply buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            if (chatInput) {
                chatInput.value = message;
                if (chatForm) {
                    chatForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    });
});

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `
        <p>${text}</p>
        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    `;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    if (chatMessages) {
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show badge if chat is closed
    if (!chatOpen && type === 'bot') {
        unreadCount++;
        if (chatBadge) {
            chatBadge.textContent = unreadCount;
            chatBadge.style.display = 'flex';
        }
    }
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('booking') || lowerMessage.includes('event')) {
        return chatResponses['book'];
    }
    if (lowerMessage.includes('remix')) {
        return chatResponses['remix'];
    }
    if (lowerMessage.includes('song') || lowerMessage.includes('music')) {
        return chatResponses['song'];
    }
    if (lowerMessage.includes('rate') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return chatResponses['rate'];
    }
    if (lowerMessage.includes('collaboration') || lowerMessage.includes('collab')) {
        return chatResponses['collaboration'];
    }
    
    return chatResponses['default'];
}
