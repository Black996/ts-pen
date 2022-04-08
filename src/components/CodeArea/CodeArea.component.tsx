import React from "react";
import "./CodeArea.styles.css";
import esBuildBundle from "../../bundler";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";

const InteractiveCodeEditor: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let timerId = setTimeout(async () => {
      const outputCode = await esBuildBundle(input);
      if (outputCode) {
        setCode(outputCode.code);
        setError(outputCode.error);
      }
    }, 750);

    return () => clearTimeout(timerId);
  }, [input]);

  function onChange(value: string) {
    setInput(value);
  }

  return (
    <Resizable axis="y">
      <div className="main">
        <Resizable axis="x">
          <CodeEditor
            initialValue='const start = "hello world!";'
            input={input}
            onChange={onChange}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default InteractiveCodeEditor;
