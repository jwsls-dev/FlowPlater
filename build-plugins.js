const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get all plugin files from src/plugins
const pluginsDir = path.join(__dirname, "src", "plugins");
const pluginFiles = fs
  .readdirSync(pluginsDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts");

// Build each plugin
pluginFiles.forEach((pluginFile) => {
  console.log(`Building plugin: ${pluginFile}`);
  try {
    execSync(`node build-plugin.js ${pluginFile}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to build plugin ${pluginFile}:`, error);
    process.exit(1);
  }
});
