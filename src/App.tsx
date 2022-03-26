import React from "react";
import esBuildBundle from "./bundler";
import CodeArea from "./components/CodeArea";
import Preview from "./components/Preview";

const App = () => {
  const [input, setInput] = React.useState("");
  const [code, setCode] = React.useState("");

  async function onClick() {
    const outputCode = await esBuildBundle(input);
    setCode(outputCode);
    if (code) return code;
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
