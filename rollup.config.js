import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import { dirname } from "path";

export default ["content_scripts/content.ts"].map(filename => ({
  input: [`src/${filename}`],
  plugins: [typescript(), resolve(), commonjs()],
  output: {
    dir: `extension/${dirname(filename)}`,
    format: "esm"
  }
}));
