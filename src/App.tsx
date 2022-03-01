import React, { useState, useRef, useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPkgPlugin } from "./plugins";
import CodeArea from "./components/CodeArea";

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
        plugins: [
            unpkgPathPlugin(),
            fetchPkgPlugin(input)
                 ],
        define:{
            'process.env.NODE_ENV': '"production"',
            global:'window'
        }
    });
    console.log(res);
    setCode(res.outputFiles[0].text);
  }

  function onChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(evt.target.value);
  }

  return (
    <div>
      <h1>Code Transpiler</h1>
      <CodeArea input={input} onClick={onClick} onChange={onChange} />
      <pre>{code}</pre>
    </div>
  );
};

export default App;
