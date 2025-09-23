// YouTube Blur Remover - Service Worker Background Script
// Handles extension lifecycle and cross-tab communication

// Debug flag - set to false before shipping
const DEBUG = false;

function debugLog(message, data = null) {
  if (DEBUG) {
    if (data) {
      console.log(`🚫 Background: ${message}`, data);
    } else {
      console.log(`🚫 Background: ${message}`);
    }
  }
}

debugLog("Service worker started");

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  debugLog("Extension installed/updated:", details.reason);

  // Set default settings
  if (details.reason === "install") {
    debugLog("First time install - setting defaults");
    chrome.storage.local.set({
      blurRemoverEnabled: true,
      installDate: Date.now(),
      version: chrome.runtime.getManifest().version,
    });
  }

  // Handle updates
  if (details.reason === "update") {
    debugLog("Extension updated - updating metadata");
    chrome.storage.local.set({
      lastUpdateDate: Date.now(),
      version: chrome.runtime.getManifest().version,
    });
  }
});

// Handle extension icon clicks (when popup might not be available)
chrome.action.onClicked.addListener(async (tab) => {
  // This only fires if no popup is defined or popup fails to load
  if (tab.url?.includes("youtube.com")) {
    // Toggle the extension state
    const result = await chrome.storage.local.get(["blurRemoverEnabled"]);
    const newState = !result.blurRemoverEnabled;

    await chrome.storage.local.set({ blurRemoverEnabled: newState });

    // Update icon to reflect state
    chrome.action.setIcon({
      path: {
        16: `icons/icon16${newState ? "" : "_disabled"}.png`,
        48: `icons/icon48${newState ? "" : "_disabled"}.png`,
        128: `icons/icon128${newState ? "" : "_disabled"}.png`,
      },
    });

    // Show notification
    chrome.action.setBadgeText({
      text: newState ? "ON" : "OFF",
      tabId: tab.id,
    });

    setTimeout(() => {
      chrome.action.setBadgeText({ text: "", tabId: tab.id });
    }, 2000);
  }
});

// Listen for storage changes and update icon accordingly
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.blurRemoverEnabled) {
    const isEnabled = changes.blurRemoverEnabled.newValue;

    // Update icon for all tabs
    chrome.action.setIcon({
      path: {
        16: `icons/icon16${isEnabled ? "" : "_disabled"}.png`,
        48: `icons/icon48${isEnabled ? "" : "_disabled"}.png`,
        128: `icons/icon128${isEnabled ? "" : "_disabled"}.png`,
      },
    });

    // Optional: Update title
    chrome.action.setTitle({
      title: `YouTube Blur Remover - ${isEnabled ? "Enabled" : "Disabled"}`,
    });
  }
});

// Handle tab updates to refresh extension state on YouTube pages
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.includes("youtube.com")) {
    // Ensure content script knows the current state
    const result = await chrome.storage.local.get(["blurRemoverEnabled"]);
    const isEnabled = result.blurRemoverEnabled !== false;

    // Update badge for this tab
    chrome.action.setBadgeText({
      text: isEnabled ? "●" : "○",
      tabId: tabId,
    });

    chrome.action.setBadgeBackgroundColor({
      color: isEnabled ? "#4CAF50" : "#9E9E9E",
      tabId: tabId,
    });
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "getStatus":
      chrome.storage.local.get(["blurRemoverEnabled"], (result) => {
        sendResponse({ enabled: result.blurRemoverEnabled !== false });
      });
      return true; // Keep message channel open for async response

    case "toggle":
      chrome.storage.local.get(["blurRemoverEnabled"], (result) => {
        const newState = !result.blurRemoverEnabled;
        chrome.storage.local.set({ blurRemoverEnabled: newState }, () => {
          sendResponse({ enabled: newState });
        });
      });
      return true;

    case "logUsage":
      // Optional: Log usage statistics
      chrome.storage.local.get(["usageCount"], (result) => {
        const count = (result.usageCount || 0) + 1;
        chrome.storage.local.set({
          usageCount: count,
          lastUsed: Date.now(),
        });
      });
      break;
  }
});

// Cleanup when extension is disabled/uninstalled
chrome.runtime.onSuspend.addListener(() => {
  console.log("YouTube Blur Remover: Service worker suspended");
});

console.log("YouTube Blur Remover: Service worker loaded");
