#!/usr/bin/env node

/**
 * Build script for YouTube Blur Remover Chrome Extension
 * Creates a distribution package without requiring external zip tools
 */

const fs = require("fs");
const path = require("path");

console.log("🏗️  Building YouTube Blur Remover distribution package...\n");

// Files to include in the distribution
const filesToInclude = [
  "src/",
  "README.md",
  "LICENSE",
  "EULA.md",
  "PRIVACY.md",
  "SECURITY.md",
];

// Check if all required files exist
console.log("📋 Checking required files...");
let allFilesExist = true;

filesToInclude.forEach((file) => {
  const fullPath = path.join(process.cwd(), file);
  const exists = fs.existsSync(fullPath);
  const status = exists ? "✅" : "❌";
  console.log(`   ${status} ${file}`);

  if (!exists) {
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log(
    "\n❌ Some required files are missing. Please ensure all files exist before building."
  );
  process.exit(1);
}

console.log("\n✅ All required files found!");

// Validate manifest.json
console.log("\n🔍 Validating manifest.json...");
try {
  const manifestPath = path.join(process.cwd(), "src", "manifest.json");
  const manifestContent = fs.readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(manifestContent);

  console.log(`   ✅ Name: ${manifest.name}`);
  console.log(`   ✅ Version: ${manifest.version}`);
  console.log(`   ✅ Manifest Version: ${manifest.manifest_version}`);

  if (manifest.manifest_version !== 3) {
    console.log("   ⚠️  Warning: Not using Manifest V3");
  }
} catch (error) {
  console.log("   ❌ Invalid manifest.json:", error.message);
  process.exit(1);
}

// Create build info
console.log("\n📦 Creating build information...");
const buildInfo = {
  name: "YouTube Blur Remover",
  version: "3.0.0",
  buildDate: new Date().toISOString(),
  files: filesToInclude,
  instructions: [
    "1. Create a ZIP file containing these files:",
    ...filesToInclude.map((f) => `   - ${f}`),
    "2. Upload the ZIP file to Chrome Web Store Developer Console",
    "3. Set as FREE extension",
    "4. Add Ko-fi donation link in description",
    "5. Submit for review",
  ],
};

// Write build info to file
fs.writeFileSync("build-info.json", JSON.stringify(buildInfo, null, 2));
console.log("   ✅ Created build-info.json");

// Manual packaging instructions
console.log("\n📋 MANUAL PACKAGING INSTRUCTIONS:");
console.log("");
console.log(
  "Since the zip command is not available, please manually create the package:"
);
console.log("");
console.log("1. Using file manager (GUI):");
console.log("   - Select these files/folders:");
filesToInclude.forEach((file) => {
  console.log(`     • ${file}`);
});
console.log('   - Right-click → "Create archive" or "Compress"');
console.log("   - Name it: youtube-blur-remover-v3.0.0.zip");
console.log("");
console.log("2. Using command line (if zip gets installed):");
console.log("   sudo apt-get install zip  # Install zip");
console.log("   npm run zip              # Then run zip command");
console.log("");
console.log("3. Alternative - Install zip and try again:");
console.log("   sudo apt-get update && sudo apt-get install zip");
console.log("   npm run zip");
console.log("");

// Try to install zip automatically
console.log("🔧 Attempting to install zip command...");
const { exec } = require("child_process");

exec("which zip", (error, stdout, stderr) => {
  if (error) {
    console.log("   ❌ zip command not found");
    console.log("   💡 Try installing with: sudo apt-get install zip");
    console.log("");
    console.log("✅ Build validation complete!");
    console.log("📦 Ready for manual packaging or zip installation.");
  } else {
    console.log("   ✅ zip command found, running zip creation...");

    const zipCommand =
      "zip -r youtube-blur-remover-v3.0.0.zip " + filesToInclude.join(" ");
    exec(zipCommand, (zipError, zipStdout, zipStderr) => {
      if (zipError) {
        console.log("   ❌ Zip creation failed:", zipError.message);
      } else {
        console.log(
          "   ✅ Successfully created youtube-blur-remover-v3.0.0.zip"
        );
        console.log("");
        console.log("🎉 BUILD COMPLETE!");
        console.log("📦 Package ready for Chrome Web Store upload.");
      }
    });
  }
});
