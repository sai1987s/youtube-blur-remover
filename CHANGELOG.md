# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- (none yet)

### Changed
- (none yet)

### Fixed
- (none yet)

## [3.0.1] - 2025-09-23

### Fixed
- Release workflow failure (glob used with `-f` leading to package not detected)
- Artifact detection updated to properly match `*-webstore.zip`
- README corruption and encoding issues (restructured, clarified install and usage)
- Manifest description updated to reflect open source status

### Changed
- Removed hardcoded versioned `zip` script; replaced with `dist` alias to dynamic build script

## [3.0.0] - 2024-09-02

### 🎉 Open Source Release

### Added

- **Open source release** under MIT License
- Ko-fi donation button in popup interface
- GitHub Actions CI/CD workflow
- Professional README with installation and contribution guidelines
- JSHint configuration for code quality
- Comprehensive .gitignore for clean repository

### Changed

- **Converted from commercial to free/open source model**
- Updated popup interface with donation support
- Removed proprietary EULA, Privacy Policy, and Security documentation
- Updated package.json for open source distribution
- Enhanced documentation for community contributions

### Removed

- Commercial licensing restrictions
- Proprietary documentation files
- Web Store monetization metadata

## [3.0.0-beta] - 2024-08-15

### Added

- Toggle functionality in popup interface
- Settings persistence using Chrome storage API
- Real-time enable/disable without page refresh
- Enhanced popup UI with status indicators
- Message passing between popup and content script

### Changed

- Updated to Manifest V3
- Improved extension architecture for user control
- Enhanced error handling and validation

### Fixed

- Content script initialization timing
- Extension state management

## [2.0.1] - 2024-08-01

### Fixed

- Video visibility issues when extension was too aggressive
- Canvas element targeting to preserve main video
- Performance optimization for DOM monitoring

### Changed

- Simplified targeting approach for better reliability
- Reduced interference with core YouTube functionality

## [2.0.0] - 2024-07-20

### Added

- Canvas and WebGL context handling for modern YouTube effects
- Advanced blur effect detection and removal
- Support for YouTube's ambient mode
- Dynamic content monitoring with MutationObserver

### Changed

- Enhanced CSS targeting for comprehensive effect removal
- Improved compatibility with YouTube interface updates

## [1.0.0] - 2024-07-05

### Added

- Initial release
- Basic blur effect removal using CSS injection
- Support for YouTube main pages and Shorts
- Chrome extension popup interface
- Automatic activation on YouTube domains

### Features

- Remove backdrop-filter blur effects
- Disable ambient mode lighting
- Remove gradient overlays
- Compatible with theater mode and fullscreen
- Lightweight and fast operation
