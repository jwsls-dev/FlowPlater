const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "src/core/FlowPlater.ts",
  output: {
    file: "dist/flowplater.js",
    format: "iife",
    name: "FlowPlater",
    banner: "/**!\n@preserve FlowPlater starts here \n*/",
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
