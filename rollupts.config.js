import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default {
  input: [
    './src/ReactDataTable/ReactDataTable.tsx',
  ],
  output: [
    { file: "dist/index.d.ts", format: "es" }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    postcss(),
    dts(),
  ],
  external: ['react', 'react-dom'],
};