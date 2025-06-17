const fs = require("fs");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;
const license = packageJson.license;

// Update flowplater.js
let flowplaterContent = fs.readFileSync("src/core/FlowPlater.ts", "utf8");
flowplaterContent = flowplaterContent.replace(
  /const VERSION = "[\d\.]+"/,
  `const VERSION = "${version}"`,
);
flowplaterContent = flowplaterContent.replace(
  /const LICENSE = "[^"]+"/,
  `const LICENSE = "${license}"`,
);
fs.writeFileSync("src/core/FlowPlater.ts", flowplaterContent);

console.log("License information updated successfully");
