#!/usr/bin/env python3

"""
Test script to preview changelog extraction for releases
Usage: python3 scripts/test-changelog.py [version]
"""

import sys
import re

def extract_changelog(version):
    """Extract changelog section for a specific version"""
    try:
        with open('CHANGELOG.md', 'r') as f:
            content = f.read()
        
        # Find the section for this version
        pattern = rf"## \[{re.escape(version)}\].*?\n(.*?)(?=\n## \[|\n#[^#]|\Z)"
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            changelog_text = match.group(1).strip()
            # Clean up the text and format for GitHub release
            changelog_text = re.sub(r'\n### ', '\n\n### ', changelog_text)
            changelog_text = re.sub(r'\n- ', '\n• ', changelog_text)
            
            return changelog_text
        else:
            return None
            
    except Exception as e:
        print(f"❌ Error reading changelog: {e}")
        return None

def get_current_version():
    """Get current version from manifest.json"""
    try:
        import json
        with open('src/manifest.json', 'r') as f:
            manifest = json.load(f)
        return manifest['version']
    except Exception as e:
        print(f"❌ Error reading manifest: {e}")
        return None

def main():
    if len(sys.argv) > 1:
        version = sys.argv[1]
    else:
        version = get_current_version()
        if not version:
            sys.exit(1)
    
    print(f"📋 Extracting changelog for version: {version}")
    print("=" * 50)
    
    changelog = extract_changelog(version)
    
    if changelog:
        print("✅ Changelog found:")
        print()
        print(f"# YouTube Blur Remover v{version}")
        print()
        print("## What's New")
        print()
        print(changelog)
        print()
        print("## Installation")
        print()
        print(f"1. Download the `youtube-blur-remover-v{version}-webstore.zip` file")
        print("2. Go to `chrome://extensions/` in Chrome")
        print("3. Enable 'Developer mode'")
        print("4. Click 'Load unpacked' and select the extracted folder")
        print()
        print("Or install from the [Chrome Web Store](https://chrome.google.com/webstore) when available")
        print()
        print("## Support")
        print()
        print("💖 Support this free extension: [Ko-fi](https://ko-fi.com/presdec)")
        print("🐛 Report issues: [GitHub Issues](https://github.com/presdec/youtube-blur-remover/issues)")
        
    else:
        print(f"⚠️  No changelog found for version {version}")
        print("Available versions in CHANGELOG.md:")
        
        # List available versions
        try:
            with open('CHANGELOG.md', 'r') as f:
                content = f.read()
            
            versions = re.findall(r'## \[([^\]]+)\]', content)
            for v in versions:
                if v != "Unreleased":
                    print(f"  • {v}")
                    
        except Exception as e:
            print(f"❌ Error listing versions: {e}")

if __name__ == "__main__":
    main()