// Content script for Better & Easy PIP
// This script runs on all web pages to enable PIP functionality

(function() {
  'use strict';

  // Listen for PIP events
  document.addEventListener('enterpictureinpicture', (event) => {
    console.log('PIP mode entered');
    
    // Store reference to the PIP video
    window.__pipVideo = event.target;
    
    // Add custom styling if needed
    if (window.__pipVideo) {
      window.__pipVideo.style.transition = 'opacity 0.3s ease';
    }
  });

  document.addEventListener('leavepictureinpicture', (event) => {
    console.log('PIP mode exited');
    
    // Clean up reference
    window.__pipVideo = null;
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Alt + P: Toggle PIP
    if (event.altKey && event.key === 'p') {
      event.preventDefault();
      togglePipMode();
    }
    
    // Alt + +: Increase opacity
    if (event.altKey && event.key === '+') {
      event.preventDefault();
      adjustOpacity(0.1);
    }
    
    // Alt + -: Decrease opacity
    if (event.altKey && event.key === '-') {
      event.preventDefault();
      adjustOpacity(-0.1);
    }
  });

  async function togglePipMode() {
    const video = document.querySelector('video');
    if (!video) {
      console.log('No video found on page');
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error('PIP toggle error:', error);
    }
  }

  function adjustOpacity(delta) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      const currentOpacity = parseFloat(video.style.opacity || 1);
      const newOpacity = Math.max(0.1, Math.min(1, currentOpacity + delta));
      video.style.opacity = newOpacity;
    });
  }

  // Monitor for dynamically added videos
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'VIDEO') {
          console.log('New video element detected');
          initializeVideo(node);
        } else if (node.querySelectorAll) {
          const videos = node.querySelectorAll('video');
          videos.forEach(video => {
            console.log('New video element detected in child nodes');
            initializeVideo(video);
          });
        }
      });
    });
  });

  function initializeVideo(video) {
    // Add smooth transitions
    video.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
    
    // Initialize with saved settings if available
    chrome.storage.sync.get(['transparency', 'volume'], (settings) => {
      if (settings.transparency) {
        const opacity = settings.transparency / 100;
        video.style.opacity = opacity;
        video.style.filter = `opacity(${opacity})`;
        video.dataset.pipOpacity = opacity;
      }
      if (settings.volume !== undefined) {
        video.volume = settings.volume / 100;
        video.dataset.pipVolume = settings.volume / 100;
      }
    });
    
    // Maintain settings when entering PIP
    video.addEventListener('enterpictureinpicture', () => {
      if (video.dataset.pipVolume) {
        video.volume = parseFloat(video.dataset.pipVolume);
      }
      if (video.dataset.pipOpacity) {
        const opacity = parseFloat(video.dataset.pipOpacity);
        video.style.opacity = opacity;
        video.style.filter = `opacity(${opacity})`;
      }
    });
    
    // Reapply settings periodically while in PIP
    let pipInterval;
    video.addEventListener('enterpictureinpicture', () => {
      pipInterval = setInterval(() => {
        if (video.dataset.pipOpacity) {
          const opacity = parseFloat(video.dataset.pipOpacity);
          video.style.opacity = opacity;
          video.style.filter = `opacity(${opacity})`;
        }
        if (video.dataset.pipVolume) {
          video.volume = parseFloat(video.dataset.pipVolume);
        }
      }, 500);
    });
    
    video.addEventListener('leavepictureinpicture', () => {
      if (pipInterval) {
        clearInterval(pipInterval);
      }
    });
  }

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initialize existing videos
  document.querySelectorAll('video').forEach(initializeVideo);

  console.log('Better & Easy PIP content script loaded');
})();
