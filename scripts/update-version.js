const fs = require("fs");
const path = require("path");

/**
 * Updates version information across multiple files in the FlowPlater project
 * This script reads from package.json and updates version references in:
 * - src/core/FlowPlater.ts (VERSION, LICENSE constants)
 * - src/licence.js (copyright year, version references)
 */

function getCurrentYear() {
  return new Date().getFullYear();
}

function updateFlowPlaterConstants(version, license, author) {
  const filePath = "src/core/FlowPlater.ts";

  try {
    let content = fs.readFileSync(filePath, "utf8");
    const originalContent = content;

    // Update VERSION constant
    content = content.replace(
      /const VERSION = "[^"]*"/,
      `const VERSION = "${version}"`,
    );

    // Update LICENSE constant
    content = content.replace(
      /const LICENSE = "[^"]*"/,
      `const LICENSE = "${license}"`,
    );

    // Update AUTHOR constant (if needed)
    if (author) {
      content = content.replace(
        /const AUTHOR = "[^"]*"/,
        `const AUTHOR = "${author}"`,
      );
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Updated ${filePath}`);
      return true;
    } else {
      console.log(`- No changes needed in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function updateLicenseFile(version) {
  const filePath = "src/licence.js";

  try {
    let content = fs.readFileSync(filePath, "utf8");
    const originalContent = content;
    const currentYear = getCurrentYear();

    // Update copyright year range
    content = content.replace(
      /Copyright \(c\) \d{4}( - \d{4})?,/,
      `Copyright (c) 2024 - ${currentYear},`,
    );

    // Update any version references (if they exist)
    // This is more flexible and could catch version patterns in comments
    content = content.replace(
      /FlowPlater v?[\d\.]+/gi,
      `FlowPlater v${version}`,
    );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Updated ${filePath}`);
      return true;
    } else {
      console.log(`- No changes needed in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function validateVersion(version) {
  // Basic semver validation
  const semverRegex = /^\d+\.\d+\.\d+(-[\w\.\-]+)?(\+[\w\.\-]+)?$/;
  return semverRegex.test(version);
}

function main() {
  console.log("🔄 Updating version information...");

  try {
    // Read package.json
    const packagePath = "package.json";
    if (!fs.existsSync(packagePath)) {
      console.error("✗ package.json not found!");
      process.exit(1);
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const { version, license, author } = packageJson;

    // Validate inputs
    if (!version) {
      console.error("✗ No version found in package.json!");
      process.exit(1);
    }

    if (!validateVersion(version)) {
      console.error(`✗ Invalid version format: ${version}`);
      console.error("  Expected format: x.y.z (semver)");
      process.exit(1);
    }

    console.log(`📦 Package version: ${version}`);
    console.log(`📄 License: ${license || "Not specified"}`);

    // Update files
    let updatedCount = 0;

    if (updateFlowPlaterConstants(version, license, author?.name || author)) {
      updatedCount++;
    }

    if (updateLicenseFile(version)) {
      updatedCount++;
    }

    // Summary
    console.log(`\n🎉 Version update complete!`);
    console.log(`   Updated ${updatedCount} file(s) to version ${version}`);
  } catch (error) {
    console.error("✗ Error reading package.json:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  updateFlowPlaterConstants,
  updateLicenseFile,
  validateVersion,
  main,
};
