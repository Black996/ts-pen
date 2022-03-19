import React, { useState, useRef, useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPkgPlugin } from "./plugins";
import CodeArea from "./components/CodeArea";

const App = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframe = useRef<any>();

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

    iframe.current.srcdoc = html;

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
    // setCode(res.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
  }

  function onChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(evt.target.value);
  }

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (evt)=>{
          try{
            eval(evt.data)
          }catch(error){
            const root = document.getElementById("root");
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
            console.error(error);
          }
        },false) 
      </script> 
    </body>
  </html>
  `;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Code Transpiler</h1>
      <CodeArea input={input} onClick={onClick} onChange={onChange} />
      <iframe
        title="Playground"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        style={{ width: "500px" }}
      />
    </div>
  );
};

export default App;
