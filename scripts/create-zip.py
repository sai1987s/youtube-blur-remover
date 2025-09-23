#!/usr/bin/env python3
"""
Build script for YouTube Blur Remover Chrome Extension
Creates a ZIP package using Python's built-in zipfile module
"""

import os
import zipfile
import json
from pathlib import Path

def main():
    print("🏗️  Building YouTube Blur Remover distribution package...\n")
    
    # Files and directories to include (Chrome Web Store only allows src/ contents)
    files_to_include = [
        'src/'
    ]
    
    # Documentation files (for reference only, not included in upload)
    documentation_files = [
        'README.md',
        'LICENSE', 
        'CHANGELOG.md'
    ]
    
    output_zip = 'youtube-blur-remover-v3.0.0-webstore.zip'
    
    # Check if src directory exists
    print("📋 Checking extension files...")
    
    if not os.path.exists('src/'):
        print("   ❌ src/ directory not found")
        return 1
    else:
        print("   ✅ src/ directory found")
    
    # Check documentation files (for info only)
    print("\n📖 Documentation files (not included in upload):")
    for doc_file in documentation_files:
        if os.path.exists(doc_file):
            print(f"   ✅ {doc_file}")
        else:
            print(f"   ❌ {doc_file} (missing)")
    
    missing_files = []
    
    for file_path in files_to_include:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
            print(f"   ❌ {file_path}")
        else:
            print(f"   ✅ {file_path}")
    
    if missing_files:
        print(f"\n❌ Missing extension files: {', '.join(missing_files)}")
        print("Please ensure src/ directory contains all extension files.")
        return 1
    
    print("\n✅ All extension files found!")
    
    # Validate manifest.json
    print("\n🔍 Validating manifest.json...")
    try:
        with open('src/manifest.json', 'r') as f:
            manifest = json.load(f)
        
        print(f"   ✅ Name: {manifest.get('name', 'Unknown')}")
        print(f"   ✅ Version: {manifest.get('version', 'Unknown')}")
        print(f"   ✅ Manifest Version: {manifest.get('manifest_version', 'Unknown')}")
        
        if manifest.get('manifest_version') != 3:
            print("   ⚠️  Warning: Not using Manifest V3")
            
    except Exception as e:
        print(f"   ❌ Invalid manifest.json: {e}")
        return 1
    
    # Create ZIP file
    print(f"\n📦 Creating {output_zip}...")
    
    try:
        with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            files_added = 0
            
            for item in files_to_include:
                if os.path.isfile(item):
                    # Add single file
                    zipf.write(item)
                    files_added += 1
                    print(f"   ✅ Added file: {item}")
                    
                elif os.path.isdir(item):
                    # Add directory recursively
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arcname = os.path.relpath(file_path)
                            zipf.write(file_path, arcname)
                            files_added += 1
                            print(f"   ✅ Added: {arcname}")
            
            print(f"\n🎉 Successfully created {output_zip}")
            print(f"📊 Extension files added: {files_added}")
            print("🚫 Documentation files excluded (as required by Chrome Web Store)")
            
            # Get file size
            zip_size = os.path.getsize(output_zip)
            if zip_size < 1024:
                size_str = f"{zip_size} bytes"
            elif zip_size < 1024 * 1024:
                size_str = f"{zip_size / 1024:.1f} KB"
            else:
                size_str = f"{zip_size / (1024 * 1024):.1f} MB"
            
            print(f"📏 Package size: {size_str}")
            
    except Exception as e:
        print(f"❌ Failed to create ZIP file: {e}")
        return 1
    
    # Final instructions
    print("\n🚀 CHROME WEB STORE UPLOAD INSTRUCTIONS:")
    print("1. Go to https://chrome.google.com/webstore/devconsole")
    print("2. Click 'Add new item'")
    print(f"3. Upload: {output_zip}")
    print("4. Set as FREE extension")
    print("5. In store listing, add description from README.md")
    print("6. Add screenshots and promotional images")
    print("7. Submit for review")
    print("\n💡 Note: This is a FREE open source extension under MIT License")
    print("   Support development: https://ko-fi.com/presdec")
    print("\n✅ Build complete! Extension package ready for upload.")
    
    return 0
    
    return 0

if __name__ == "__main__":
    exit(main())