// Popup script for YouTube Blur & Glow Remover

document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const status = document.getElementById("status");
  const refreshNote = document.getElementById("refreshNote");

  // Load current state
  chrome.storage.sync.get(["blurRemoverEnabled"], function (result) {
    const isEnabled = result.blurRemoverEnabled !== false; // Default to true
    updateUI(isEnabled);
  });

  // Handle toggle click
  toggleSwitch.addEventListener("click", function () {
    chrome.storage.sync.get(["blurRemoverEnabled"], function (result) {
      const currentState = result.blurRemoverEnabled !== false; // Default to true
      const newState = !currentState;

      // Save new state
      chrome.storage.sync.set({ blurRemoverEnabled: newState }, function () {
        updateUI(newState);

        // Show refresh note
        refreshNote.style.display = "block";
        setTimeout(() => {
          refreshNote.style.display = "none";
        }, 3000);

        // Send message to content script to update immediately
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
              chrome.tabs.sendMessage(
                tabs[0].id,
                {
                  action: "toggleBlurRemover",
                  enabled: newState,
                },
                function (response) {
                  // Ignore errors if content script not ready
                  if (chrome.runtime.lastError) {
                    console.log(
                      "Content script not ready:",
                      chrome.runtime.lastError.message
                    );
                  }
                }
              );
            }
          }
        );
      });
    });
  });

  // Handle Ko-fi button clicks
  const kofiButton = document.querySelector(".kofi-button");
  if (kofiButton) {
    kofiButton.addEventListener("click", function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: "https://ko-fi.com/presdec" });
    });
  }

  function updateUI(isEnabled) {
    if (isEnabled) {
      toggleSwitch.classList.add("active");
      status.className = "status enabled";
      status.innerHTML = "✅ Extension is active - Glow effects removed";
    } else {
      toggleSwitch.classList.remove("active");
      status.className = "status disabled";
      status.innerHTML = "❌ Extension is disabled - Glow effects visible";
    }
  }
});
