const { nodeResolve } = require("@rollup/plugin-node-resolve");
const rollup = require("rollup");
const uglify = require("uglify-js");
const fs = require("fs");
const path = require("path");

// Ensure plugins directory exists
const pluginsDir = path.join(__dirname, "dist", "plugins");
if (!fs.existsSync(pluginsDir)) {
  fs.mkdirSync(pluginsDir, { recursive: true });
}

async function buildPlugin(pluginFile) {
  const pluginName = path.basename(pluginFile, ".js");
  const input = path.join(__dirname, "src", "plugins", pluginFile);
  const outputFile = path.join(pluginsDir, `${pluginName}.js`);
  const outputMinFile = path.join(pluginsDir, `${pluginName}.min.js`);

  try {
    // Create bundle
    const bundle = await rollup.rollup({
      input,
      plugins: [nodeResolve()],
      external: ["flowplater"], // Mark FlowPlater as external dependency
    });

    // Generate code
    const { output } = await bundle.generate({
      format: "iife",
      name: pluginName,
      globals: {
        flowplater: "FlowPlater",
      },
    });

    // Write unminified version
    fs.writeFileSync(outputFile, output[0].code);
    console.log(`Built ${outputFile}`);

    // Minify and write minified version
    const minified = uglify.minify(output[0].code, {
      compress: {
        drop_console: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.warn",
          "console.error",
        ],
      },
      mangle: true,
      output: {
        comments: false,
      },
    });

    if (minified.error) {
      throw new Error(`Minification failed: ${minified.error.message}`);
    }

    if (!minified.code) {
      throw new Error("Minification produced no output");
    }

    fs.writeFileSync(outputMinFile, minified.code);
    console.log(`Built ${outputMinFile}`);
  } catch (error) {
    console.error(`Error building plugin ${pluginFile}:`, error);
    throw error;
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Please provide a plugin file name");
  process.exit(1);
}

const pluginFile = args[0];
if (!fs.existsSync(path.join(__dirname, "src", "plugins", pluginFile))) {
  console.error(`Plugin file ${pluginFile} not found in src/plugins`);
  process.exit(1);
}

buildPlugin(pluginFile).catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
