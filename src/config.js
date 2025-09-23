/**
 * YouTube Blur Remover - Configuration
 * CTX Package Configuration and Constants
 */

// Extension Configuration
export const CONFIG = {
  // Extension Metadata
  NAME: "YouTube Blur & Glow Remover",
  VERSION: "3.0.0",
  AUTHOR: "Your Name",

  // Feature Flags
  FEATURES: {
    DEBUG_MODE: false,
    ANALYTICS: false, // Set to true for production analytics
    ERROR_REPORTING: true,
    PERFORMANCE_MONITORING: false,
  },

  // Target Selectors for YouTube
  SELECTORS: {
    // Main blur effect elements
    BLUR_TARGETS: [
      "ytd-watch-flexy[theater] #player-theater-container::before",
      "ytd-watch-flexy[fullscreen] #player-full-bleed-container::before",
      ".ytp-player-content::before",
      ".html5-video-player::before",
      ".ytp-gradient-top",
      ".ytp-gradient-bottom",
      ".ytp-ce-covering-overlay",
      ".ytp-ce-element-shadow",
      ".ytp-ce-covering-image",
    ],

    // Container elements
    CONTAINERS: [
      "ytd-watch-flexy[theater] #player-theater-container",
      "ytd-watch-flexy[fullscreen] #player-full-bleed-container",
      ".ytp-player-content",
      ".html5-video-player",
    ],

    // Video player detection
    VIDEO_PLAYER: ".html5-video-player",
    WATCH_PAGE: "ytd-watch-flexy",
  },

  // Storage Keys
  STORAGE: {
    ENABLED: "blurRemoverEnabled",
    INSTALL_DATE: "installDate",
    VERSION: "version",
    USAGE_COUNT: "usageCount",
    LAST_USED: "lastUsed",
  },

  // Performance Settings
  PERFORMANCE: {
    MUTATION_THROTTLE: 500, // ms
    RETRY_DELAY: 1000, // ms
    MAX_RETRIES: 3,
  },

  // Analytics Events (for future use)
  EVENTS: {
    EXTENSION_ENABLED: "extension_enabled",
    EXTENSION_DISABLED: "extension_disabled",
    PAGE_LOAD: "page_load",
    BLUR_REMOVED: "blur_removed",
  },
};

// CSS Template for blur removal
export const CSS_TEMPLATE = {
  BLUR_REMOVAL: `
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
  `,

  DEBUG_INDICATOR: `
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
  `,
};

// Utility Functions
export const UTILS = {
  // Logger with levels
  log: (level, message, data = null) => {
    if (!CONFIG.FEATURES.DEBUG_MODE && level === "debug") return;

    const prefix = "🚫 YouTube Blur Remover:";
    const timestamp = new Date().toISOString();

    switch (level) {
      case "error":
        console.error(`${prefix} [ERROR] ${message}`, data || "");
        break;
      case "warn":
        console.warn(`${prefix} [WARN] ${message}`, data || "");
        break;
      case "info":
        console.info(`${prefix} [INFO] ${message}`, data || "");
        break;
      case "debug":
        console.log(`${prefix} [DEBUG] ${message}`, data || "");
        break;
      default:
        console.log(`${prefix} ${message}`, data || "");
    }
  },

  // Error handler
  handleError: (error, context = "Unknown") => {
    UTILS.log("error", `Error in ${context}:`, error);

    if (CONFIG.FEATURES.ERROR_REPORTING) {
      // Future: Send to analytics/error reporting service
      // analytics.reportError(error, context);
    }
  },

  // Performance timer
  timer: {
    start: (label) => {
      if (CONFIG.FEATURES.PERFORMANCE_MONITORING) {
        console.time(`🚫 ${label}`);
      }
    },
    end: (label) => {
      if (CONFIG.FEATURES.PERFORMANCE_MONITORING) {
        console.timeEnd(`🚫 ${label}`);
      }
    },
  },
};
