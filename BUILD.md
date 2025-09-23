# YouTube Blur Remover - Build Instructions

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/presdec/youtube-blur-remover.git
   cd youtube-blur-remover
   ```

2. **Install dependencies** (optional)
   ```bash
   npm install
   ```

## Chrome Extension Development

### Load Extension for Testing

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `src/` folder
5. The extension will be loaded and ready for testing

### Test on YouTube

1. Go to https://youtube.com
2. Play any video
3. Look for reduced blur effects around the video
4. Use the extension popup to toggle on/off

## Building for Distribution

### Create Distribution Package

```bash
npm run build
```

This creates `youtube-blur-remover-v3.0.0.zip` ready for Chrome Web Store upload.

### Manual Build

```bash
zip -r youtube-blur-remover-v3.0.0.zip src/ README.md LICENSE EULA.md PRIVACY.md SECURITY.md
```

## File Structure

```
youtube-blur-remover/
├── src/                    # Extension source code
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Service worker
│   ├── content.js         # Content script
│   ├── popup.html         # Popup interface
│   ├── popup.js           # Popup logic
│   ├── styles.css         # CSS styles
│   └── icons/             # Extension icons
├── README.md              # Main documentation
├── LICENSE                # License file
├── EULA.md               # End User License Agreement
├── PRIVACY.md            # Privacy Policy
├── SECURITY.md           # Security Policy
└── package.json          # Project metadata
```

## Publishing to Chrome Web Store

1. **Prepare the package**

   - Run `npm run build`
   - Test thoroughly in development mode

2. **Chrome Web Store Developer Console**

   - Go to https://chrome.google.com/webstore/devconsole
   - Click "Add new item"
   - Upload the generated ZIP file

3. **Store Listing**

   - Title: "YouTube Blur & Glow Remover"
   - Price: Free
   - Category: Productivity
   - Description: Use the content from README.md

4. **Submit for Review**
   - Complete all required fields
   - Submit for Google's review process
   - Usually takes 1-3 business days

## Quality Assurance

### Pre-submission Checklist

- [ ] Extension loads without errors
- [ ] All permissions justified and minimal
- [ ] Icons display correctly at all sizes
- [ ] Popup interface works properly
- [ ] Content script affects only YouTube
- [ ] No console errors in debug mode
- [ ] Open source documentation is complete

### Testing Scenarios

- [ ] Fresh YouTube page load
- [ ] Navigation between videos
- [ ] Theater mode toggle
- [ ] Fullscreen video playback
- [ ] Extension toggle on/off
- [ ] Browser restart persistence

## Version Management

Update version in three places for releases:

1. `package.json` - "version"
2. `src/manifest.json` - "version"
3. Build script filename

## Support

For issues and feature requests, please use the GitHub issue tracker.
