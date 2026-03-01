// DOM elements
const pipButton = document.getElementById('pipButton');
const transparencySlider = document.getElementById('transparency');
const transparencyValue = document.getElementById('transparencyValue');
const volumeSlider = document.getElementById('volume');
const volumeValue = document.getElementById('volumeValue');
const statusDiv = document.getElementById('status');

// State
let isPipActive = false;
let currentTabId = null;
let opacityInterval = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize i18n first
  initI18n();
  
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = tab.id;

  // Check if PIP is supported and if there's a video
  await checkPipStatus();

  // Load saved settings
  loadSettings();

  // Set up event listeners
  setupEventListeners();
});

// Check PIP status
async function checkPipStatus() {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: () => {
        const video = document.querySelector('video');
        if (!video) {
          return { hasVideo: false, isPip: false };
        }
        return {
          hasVideo: true,
          isPip: document.pictureInPictureElement !== null,
          volume: video.volume * 100,
          canPip: document.pictureInPictureEnabled
        };
      }
    });

    const result = results[0].result;

    if (!result.hasVideo) {
      updateStatus(t('statusNoVideoOnPage'), 'error');
      pipButton.disabled = true;
      return;
    }

    if (!result.canPip) {
      updateStatus(t('statusNotSupported'), 'error');
      pipButton.disabled = true;
      return;
    }

    isPipActive = result.isPip;
    updatePipButton();
    
    if (result.isPip) {
      updateStatus(t('statusPipActive'), 'active');
    } else {
      // Check if PIP is open in another tab
      const allTabs = await chrome.tabs.query({});
      let pipOpenInOtherTab = false;
      
      for (const tab of allTabs) {
        if (tab.id !== currentTabId) {
          try {
            const results = await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: () => document.pictureInPictureElement !== null
            });
            if (results[0].result) {
              pipOpenInOtherTab = true;
              break;
            }
          } catch (e) {
            // Ignore errors for tabs we can't access
          }
        }
      }
      
      if (pipOpenInOtherTab) {
        updateStatus(t('statusVideoReady') + ' - ' + t('statusPipLimit'), 'active');
      } else {
        updateStatus(t('statusVideoReady'), 'active');
      }
    }

    // Update volume slider
    if (result.volume !== undefined) {
      volumeSlider.value = Math.round(result.volume);
      volumeValue.textContent = Math.round(result.volume) + '%';
    }

  } catch (error) {
    console.error('Error checking PIP status:', error);
    updateStatus(t('statusError') + 'Page could not be loaded', 'error');
  }
}

// Setup event listeners
function setupEventListeners() {
  pipButton.addEventListener('click', togglePip);

  transparencySlider.addEventListener('input', (e) => {
    const value = e.target.value;
    transparencyValue.textContent = value + '%';
    applyTransparency(value);
  });

  transparencySlider.addEventListener('change', (e) => {
    const value = e.target.value;
    applyTransparency(value);
    saveSettings();
  });

  volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    volumeValue.textContent = value + '%';
    applyVolume(value);
  });

  volumeSlider.addEventListener('change', (e) => {
    saveSettings();
  });
}

// Toggle PIP mode
async function togglePip() {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: async () => {
        const videos = document.querySelectorAll('video');
        let video = Array.from(videos).find(v => !v.paused) || videos[0];
        
        if (!video) return { success: false, error: 'Video bulunamadı' };

        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
            return { success: true, isPip: false };
          } else {
            await video.requestPictureInPicture();
            return { success: true, isPip: true };
          }
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    });

    const result = results[0].result;

    if (result.success) {
      isPipActive = result.isPip;
      updatePipButton();
      
      if (result.isPip) {
        updateStatus(t('statusPipStarted'), 'active');
        
        // Clear any existing interval
        if (opacityInterval) {
          clearInterval(opacityInterval);
        }
        
        // Apply settings immediately and repeatedly
        const applySettings = () => {
          applyTransparency(transparencySlider.value);
          applyVolume(volumeSlider.value);
        };
        
        // Apply immediately
        setTimeout(applySettings, 100);
        
        // Keep applying every 500ms while PIP is active
        opacityInterval = setInterval(applySettings, 500);
        
      } else {
        updateStatus(t('statusPipClosed'), 'active');
        
        // Clear interval when PIP closes
        if (opacityInterval) {
          clearInterval(opacityInterval);
          opacityInterval = null;
        }
      }
    } else {
      updateStatus(t('statusError') + result.error, 'error');
    }
  } catch (error) {
    console.error('Error toggling PIP:', error);
    updateStatus(t('statusError') + 'Could not start PIP', 'error');
  }
}

// Apply transparency to PIP window
async function applyTransparency(value) {
  const opacity = value / 100;
  
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: (opacityValue) => {
        // Find all videos
        const videos = document.querySelectorAll('video');
        let applied = false;
        
        videos.forEach(video => {
          // Apply multiple methods for better compatibility
          video.style.opacity = opacityValue;
          video.style.filter = `opacity(${opacityValue})`;
          video.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
          
          // Store opacity value for later use
          video.dataset.pipOpacity = opacityValue;
          applied = true;
          
          // Force a reflow to ensure changes apply
          video.offsetHeight;
        });
        
        // Also try to apply to video parents (for some sites)
        videos.forEach(video => {
          const parent = video.parentElement;
          if (parent && parent.tagName !== 'BODY') {
            parent.style.opacity = opacityValue;
            parent.style.filter = `opacity(${opacityValue})`;
          }
        });
        
        if (!applied) {
          return { success: false, error: 'Video bulunamadı' };
        }
        
        return { success: true, opacity: opacityValue, count: videos.length };
      },
      args: [opacity]
    });
    
    const result = results[0].result;
    if (!result.success) {
      console.warn('Transparency error:', result.error);
      updateStatus(t('statusNoVideo'), 'error');
    } else {
      console.log(`Transparency applied to ${result.count} video(s)`);
    }
  } catch (error) {
    console.error('Error applying transparency:', error);
    updateStatus(t('statusError') + 'Could not apply transparency', 'error');
  }
}

// Apply volume
async function applyVolume(value) {
  const volume = value / 100;
  
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: (volumeValue) => {
        // Find the active video
        let video = document.pictureInPictureElement;
        
        if (!video) {
          const videos = Array.from(document.querySelectorAll('video'));
          video = videos.find(v => !v.paused) || videos[0];
        }
        
        if (video) {
          video.volume = volumeValue;
          // Store volume in video element for persistence
          video.dataset.pipVolume = volumeValue;
          return { success: true, volume: volumeValue };
        }
        
        return { success: false, error: 'Video bulunamadı' };
      },
      args: [volume]
    });
    
    const result = results[0].result;
    if (!result.success) {
      console.warn('Volume error:', result.error);
    }
  } catch (error) {
    console.error('Error applying volume:', error);
    updateStatus(t('statusError') + 'Could not apply volume', 'error');
  }
}

// Update PIP button appearance
function updatePipButton() {
  const buttonText = document.getElementById('pipButtonText');
  if (isPipActive) {
    pipButton.classList.add('active');
    buttonText.textContent = t('pipButtonClose');
  } else {
    pipButton.classList.remove('active');
    buttonText.textContent = t('pipButtonOpen');
  }
}

// Update status message
function updateStatus(message, type = '') {
  statusDiv.textContent = message;
  statusDiv.className = 'status';
  if (type) {
    statusDiv.classList.add(type);
  }
}

// Save settings to storage
function saveSettings() {
  chrome.storage.sync.set({
    transparency: transparencySlider.value,
    volume: volumeSlider.value
  });
}

// Load settings from storage
async function loadSettings() {
  try {
    const settings = await chrome.storage.sync.get(['transparency', 'volume']);
    
    if (settings.transparency) {
      transparencySlider.value = settings.transparency;
      transparencyValue.textContent = settings.transparency + '%';
      applyTransparency(settings.transparency);
    }
    
    if (settings.volume) {
      volumeSlider.value = settings.volume;
      volumeValue.textContent = settings.volume + '%';
      applyVolume(settings.volume);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}
