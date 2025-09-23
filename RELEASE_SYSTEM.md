# 🚀 Automated Release System

## Overview

Your YouTube Blur Remover extension now has a comprehensive automated release system using GitHub Actions with proper semantic versioning and changelog integration.

---

## ✅ What's Been Added

### 🤖 GitHub Actions Workflows

#### 1. **Build Workflow** (`.github/workflows/build.yml`)

- **Triggers**: Push to main/develop, pull requests, tag pushes
- **Features**:
  - Validates manifest.json and extension structure
  - Builds distribution ZIP package
  - Runs JavaScript linting with JSHint
  - Checks all required files are present
  - Uploads build artifacts with version numbers
  - Creates GitHub releases automatically on tag push

#### 2. **Release Workflow** (`.github/workflows/release.yml`)

- **Triggers**: Manual workflow dispatch from GitHub UI
- **Features**:
  - Interactive version type selection (patch/minor/major)
  - Automatic version bumping in manifest.json and package.json
  - CHANGELOG.md updates with new version entries
  - Git tagging with semantic versioning
  - GitHub release creation with formatted changelog notes
  - Extension ZIP attachment to releases

### 🛠️ Release Scripts

#### 1. **Automated Release Script** (`scripts/create-release.sh`)

```bash
# Create a patch release
./scripts/create-release.sh patch "Bug fixes and improvements"

# Create a minor release
./scripts/create-release.sh minor "New features added"

# Create a major release
./scripts/create-release.sh major "Breaking changes"
```

#### 2. **Changelog Test Script** (`scripts/test-changelog.py`)

```bash
# Test changelog extraction for current version
python3 scripts/test-changelog.py

# Test changelog extraction for specific version
python3 scripts/test-changelog.py 2.0.1
```

---

## 🎯 Release Process Options

### Option 1: GitHub Actions UI (Recommended)

1. **Go to GitHub** → Your repository → Actions tab
2. **Select "Create Release"** workflow
3. **Click "Run workflow"**
4. **Choose version type**:
   - `patch` - Bug fixes (3.0.0 → 3.0.1)
   - `minor` - New features (3.0.0 → 3.1.0)
   - `major` - Breaking changes (3.0.0 → 4.0.0)
5. **Add optional release notes**
6. **Click "Run workflow"**

**Result**: Automatic version bump, changelog update, GitHub release with ZIP file

### Option 2: Command Line

```bash
# Use the release script
./scripts/create-release.sh patch "Description of changes"

# Push changes and tag
git push origin main && git push origin v3.0.1
```

**Result**: Same as Option 1, triggered by tag push

### Option 3: Manual Tag Creation

```bash
# Update version in manifest.json manually
# Commit changes
git add . && git commit -m "Release v3.0.1"

# Create and push tag
git tag v3.0.1 && git push origin v3.0.1
```

**Result**: Build workflow triggers and creates release

---

## 📋 What Happens During Release

### 1. **Version Management**

- ✅ `src/manifest.json` version updated
- ✅ `package.json` version updated
- ✅ `scripts/create-zip.py` filename updated
- ✅ Git tag created with `v` prefix (e.g., `v3.0.1`)

### 2. **Changelog Processing**

- ✅ CHANGELOG.md automatically updated
- ✅ New version section created with current date
- ✅ Unreleased changes moved to new version
- ✅ Changelog notes extracted for GitHub release

### 3. **Build & Package**

- ✅ Extension ZIP file built via `create-zip.py`
- ✅ Manifest validation and file structure checks
- ✅ JavaScript linting with JSHint
- ✅ Package size and contents verification

### 4. **GitHub Release**

- ✅ Release created with semantic version tag
- ✅ Formatted changelog notes as release description
- ✅ Extension ZIP file attached for download
- ✅ Installation instructions included
- ✅ Ko-fi and support links added

---

## 🔄 Semantic Versioning

Your extension follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) - Breaking changes, major rewrites
- **MINOR** (0.X.0) - New features, backwards compatible
- **PATCH** (0.0.X) - Bug fixes, minor improvements

### Examples:

- `3.0.0` → `3.0.1` (patch) - Fixed popup display issue
- `3.0.1` → `3.1.0` (minor) - Added new blur removal mode
- `3.1.0` → `4.0.0` (major) - Manifest V4 upgrade

---

## 📝 CHANGELOG.md Format

The system expects this format in CHANGELOG.md:

```markdown
## [Unreleased]

### Added

- New feature descriptions

### Changed

- Modified functionality

### Fixed

- Bug fixes

## [3.0.0] - 2024-09-02

### Added

- Feature that was added
```

**Important**: Always put new changes under `[Unreleased]` - the release system will move them to the proper version section.

---

## 🎮 Quick Start Examples

### Release a Bug Fix (Patch)

1. **Fix bugs** and commit to main branch
2. **Add to CHANGELOG.md** under `[Unreleased]`:
   ```markdown
   ### Fixed

   - Fixed popup not displaying on some YouTube pages
   - Resolved blur removal conflict with Dark Reader
   ```
3. **Go to GitHub Actions** → "Create Release" → Run workflow
4. **Select "patch"** → Add notes: "Bug fixes for popup and compatibility"
5. **Run workflow** → Automatic release created as `v3.0.1`

### Release New Features (Minor)

1. **Add features** and commit to main branch
2. **Add to CHANGELOG.md** under `[Unreleased]`:
   ```markdown
   ### Added

   - Custom blur intensity settings
   - Support for YouTube Music pages
   ```
3. **GitHub Actions** → "Create Release" → "minor"
4. **Result**: `v3.1.0` with feature descriptions

---

## 🔧 Testing & Validation

### Before Release

```bash
# Test changelog extraction
python3 scripts/test-changelog.py 3.0.0

# Validate workflows
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/build.yml'))"

# Test build process
python3 scripts/create-zip.py
```

### After Release

- ✅ Check GitHub Releases page for new release
- ✅ Download and test the ZIP file
- ✅ Verify version numbers in manifest.json
- ✅ Confirm CHANGELOG.md was updated

---

## 🎉 Benefits

### For You (Developer)

- **No manual version management** - Everything automated
- **Consistent release format** - Professional release notes every time
- **Error prevention** - Validation checks prevent broken releases
- **Time savings** - One-click releases from GitHub UI
- **Professional appearance** - Clean, formatted releases with changelogs

### For Users

- **Clear release notes** - Easy to understand what changed
- **Direct downloads** - ZIP files attached to releases
- **Installation instructions** - Built into every release
- **Support links** - Ko-fi and GitHub Issues always included

### For Contributors

- **Easy contribution** - Clear changelog format to follow
- **Automatic credit** - GitHub generates contributor lists
- **Quality assurance** - Automated testing before releases

---

## 🚀 Your Extension is Release-Ready!

The system is now fully configured and ready to use. Your next release can be created with just a few clicks in the GitHub Actions interface!

**Next Steps:**

1. Make some changes to your extension
2. Update CHANGELOG.md under `[Unreleased]`
3. Go to GitHub Actions and create your first automated release
4. Watch the magic happen! ✨
