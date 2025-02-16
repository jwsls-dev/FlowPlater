const { nodeResolve } = require("@rollup/plugin-node-resolve");

module.exports = {
  input: "src/core/FlowPlater.js",
  output: {
    file: "dist/flowplater.js",
    format: "esm",
    banner: "/**!\n@preserve FlowPlater starts here \n*/",
  },
  plugins: [nodeResolve()],
};
