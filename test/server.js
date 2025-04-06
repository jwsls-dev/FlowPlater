const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 42069;

// Function to read JSON files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(__dirname, "data", filename);
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Function to read HTML files
const readHtmlFile = (filename) => {
  try {
    const filePath = path.join(__dirname, "html", filename);
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Serve FlowPlater script
app.get("/flowplater", (req, res) => {
  try {
    const scriptPath = path.join(__dirname, "..", "dist", "flowplater.js");
    const script = fs.readFileSync(scriptPath, "utf8");
    res.type("application/javascript");
    res.send(script);
  } catch (error) {
    console.error("Error serving FlowPlater script:", error);
    res.status(500).send("Error loading FlowPlater script");
  }
});

// Serve all plugins or specific plugin
app.get("/plugins/:pluginName?", (req, res) => {
  try {
    const pluginsDir = path.join(__dirname, "..", "dist", "plugins");

    // If specific plugin requested
    if (req.params.pluginName) {
      const pluginPath = path.join(pluginsDir, `${req.params.pluginName}.js`);
      if (fs.existsSync(pluginPath)) {
        const script = fs.readFileSync(pluginPath, "utf8");
        res.type("application/javascript");
        return res.send(script);
      }
      return res.status(404).send(`Plugin ${req.params.pluginName} not found`);
    }

    // If no specific plugin, serve all plugins
    const pluginFiles = fs
      .readdirSync(pluginsDir)
      .filter((file) => file.endsWith(".js"));

    const combinedPlugins = pluginFiles
      .map((file) => fs.readFileSync(path.join(pluginsDir, file), "utf8"))
      .join("\n");

    res.type("application/javascript");
    res.send(combinedPlugins);
  } catch (error) {
    console.error("Error serving plugin(s):", error);
    res.status(500).send("Error loading plugin(s)");
  }
});

// Dynamic file route
app.get("/:filename", (req, res) => {
  const filename = req.params.filename;

  // First try to find a JSON file
  const jsonData = readJsonFile(
    filename.endsWith(".json") ? filename : `${filename}.json`,
  );
  if (jsonData !== null) {
    return res.json(jsonData);
  }

  // If no JSON file found, try to find an HTML file
  const htmlContent = readHtmlFile(
    filename.endsWith(".html") ? filename : `${filename}.html`,
  );
  if (htmlContent !== null) {
    return res.send(htmlContent);
  }

  // If neither file is found, return 404
  res.status(404).json({ error: "File not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
