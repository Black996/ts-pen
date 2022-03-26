import React, { useState, useRef, useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPkgPlugin } from "./plugins";
import CodeArea from "./components/CodeArea";
import Preview from "./components/Preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  useEffect(() => {
    (async function () {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
      });
    })();
  }, []);

  async function onClick() {
    if (!ref.current) {
      return;
    }

    const res = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPkgPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    setCode(res.outputFiles[0].text);
  }

  function onChange(value: string) {
    setInput(value);
  }

  return (
    <div>
      <h1>Code Transpiler</h1>
      <CodeArea
        initialValue='const start = "hello world!";'
        input={input}
        onClick={onClick}
        onChange={onChange}
      />
      <Preview code={code} />
    </div>
  );
};

export default App;
