const fs = require("fs");
const path = require("path");

const libraryFilePath = path.join(__dirname, "dist", "flowplater.js");
const licenceFilePath = path.join(__dirname, "src", "licence.js");
const outputFilePath = path.join(__dirname, "dist", "flowplater_bundled.js");

async function concatenateFiles() {
  try {
    const libraryContent = fs.readFileSync(libraryFilePath, "utf-8");
    const licenceContent = fs.readFileSync(licenceFilePath, "utf-8");

    // Extract the webpack bootstrap code from libraryContent
    const webpackBootstrapMatch = libraryContent.match(
      /(function webpackUniversalModuleDefinition.*?return \/\/ webpackBootstrap\n)/s,
    );
    const webpackBootstrap = webpackBootstrapMatch
      ? webpackBootstrapMatch[1]
      : "";
    const libraryContentWithoutBootstrap = libraryContent.replace(
      webpackBootstrap,
      "",
    );

    const combinedContent =
      licenceContent + "\n" + webpackBootstrap + libraryContentWithoutBootstrap;

    fs.writeFileSync(outputFilePath, combinedContent);
    console.log("Files concatenated successfully!");
  } catch (error) {
    console.error("Error concatenating files:", error);
  }
}

concatenateFiles();
