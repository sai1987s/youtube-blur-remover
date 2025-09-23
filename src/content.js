// YouTube Blur Remover - Content Script
// Removes animated blur effects around YouTube videos

(function () {
  "use strict";

  // Debug flag - set to false before shipping
  const DEBUG = false;

  function debugLog(message, data = null) {
    if (DEBUG) {
      if (data) {
        console.log(`🚫 YouTube Blur Remover: ${message}`, data);
      } else {
        console.log(`🚫 YouTube Blur Remover: ${message}`);
      }
    }
  }

  debugLog("Content script loaded on:", window.location.href);

  // Check if extension is enabled
  function checkExtensionStatus(callback) {
    debugLog("Checking extension status...");
    chrome.storage.local.get(["blurRemoverEnabled"], function (result) {
      const isEnabled = result.blurRemoverEnabled !== false; // Default to true
      debugLog(
        `Extension status: ${isEnabled ? "ENABLED" : "DISABLED"}`,
        result
      );
      callback(isEnabled);
    });
  }

  // CSS to remove blur effects
  const removeBlurCSS = `
        /* Remove YouTube's animated blur effects */
        ytd-watch-flexy[theater] #player-theater-container::before,
        ytd-watch-flexy[fullscreen] #player-full-bleed-container::before,
        .ytp-player-content::before,
        .html5-video-player::before,
        .ytp-gradient-top,
        .ytp-gradient-bottom,
        .ytp-ce-covering-overlay,
        .ytp-ce-element-shadow,
        .ytp-ce-covering-image {
            display: none !important;
        }
        
        /* Remove backdrop filters and blur effects */
        ytd-watch-flexy[theater] #player-theater-container,
        ytd-watch-flexy[fullscreen] #player-full-bleed-container,
        .ytp-player-content,
        .html5-video-player {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
        
        /* Remove any CSS animations that create blur effects */
        .ytp-ce-element,
        .ytp-ce-video,
        .ytp-ce-expanding-image {
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            animation: none !important;
            transition: none !important;
        }
        
        /* Clean up player overlay effects */
        .ytp-player-content .ytp-ce-element {
            box-shadow: none !important;
            background: transparent !important;
        }
        
        /* Remove any remaining blur filters on video containers */
        #player-container,
        #player-container-outer,
        #player-container-inner {
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
        
        /* DEBUG: Add a visual indicator that the extension is working */
        ${
          DEBUG
            ? `
        body::before {
            content: "🚫 YouTube Blur Remover Active";
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 255, 0, 0.8);
            color: black;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 999999;
            font-size: 12px;
            font-family: Arial, sans-serif;
            pointer-events: none;
        }
        `
            : ""
        }
    `;

  let styleElement = null;

  // Apply the blur removal CSS
  function applyBlurRemoval() {
    debugLog("Applying blur removal CSS...");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "youtube-blur-remover-styles";
      styleElement.textContent = removeBlurCSS;
      debugLog("Created new style element");
    }

    if (!document.head.contains(styleElement)) {
      document.head.appendChild(styleElement);
      debugLog("✅ Style element added to document head");

      // Count how many elements we're targeting
      setTimeout(() => {
        const targetedElements = document.querySelectorAll(`
          .ytp-player-content,
          .html5-video-player,
          .ytp-gradient-top,
          .ytp-gradient-bottom
        `);
        debugLog(`Found ${targetedElements.length} potential target elements`);

        // Check if we can find the video player
        const videoPlayer = document.querySelector(".html5-video-player");
        if (videoPlayer) {
          debugLog("✅ Found YouTube video player element");
        } else {
          debugLog("❌ No video player found yet");
        }
      }, 1000);
    } else {
      debugLog("Style element already exists in document");
    }
  }

  // Remove the blur removal CSS
  function removeBlurRemoval() {
    debugLog("Removing blur removal CSS...");
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement);
      debugLog("❌ Style element removed from document head");
    } else {
      debugLog("No style element to remove");
    }
  }

  // Initialize or update based on extension status
  function updateBlurRemoval() {
    debugLog("Updating blur removal state...");
    checkExtensionStatus(function (isEnabled) {
      if (isEnabled) {
        debugLog("🟢 Extension is enabled - applying blur removal");
        applyBlurRemoval();

        // Visual confirmation in console
        setTimeout(() => {
          debugLog(
            "🎯 If you see YouTube blur effects, they should now be removed!"
          );
          debugLog(
            "Look for the green indicator in top-right corner of the page"
          );
        }, 2000);
      } else {
        debugLog("🔴 Extension is disabled - removing blur removal");
        removeBlurRemoval();
      }
    });
  }

  // Listen for storage changes (when user toggles the extension)
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === "local" && changes.blurRemoverEnabled) {
      debugLog("Storage changed - updating extension state", changes);
      updateBlurRemoval();
    }
  });

  // Initialize on page load
  if (document.readyState === "loading") {
    debugLog("Document still loading - waiting for DOMContentLoaded");
    document.addEventListener("DOMContentLoaded", updateBlurRemoval);
  } else {
    debugLog("Document already loaded - running immediately");
    updateBlurRemoval();
  }

  // Also run when navigating between YouTube pages (SPA behavior)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      debugLog("URL changed - reapplying extension", {
        from: lastUrl,
        to: url,
      });
      // Delay to ensure page has loaded
      setTimeout(updateBlurRemoval, 500);
    }
  }).observe(document, { subtree: true, childList: true });

  debugLog("YouTube Blur Remover: Content script fully initialized");
})();
