const fs = require("fs");
const https = require("https");
const path = require("path");

const libraryFilePath = path.join(__dirname, "dist", "flowplater.js");
const licenceFilePath = path.join(__dirname, "src", "licence.js");
const outputFilePath = path.join(__dirname, "dist", "flowplater_bundled.js");

const handlebarsUrl =
  "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js";
const htmxUrl = "https://cdn.jsdelivr.net/npm/htmx.org@2/dist/htmx.js";
const htmxLicencePath = path.join(__dirname, "src", "licence_htmx.js");

function fetchUrl(url, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) {
      reject(new Error("Too many redirects"));
      return;
    }

    let data = "";
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          // Handle redirect
          return resolve(fetchUrl(res.headers.location, maxRedirects - 1));
        }

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", (err) => reject(err));
  });
}

async function concatenateFiles() {
  try {
    const handlebarsContent = await fetchUrl(handlebarsUrl);
    const htmxContent = await fetchUrl(htmxUrl);
    const libraryContent = fs.readFileSync(libraryFilePath, "utf-8");
    const licenceContent = fs.readFileSync(licenceFilePath, "utf-8");
    const htmxLicenceContent = fs.readFileSync(htmxLicencePath, "utf-8");

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

    // Combine content with license first, then webpack bootstrap, then the rest
    const combinedContent =
      licenceContent +
      "\n" +
      webpackBootstrap +
      handlebarsContent +
      "\n" +
      htmxLicenceContent +
      "\n" +
      htmxContent +
      "\n" +
      libraryContentWithoutBootstrap;

    fs.writeFileSync(outputFilePath, combinedContent);
    console.log("Files concatenated successfully!");
  } catch (error) {
    console.error("Error concatenating files:", error);
  }
}

concatenateFiles();
