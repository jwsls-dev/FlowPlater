const fs = require("fs");
const path = require("path");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;
const license = packageJson.license;
const homepage = packageJson.homepage;

// Update license.js
let licenseContent = fs.readFileSync("src/licence.js", "utf8");
licenseContent = licenseContent.replace(
  /FlowPlater v[\d\.]+/g,
  `FlowPlater v${version}`,
);
licenseContent = licenseContent.replace(
  /https:\/\/flowplater\.(io|com)/g,
  homepage,
);
fs.writeFileSync("src/licence.js", licenseContent);

// Update flowplater.js
let flowplaterContent = fs.readFileSync("src/flowplater.js", "utf8");
flowplaterContent = flowplaterContent.replace(
  /const VERSION = "[\d\.]+"/,
  `const VERSION = "${version}"`,
);
flowplaterContent = flowplaterContent.replace(
  /const LICENSE = "[^"]+"/,
  `const LICENSE = "${license}"`,
);
fs.writeFileSync("src/flowplater.js", flowplaterContent);

console.log("License information updated successfully");
