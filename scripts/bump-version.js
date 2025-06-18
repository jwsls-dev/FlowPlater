const fs = require("fs");
const { execSync } = require("child_process");
const { main: updateVersion } = require("./update-version");

/**
 * Bumps the version in package.json according to semver rules
 * Supports: patch, minor, major
 * Usage: node scripts/bump-version.js [patch|minor|major] [--build] [--tag] [--no-commit]
 */

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  return packageJson.version;
}

function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(-.*)?(\+.*)?$/);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }

  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    prerelease: match[4] || "",
    buildmeta: match[5] || "",
  };
}

function bumpVersion(currentVersion, type) {
  const parsed = parseVersion(currentVersion);

  switch (type) {
    case "major":
      parsed.major++;
      parsed.minor = 0;
      parsed.patch = 0;
      break;
    case "minor":
      parsed.minor++;
      parsed.patch = 0;
      break;
    case "patch":
      parsed.patch++;
      break;
    default:
      throw new Error(
        `Invalid bump type: ${type}. Use 'patch', 'minor', or 'major'.`,
      );
  }

  // For now, remove prerelease and buildmeta on version bump
  return `${parsed.major}.${parsed.minor}.${parsed.patch}`;
}

function updatePackageJson(newVersion) {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  packageJson.version = newVersion;

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");
}

function hasUncommittedChanges() {
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" });
    return status.trim().length > 0;
  } catch {
    // Not a git repo or git not available
    return false;
  }
}

function buildDistribution() {
  try {
    console.log("🔨 Building distribution files...");
    execSync("npm run rollup", { stdio: "inherit" });
    execSync("npm run minify", { stdio: "inherit" });
    console.log("✓ Built distribution files");
    return true;
  } catch (error) {
    console.error("✗ Error building distribution:", error.message);
    return false;
  }
}

function commitVersionBump(version, includeDist = false) {
  try {
    const filesToAdd = [
      "package.json",
      "src/core/FlowPlater.ts",
      "src/licence.js",
    ];
    if (includeDist) {
      filesToAdd.push("dist/flowplater.js", "dist/flowplater.min.js");
    }

    execSync(`git add ${filesToAdd.join(" ")}`);
    execSync(`git commit -m "Bump version to ${version}"`);
    console.log(`✓ Committed version bump to ${version}`);

    // Optionally create a tag
    const createTag =
      process.argv.includes("--tag") || process.argv.includes("-t");
    if (createTag) {
      execSync(`git tag v${version}`);
      console.log(`✓ Created tag v${version}`);
    }
  } catch (error) {
    console.error("✗ Error committing changes:", error.message);
    console.log("💡 You may need to commit manually");
  }
}

function main() {
  const bumpType = process.argv[2];

  if (!bumpType || !["patch", "minor", "major"].includes(bumpType)) {
    console.error(
      "Usage: node scripts/bump-version.js [patch|minor|major] [--build] [--tag] [--no-commit]",
    );
    console.error("");
    console.error("Examples:");
    console.error("  npm run version:patch        # Just bump version");
    console.error(
      "  npm run version:patch:build  # Bump version + build dist files",
    );
    console.error("  npm run release:minor        # Bump + build + tag");
    console.error("");
    console.error("Options:");
    console.error("  --build      Also build distribution files");
    console.error("  --tag        Create git tag after commit");
    console.error("  --no-commit  Skip automatic git commit");
    process.exit(1);
  }

  try {
    const currentVersion = getCurrentVersion();
    const newVersion = bumpVersion(currentVersion, bumpType);
    const shouldBuild = process.argv.includes("--build");

    console.log(`🔄 Bumping version from ${currentVersion} to ${newVersion}`);
    if (shouldBuild) {
      console.log("📦 Will also build distribution files");
    }

    // Check for uncommitted changes
    if (hasUncommittedChanges()) {
      console.warn(
        "⚠️  You have uncommitted changes. Consider committing them first.",
      );
    }

    // Update package.json
    updatePackageJson(newVersion);
    console.log(`✓ Updated package.json`);

    // Update source files
    updateVersion();

    // Build distribution files if requested
    let buildSuccess = true;
    if (shouldBuild) {
      buildSuccess = buildDistribution();
    }

    // Auto-commit if this is a git repo
    const shouldCommit = !process.argv.includes("--no-commit");
    if (shouldCommit && buildSuccess) {
      commitVersionBump(newVersion, shouldBuild);
    }

    console.log(`\n🎉 Version bumped successfully!`);
    console.log(`   ${currentVersion} -> ${newVersion}`);

    if (shouldBuild && buildSuccess) {
      console.log("   📦 Distribution files updated");
    } else if (!shouldBuild) {
      console.log("\n💡 To also build distribution files:");
      console.log(`   npm run version:${bumpType}:build`);
      console.log("   or run: npm run build");
    }

    if (!shouldCommit) {
      console.log("\n💡 Don't forget to commit your changes:");
      const files =
        shouldBuild && buildSuccess
          ? "package.json src/ dist/"
          : "package.json src/";
      console.log(
        `   git add ${files} && git commit -m "Bump version to ${newVersion}"`,
      );
    }
  } catch (error) {
    console.error("✗ Error:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getCurrentVersion,
  parseVersion,
  bumpVersion,
  buildDistribution,
  main,
};
