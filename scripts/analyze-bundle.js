const fs = require("fs");
const path = require("path");

function getFileSize(filepath) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzeBundles() {
  const bundles = [
    { name: "Development Bundle", path: "dist/flowplater.js" },
    { name: "Production Bundle", path: "dist/flowplater.min.js" },
    { name: "Original JS (old.js)", path: "old.js" },
  ];

  console.log("\n📊 Bundle Size Analysis");
  console.log("========================\n");

  let jsSize = 0;
  let prodSize = 0;

  bundles.forEach((bundle) => {
    const size = getFileSize(bundle.path);
    console.log(`${bundle.name.padEnd(25)}: ${formatBytes(size).padStart(10)}`);

    if (bundle.name.includes("Original JS")) {
      jsSize = size;
    } else if (bundle.name.includes("Production")) {
      prodSize = size;
    }
  });

  if (jsSize > 0 && prodSize > 0) {
    const difference = prodSize - jsSize;
    const percentChange = ((difference / jsSize) * 100).toFixed(2);

    console.log("\n📈 Comparison");
    console.log("=============");
    console.log(
      `Size difference: ${formatBytes(Math.abs(difference))} ${difference >= 0 ? "larger" : "smaller"}`,
    );
    console.log(`Percentage change: ${percentChange}%`);

    if (difference > 0) {
      console.log("\n⚠️  TypeScript bundle is larger. Consider:");
      console.log("   • Using more aggressive minification");
      console.log("   • Removing debug code in production");
      console.log("   • Tree-shaking unused exports");
      console.log("   • Using shorter variable names");
    } else {
      console.log("\n✅ TypeScript bundle is smaller - great job!");
    }
  }

  console.log("\n💡 Optimization Tips:");
  console.log("• Run `npm run build` for production optimized build");
  console.log("• Use `NODE_ENV=production` to enable production optimizations");
  console.log("• Consider externalizing large dependencies like Handlebars");
  console.log("• Use dynamic imports for optional features");
}

analyzeBundles();
