const { nodeResolve } = require("@rollup/plugin-node-resolve");

module.exports = {
  input: "src/core/FlowPlater.js",
  output: {
    file: "dist/flowplater.js",
    format: "iife",
    name: "FlowPlater",
    banner: "/**!\n@preserve FlowPlater starts here \n*/",
  },
  plugins: [nodeResolve()],
};
