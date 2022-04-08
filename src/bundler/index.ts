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
  try {
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

    return {
      code: output.outputFiles[0].text,
      error: "",
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        code: "",
        error: error.message,
      };
  }
}

export default esBuildBundle;
