const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const fs = require("fs");
const path = require("path");

// Read the license file
const licenseContent = fs.readFileSync(
  path.join(__dirname, "src", "licence.js"),
  "utf-8",
);

module.exports = {
  input: "src/core/FlowPlater.ts",
  output: {
    file: "dist/flowplater.js",
    format: "iife",
    name: "FlowPlater",
    banner: licenseContent,
    sourcemap: false,
    globals: {
      fs: "fs",
    },
    compact: true,
  },
  external: ["fs"],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false,
    annotations: false,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: false,
      removeComments: true,
      declaration: false,
      declarationMap: false,
    }),
    nodeResolve({
      preferBuiltins: false,
      browser: true,
      exportConditions: ["browser"],
    }),
    commonjs({
      include: ["node_modules/**"],
      ignoreDynamicRequires: true,
      transformMixedEsModules: true,
    }),
    terser({
      compress: {
        drop_console: false,
        drop_debugger: false,
        passes: 2,
        pure_getters: true,
        keep_fnames: true,
        keep_fargs: true,
        dead_code: true,
        unused: true,
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_proto: false,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        keep_fnames: true,
      },
      format: {
        comments: /@preserve/,
      },
    }),
  ],
};
