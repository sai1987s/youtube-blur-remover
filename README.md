# YouTube Blur Remover 🚫

**Free & Open Source Chrome Extension**

Remove YouTube's annoying animated blur effects and ambient glow around videos for a cleaner viewing experience.

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-green?style=flat&logo=google-chrome)](https://chrome.google.com/webstore)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ko-fi](https://img.shields.io/badge/Support%20on-Ko--fi-red?style=flat&logo=ko-fi)](https://ko-fi.com/presdec)

## ✨ Features

- **🎯 Remove blur effects** - Eliminates YouTube's animated blur around videos
- **🌟 Remove ambient glow** - Disables the distracting glow effects
- **⚡ Lightweight** - Minimal performance impact
- **🔄 Toggle control** - Easy on/off switch in popup
- **🎭 Theater mode support** - Works in all YouTube viewing modes
- **🔒 Privacy-focused** - No data collection, works entirely locally

## 🚀 Installation

### From Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "YouTube Blur Remover"
3. Click "Add to Chrome"

### From Source (Developers)

1. Clone this repository:
   ```bash
   git clone https://github.com/presdec/youtube-blur-remover.git
   cd youtube-blur-remover
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the `src/` folder

## 🎮 Usage

1. **Install the extension** (see installation above)
2. **Visit YouTube** and play any video
3. **Click the extension icon** in the toolbar to toggle on/off
4. **Enjoy cleaner videos** without distracting blur effects!

The extension automatically removes:

- Animated blur effects around video players
- Ambient glow and mood lighting effects
- Canvas-based visual effects
- Gradient overlays and shadows

## 🛠️ Development

### Prerequisites

- Chrome/Chromium browser
- Basic knowledge of Chrome Extensions
- Node.js (optional, for build tools)

### Setup

```bash
# Clone the repository
git clone https://github.com/presdec/youtube-blur-remover.git
cd youtube-blur-remover

# Install build dependencies (optional)
npm install

# Build distribution package
npm run build
```

### File Structure

```
src/
├── manifest.json      # Extension manifest (Manifest V3)
├── background.js      # Service worker for lifecycle management
├── content.js         # Main script that removes blur effects
├── popup.html         # Extension popup interface
├── popup.js           # Popup functionality and settings
├── styles.css         # CSS for blur removal
├── config.js          # Configuration and constants
└── icons/             # Extension icons (16px, 48px, 128px)
```

### How It Works

1. **Content Script Injection**: The extension injects CSS and JavaScript into YouTube pages
2. **DOM Manipulation**: Targets specific YouTube elements that create blur effects
3. **CSS Override**: Applies styles to disable blur, backdrop-filter, and glow effects
4. **State Management**: Saves user preferences and syncs across tabs

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and structure
- Test your changes on multiple YouTube pages
- Update documentation if needed
- Keep commits focused and well-described

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? We'd love to hear from you!

- **Bug Reports**: [Open an issue](https://github.com/presdec/youtube-blur-remover/issues) with detailed steps to reproduce
- **Feature Requests**: [Start a discussion](https://github.com/presdec/youtube-blur-remover/discussions) to share your ideas
- **Questions**: Check [existing issues](https://github.com/presdec/youtube-blur-remover/issues) or start a new discussion

## � Release Process

### Automated Releases (Recommended)

1. **Go to GitHub Actions** → "Create Release" workflow
2. **Click "Run workflow"** and select version type:
   - `patch` - Bug fixes (1.0.0 → 1.0.1)
   - `minor` - New features (1.0.0 → 1.1.0)
   - `major` - Breaking changes (1.0.0 → 2.0.0)
3. **Add release notes** (optional)
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
