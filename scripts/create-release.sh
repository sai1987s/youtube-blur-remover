#!/bin/bash

# Script to create a new release with proper semantic versioning
# Usage: ./scripts/create-release.sh [patch|minor|major] [message]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Check if we're in the right directory
if [ ! -f "src/manifest.json" ]; then
    log_error "manifest.json not found. Are you in the project root?"
    exit 1
fi

# Parse arguments
VERSION_TYPE=${1:-patch}
COMMIT_MESSAGE=${2:-"Release version"}

if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    log_error "Invalid version type. Use: patch, minor, or major"
    exit 1
fi

# Get current version from manifest.json
CURRENT_VERSION=$(python3 -c "
import json
with open('src/manifest.json', 'r') as f:
    manifest = json.load(f)
print(manifest['version'])
")

log_info "Current version: $CURRENT_VERSION"

# Calculate new version
NEW_VERSION=$(python3 -c "
import sys
version = '$CURRENT_VERSION'
parts = list(map(int, version.split('.')))

if '$VERSION_TYPE' == 'major':
    parts[0] += 1
    parts[1] = 0
    parts[2] = 0
elif '$VERSION_TYPE' == 'minor':
    parts[1] += 1
    parts[2] = 0
elif '$VERSION_TYPE' == 'patch':
    parts[2] += 1

print('.'.join(map(str, parts)))
")

log_info "New version: $NEW_VERSION"

# Confirm with user
read -p "Create release v$NEW_VERSION? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_warning "Release cancelled"
    exit 1
fi

# Update manifest.json
log_info "Updating manifest.json..."
python3 -c "
import json
with open('src/manifest.json', 'r') as f:
    manifest = json.load(f)

manifest['version'] = '$NEW_VERSION'

with open('src/manifest.json', 'w') as f:
    json.dump(manifest, f, indent=2)
    f.write('\n')
"

# Update package.json if it exists
if [ -f "package.json" ]; then
    log_info "Updating package.json..."
    python3 -c "
import json
with open('package.json', 'r') as f:
    package = json.load(f)

package['version'] = '$NEW_VERSION'

with open('package.json', 'w') as f:
    json.dump(package, f, indent=2)
    f.write('\n')
"
fi

# Update build script
log_info "Updating build script..."
sed -i "s/youtube-blur-remover-v[0-9]\+\.[0-9]\+\.[0-9]\+/youtube-blur-remover-v$NEW_VERSION/g" scripts/create-zip.py

# Stage changes
git add src/manifest.json package.json scripts/create-zip.py 2>/dev/null || true

# Create commit
log_info "Creating commit..."
git commit -m "$COMMIT_MESSAGE v$NEW_VERSION" || {
    log_warning "No changes to commit"
}

# Create tag
log_info "Creating tag v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "$COMMIT_MESSAGE v$NEW_VERSION"

log_success "Release v$NEW_VERSION created!"
log_info "Next steps:"
echo "  1. Push changes: git push origin main"
echo "  2. Push tag: git push origin v$NEW_VERSION"
echo "  3. GitHub Actions will automatically create the release"

# Option to push automatically
read -p "Push changes and tag now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Pushing changes..."
    git push origin main
    
    log_info "Pushing tag..."
    git push origin "v$NEW_VERSION"
    
    log_success "Release pushed! Check GitHub Actions for build status."
    echo "🔗 Actions: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[\/:]//; s/\.git$//')/actions"
else
    log_warning "Remember to push manually:"
    echo "  git push origin main && git push origin v$NEW_VERSION"
fi