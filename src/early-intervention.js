// Early intervention script to block YouTube ambient effects
// This script runs before YouTube's main JavaScript loads

(function() {
  'use strict';
  
  console.log('YouTube Blur Remover: Early intervention script loaded');
  
  // Block ambient mode at the source by overriding YouTube's APIs
  
  // Override Canvas context creation globally
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
    const canvas = this;
    
    // PRESERVE main video canvas contexts
    if (canvas.classList.contains('html5-main-video') ||
        canvas.classList.contains('video-stream') ||
        canvas.parentElement?.classList.contains('html5-video-container')) {
      // This is the main video canvas - allow all contexts
      return originalGetContext.call(this, contextType, ...args);
    }
    
    // Check if this canvas is likely for ambient effects
    const checkAmbient = () => {
      return (
        canvas.className && (
          canvas.className.includes('ambient') ||
          canvas.className.includes('glow') ||
          canvas.className.includes('effect')
        ) ||
        canvas.id && (
          canvas.id.includes('ambient') ||
          canvas.id.includes('glow') ||
          canvas.id.includes('effect')
        ) ||
        canvas.hasAttribute('data-ambient') ||
        canvas.hasAttribute('data-glow')
      );
    };
    
    // For WebGL contexts, be more restrictive but preserve video
    if ((contextType === 'webgl' || contextType === 'webgl2')) {
      if (checkAmbient()) {
        console.log('YouTube Blur Remover: Blocked WebGL context for ambient effect');
        return null;
      }
      
      // Check parent elements but preserve video container
      let parent = canvas.parentElement;
      while (parent) {
        if (parent.classList.contains('html5-video-container')) {
          // This is in the main video container - allow it
          break;
        }
        if (parent.id === 'movie_player' || parent.className.includes('player')) {
          // In player but not video container - might be ambient
          if (checkAmbient()) {
            console.log('YouTube Blur Remover: Blocked WebGL context in ambient parent');
            return null;
          }
          break;
        }
        if (parent.className && (
          parent.className.includes('ambient') ||
          parent.className.includes('glow')
        )) {
          console.log('YouTube Blur Remover: Blocked WebGL context in ambient parent');
          return null;
        }
        parent = parent.parentElement;
      }
    }
    
    const context = originalGetContext.call(this, contextType, ...args);
    
    // If we got a context, monitor it for ambient effects
    if (context && (contextType === 'webgl' || contextType === 'webgl2' || contextType === '2d')) {
      setTimeout(() => {
        if (checkAmbient()) {
          console.log('YouTube Blur Remover: Clearing context of ambient canvas');
          try {
            if (contextType === '2d') {
              context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
              context.clear(context.COLOR_BUFFER_BIT);
            }
          } catch (e) {
            // Ignore clearing errors
          }
        }
      }, 100);
    }
    
    return context;
  };
  
  // Override CSS style setting to prevent blur effects
  const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
    // Block backdrop-filter and filter properties
    if (property === 'backdrop-filter' || 
        property === '-webkit-backdrop-filter' || 
        (property === 'filter' && value && value.includes('blur'))) {
      console.log('YouTube Blur Remover: Blocked CSS property:', property, value);
      return originalSetProperty.call(this, property, 'none', 'important');
    }
    
    // Block box-shadow that might create glow
    if (property === 'box-shadow' && value && (
        value.includes('glow') || 
        value.includes('ambient') ||
        (value.includes('px') && value.includes('rgba'))
    )) {
      console.log('YouTube Blur Remover: Blocked glow box-shadow:', value);
      return originalSetProperty.call(this, property, 'none', 'important');
    }
    
    return originalSetProperty.call(this, property, value, priority);
  };
  
  // Block specific YouTube ambient mode functions if they exist
  Object.defineProperty(window, 'yt', {
    get: function() {
      return this._yt;
    },
    set: function(value) {
      if (value && typeof value === 'object') {
        // Try to disable ambient mode in YouTube's configuration
        if (value.config && value.config.EXPERIMENT_FLAGS) {
          value.config.EXPERIMENT_FLAGS.ambient_mode_enabled = false;
          value.config.EXPERIMENT_FLAGS.ambient_mode = false;
          value.config.EXPERIMENT_FLAGS.enable_ambient_mode = false;
        }
      }
      this._yt = value;
    }
  });
  
  // Additional early DOM manipulation
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // PRESERVE main video elements
            if (node.classList?.contains('html5-main-video') ||
                node.classList?.contains('video-stream') ||
                node.classList?.contains('html5-video-container')) {
              // This is a main video element - ensure it's visible
              node.style.setProperty('display', 'block', 'important');
              node.style.setProperty('opacity', '1', 'important');
              node.style.setProperty('visibility', 'visible', 'important');
              return; // Don't process further
            }
            
            // Immediately hide any ambient-related elements (but not video)
            if (node.className && typeof node.className === 'string' && (
              node.className.includes('ambient') ||
              node.className.includes('glow')
            ) && !node.className.includes('video') && !node.className.includes('html5')) {
              node.style.setProperty('display', 'none', 'important');
              node.style.setProperty('opacity', '0', 'important');
            }
            
            // Check for canvas elements (but preserve video canvas)
            if (node.tagName === 'CANVAS') {
              setTimeout(() => {
                // Don't hide main video canvas
                if (node.classList.contains('html5-main-video') ||
                    node.classList.contains('video-stream') ||
                    node.parentElement?.classList.contains('html5-video-container')) {
                  return;
                }
                
                if ((node.className && typeof node.className === 'string' && (
                    node.className.includes('ambient') || 
                    node.className.includes('glow'))) ||
                    (node.id && typeof node.id === 'string' && (
                    node.id.includes('ambient') ||
                    node.id.includes('glow')))) {
                  node.style.setProperty('display', 'none', 'important');
                  node.style.setProperty('opacity', '0', 'important');
                }
              }, 50);
            }
          }
        });
      }
    });
  });
  
  // Start observing as soon as possible
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  
})();