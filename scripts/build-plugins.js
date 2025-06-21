const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the project root directory (one level up from scripts)
const projectRoot = path.join(__dirname, "..");

// Get all plugin files from src/plugins
const pluginsDir = path.join(projectRoot, "src", "plugins");
const pluginFiles = fs
  .readdirSync(pluginsDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts");

// Build each plugin
pluginFiles.forEach((pluginFile) => {
  console.log(`Building plugin: ${pluginFile}`);
  try {
    execSync(`node build-plugin.js ${pluginFile}`, {
      stdio: "inherit",
      cwd: __dirname, // Ensure we're running from the scripts directory
    });
  } catch (error) {
    console.error(`Failed to build plugin ${pluginFile}:`, error);
    process.exit(1);
  }
});
