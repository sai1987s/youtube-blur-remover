# YouTube Blur Remover 🚫

Free & Open Source Chrome Extension that removes YouTube's animated blur effects and ambient glow for a cleaner viewing experience.

[![Latest Release](https://img.shields.io/github/v/release/presdec/youtube-blur-remover?display_name=tag&sort=semver)](https://github.com/presdec/youtube-blur-remover/releases)
[![Build & Lint Status](https://github.com/presdec/youtube-blur-remover/actions/workflows/build.yml/badge.svg)](https://github.com/presdec/youtube-blur-remover/actions/workflows/build.yml)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-green?style=flat&logo=google-chrome)](https://chrome.google.com/webstore)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ko-fi](https://img.shields.io/badge/Support%20on-Ko--fi-red?style=flat&logo=ko-fi)](https://ko-fi.com/presdec)

## ✨ Features

- 🎯 Removes animated blur around the video player
- 🌟 Disables ambient glow / mood lighting
- ⚡ Lightweight & efficient (runs only on YouTube)
- 🔄 Quick toggle via popup
- 🎭 Works in normal + theater mode + embedded pages
- 🔒 No tracking, no external requests, no analytics

## 🚀 Installation

### Chrome Web Store (Coming Soon)

Will be available after initial review. For now, use manual install.

### Manual Install (Developer Mode)

```bash
git clone https://github.com/presdec/youtube-blur-remover.git
cd youtube-blur-remover
```

Then:

1. Open `chrome://extensions/`
2. Enable Developer Mode (top-right)
3. Click "Load unpacked"
4. Select the `src/` folder

## 🎮 Usage

1. Open any YouTube video
2. Click the extension icon if you want to toggle it off/on
3. Blur & glow are removed automatically when enabled

Removes:

- Animated player edge blur
- Ambient glow / mood lighting overlays
- Canvas / CSS glow layers & gradients

## 🛠️ Development

Prerequisites: Chrome/Chromium, optional Node.js for helper scripts

Build a distributable ZIP:

```bash
npm run build
```

This runs `scripts/create-zip.py` and produces `youtube-blur-remover-vX.Y.Z-webstore.zip`.

### File Structure

```
src/
├── manifest.json      # Extension manifest (MV3)
├── background.js      # Service worker
├── content.js         # Blur/glow removal logic
├── popup.html / popup.js
├── styles.css         # Override styles
├── config.js          # Constants
└── icons/             # Icons
```

### How It Works

1. Early-run content script injects CSS to neutralize blur/glow
2. Mutation observers catch dynamic player re-renders
3. Popup toggles a persisted enabled/disabled state
4. Minimal DOM writes → negligible performance impact

## 🤝 Contributing

1. Fork the repo
2. `git checkout -b feature/your-feature`
3. Make changes (add tests/docs if needed)
4. `git commit -m 'feat: add X'`
5. `git push origin feature/your-feature`
6. Open a Pull Request

Guidelines:

- Keep scope focused
- Test on: normal page, theater mode, embedded player
- Update README/CHANGELOG if behavior changes

## 🐛 Bug Reports & Feature Requests

Use GitHub Issues & Discussions:

- Bugs: https://github.com/presdec/youtube-blur-remover/issues
- Ideas / enhancements: https://github.com/presdec/youtube-blur-remover/discussions

## 📦 Release Process

Automated via GitHub Actions. To create a release:

1. Run the "Create Release" workflow (choose patch/minor/major)
2. Workflow updates versions, changelog, creates tag & release
3. Build workflow attaches the ZIP artifact

Manual (fallback):

```bash
./scripts/create-release.sh patch "Short description"
git push origin main --tags
```

## 💖 Support the Project

If this helps you, consider supporting:

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/presdec)

Stars, feedback, and reviews also help a ton 🙏

## 📄 License

MIT License. See [LICENSE](LICENSE).

## 🔒 Privacy

- No data collection
- Runs only on YouTube domains
- No network requests besides YouTube itself
- 100% local execution

## 🌟 Acknowledgments

Built for users who want a clean, distraction‑free YouTube. Community feedback welcome.

---

Made with ❤️. If you like it, drop a ⭐.

## � Release Process

### Automated Releases (Recommended)

4. **Run workflow** - Automatically creates release with changelog

### Manual Releases

```bash
# Create a new release (patch/minor/major)
./scripts/create-release.sh patch "Bug fixes and improvements"

# Push to trigger GitHub Actions
git push origin main && git push origin v1.0.1
```

### What Happens

- ✅ Version numbers updated in `manifest.json` and `package.json`
- ✅ CHANGELOG.md updated with new version
- ✅ Git tag created with semantic versioning
- ✅ GitHub release created with changelog notes
- ✅ Extension ZIP file attached to release
- ✅ Release notes formatted for easy reading

## �💖 Support the Project

If this extension helps improve your YouTube experience, consider supporting its development:

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/presdec)

Your support helps maintain and improve the extension. Thank you! 🙏

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

This extension:

- ✅ **No data collection** - Works entirely on your device
- ✅ **No tracking** - Doesn't send any information anywhere
- ✅ **Minimal permissions** - Only accesses YouTube pages when needed
- ✅ **Open source** - Code is fully transparent and auditable

## 🌟 Acknowledgments

- Thanks to the YouTube community for feedback and suggestions
- Inspired by users who want a cleaner video viewing experience
- Built with modern Chrome Extension Manifest V3 standards

---

**Made with ❤️ by the open source community**

_If you find this extension useful, please consider leaving a ⭐ star on GitHub and a review on the Chrome Web Store!_
