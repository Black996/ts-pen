import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPkgPlugin } from "./plugins";

let bundler: esbuild.Service;

async function esBuildBundle(rawCode: string) {
  if (!bundler) {
    bundler = await esbuild.startService({
      worker: true,
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  const output = await bundler.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPkgPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return output.outputFiles[0].text;
}

export default esBuildBundle;
