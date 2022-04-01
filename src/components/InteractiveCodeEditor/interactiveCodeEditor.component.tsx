import React from "react";
import "./interactiveCodeEditor.styles.css";
import esBuildBundle from "../../bundler";
import CodeArea from "../CodeArea";
import Preview from "../Preview";
import Resizable from "../Resizable";

const InteractiveCodeEditor: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [code, setCode] = React.useState("");

  async function onClick() {
    const outputCode = await esBuildBundle(input);
    setCode(outputCode);
  }

  function onChange(value: string) {
    setInput(value);
  }

  return (
    <Resizable>
      <div className="main">
        {/* <h1>Code Transpiler</h1> */}
        <CodeArea
          initialValue='const start = "hello world!";'
          input={input}
          onClick={onClick}
          onChange={onChange}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default InteractiveCodeEditor;
