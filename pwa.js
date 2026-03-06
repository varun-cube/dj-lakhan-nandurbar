// PWA Functionality - Install Prompt, Offline Detection, Push Notifications

// ============================================
// INSTALL PROMPT
// ============================================

let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installPromptInstallBtn = document.getElementById('install-prompt-install');
const installPromptCloseBtn = document.getElementById('install-prompt-close');

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA: Install prompt available');
  // Prevent the default prompt
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;
  
  // Show custom install prompt if not dismissed before
  const installPromptDismissed = localStorage.getItem('installPromptDismissed');
  if (!installPromptDismissed) {
    showInstallPrompt();
  }
});

// Show install prompt
function showInstallPrompt() {
  if (installPrompt) {
    installPrompt.classList.remove('hidden');
    setTimeout(() => {
      installPrompt.classList.add('show');
    }, 100);
  }
}

// Hide install prompt
function hideInstallPrompt() {
  if (installPrompt) {
    installPrompt.classList.remove('show');
    setTimeout(() => {
      installPrompt.classList.add('hidden');
    }, 300);
  }
}

// Install button click
if (installPromptInstallBtn) {
  installPromptInstallBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      // Fallback instructions for manual installation
      showInstallInstructions();
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice;
    console.log('PWA: User choice', outcome);
    
    if (outcome === 'accepted') {
      console.log('PWA: User accepted install');
      // Track installation
      trackInstallation();
    } else {
      console.log('PWA: User dismissed install');
    }
    
    // Clear the deferred prompt
    deferredPrompt = null;
    hideInstallPrompt();
  });
}

// Close button click
if (installPromptCloseBtn) {
  installPromptCloseBtn.addEventListener('click', () => {
    hideInstallPrompt();
    // Remember dismissal for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
    setTimeout(() => {
      localStorage.removeItem('installPromptDismissed');
    }, 7 * 24 * 60 * 60 * 1000);
  });
}

// Show install instructions for manual installation
function showInstallInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  let instructions = '';
  
  if (isIOS) {
    instructions = `
      <div class="install-instructions">
        <h3 class="font-orbitron text-xl mb-4">Install on iOS</h3>
        <ol class="list-decimal list-inside space-y-2 font-rajdhani text-gray-300">
          <li>Tap the Share button <i class="fas fa-share"></i> at the bottom</li>
          <li>Scroll down and tap "Add to Home Screen"</li>
          <li>Tap "Add" to confirm</li>
        </ol>
      </div>
    `;
  } else if (isAndroid) {
    instructions = `
      <div class="install-instructions">
        <h3 class="font-orbitron text-xl mb-4">Install on Android</h3>
        <ol class="list-decimal list-inside space-y-2 font-rajdhani text-gray-300">
          <li>Tap the menu <i class="fas fa-ellipsis-v"></i> in your browser</li>
          <li>Select "Add to Home screen" or "Install app"</li>
          <li>Confirm the installation</li>
        </ol>
      </div>
    `;
  } else {
    instructions = `
      <div class="install-instructions">
        <h3 class="font-orbitron text-xl mb-4">Install Instructions</h3>
        <p class="font-rajdhani text-gray-300">
          Look for the install icon in your browser's address bar, or check the browser menu for "Install" or "Add to Home Screen" option.
        </p>
      </div>
    `;
  }
  
  // You can show this in a modal or alert
  alert(instructions);
}

// Track installation
function trackInstallation() {
  // Send analytics event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      'event_category': 'PWA',
      'event_label': 'App Installed'
    });
  }
  
  // Store installation timestamp
  localStorage.setItem('pwaInstalled', Date.now().toString());
}

// Check if app is installed
function isAppInstalled() {
  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check if running in fullscreen mode
  if (window.navigator.standalone === true) {
    return true;
  }
  
  return false;
}

// Hide install prompt if already installed
if (isAppInstalled()) {
  hideInstallPrompt();
}

// ============================================
// OFFLINE DETECTION
// ============================================

const offlineIndicator = document.getElementById('offline-indicator');

// Listen for online/offline events
window.addEventListener('online', () => {
  console.log('PWA: Back online');
  if (offlineIndicator) {
    offlineIndicator.classList.remove('show');
    setTimeout(() => {
      offlineIndicator.classList.add('hidden');
    }, 300);
  }
  
  // Sync any pending data
  syncPendingData();
});

window.addEventListener('offline', () => {
  console.log('PWA: Gone offline');
  if (offlineIndicator) {
    offlineIndicator.classList.remove('hidden');
    setTimeout(() => {
      offlineIndicator.classList.add('show');
    }, 100);
  }
});

// Check initial online status
if (!navigator.onLine) {
  window.dispatchEvent(new Event('offline'));
}

// Sync pending data when back online
function syncPendingData() {
  // Sync form submissions
  const pendingForms = JSON.parse(localStorage.getItem('pendingForms') || '[]');
  if (pendingForms.length > 0) {
    console.log('PWA: Syncing pending forms', pendingForms.length);
    // Trigger background sync if service worker supports it
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('sync-forms');
      });
    }
  }
}

// ============================================
// SERVICE WORKER REGISTRATION
// ============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('PWA: Service Worker registered', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.log('PWA: Service Worker registration failed', error);
      });
  });
  
  // Listen for service worker controller change
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('PWA: New service worker activated');
    window.location.reload();
  });
}

// Show update notification
function showUpdateNotification() {
  const updateNotification = document.createElement('div');
  updateNotification.className = 'update-notification';
  updateNotification.innerHTML = `
    <div class="update-notification-content">
      <span class="font-rajdhani">New version available!</span>
      <button id="update-reload" class="btn-primary text-sm px-4 py-1 ml-4">
        Reload
      </button>
    </div>
  `;
  document.body.appendChild(updateNotification);
  
  setTimeout(() => {
    updateNotification.classList.add('show');
  }, 100);
  
  const reloadBtn = updateNotification.querySelector('#update-reload');
  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

// ============================================
// PUSH NOTIFICATIONS
// ============================================

// Request notification permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('PWA: Notifications not supported');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

// Subscribe to push notifications
async function subscribeToPushNotifications() {
  if (!('serviceWorker' in navigator)) {
    console.log('PWA: Service Worker not supported');
    return null;
  }
  
  const permission = await requestNotificationPermission();
  if (!permission) {
    console.log('PWA: Notification permission denied');
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with your VAPID key
    });
    
    console.log('PWA: Subscribed to push notifications', subscription);
    
    // Send subscription to server
    await sendSubscriptionToServer(subscription);
    
    return subscription;
  } catch (error) {
    console.log('PWA: Push subscription failed', error);
    return null;
  }
}

// Convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Send subscription to server
async function sendSubscriptionToServer(subscription) {
  // Replace with your backend endpoint
  try {
    const response = await fetch('/api/push-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
    
    if (response.ok) {
      console.log('PWA: Subscription sent to server');
      localStorage.setItem('pushSubscribed', 'true');
    }
  } catch (error) {
    console.log('PWA: Failed to send subscription', error);
  }
}

// Show notification permission prompt (can be triggered by button)
function showNotificationPrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'notification-prompt';
  prompt.innerHTML = `
    <div class="notification-prompt-content">
      <div class="flex items-center gap-4">
        <i class="fas fa-bell text-3xl text-purple-400"></i>
        <div class="flex-1">
          <h3 class="font-orbitron text-lg mb-1">Enable Notifications</h3>
          <p class="text-gray-400 font-rajdhani text-sm">Get notified about new releases and events</p>
        </div>
        <div class="flex gap-2">
          <button id="notification-enable" class="btn-primary text-sm px-4 py-2">
            Enable
          </button>
          <button id="notification-dismiss" class="player-control-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(prompt);
  
  setTimeout(() => {
    prompt.classList.add('show');
  }, 100);
  
  const enableBtn = prompt.querySelector('#notification-enable');
  const dismissBtn = prompt.querySelector('#notification-dismiss');
  
  if (enableBtn) {
    enableBtn.addEventListener('click', async () => {
      await subscribeToPushNotifications();
      prompt.remove();
    });
  }
  
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      prompt.remove();
      localStorage.setItem('notificationPromptDismissed', Date.now().toString());
    });
  }
}

// Check and show notification prompt if needed
if ('Notification' in window && Notification.permission === 'default') {
  const dismissed = localStorage.getItem('notificationPromptDismissed');
  if (!dismissed) {
    // Show prompt after 5 seconds
    setTimeout(() => {
      showNotificationPrompt();
    }, 5000);
  }
}

// Export functions for use in other scripts
window.PWA = {
  subscribeToPushNotifications,
  requestNotificationPermission,
  showNotificationPrompt,
  isAppInstalled,
  showInstallPrompt,
  hideInstallPrompt
};
