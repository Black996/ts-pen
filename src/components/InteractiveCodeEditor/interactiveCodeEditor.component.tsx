import React from "react";
import "./interactiveCodeEditor.styles.css";
import esBuildBundle from "../../bundler";
import CodeArea from "../CodeArea";
import Preview from "../Preview";
import Resizable from "../Resizable";

const InteractiveCodeEditor: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    let timerId = setTimeout(async () => {
      const outputCode = await esBuildBundle(input);
      setCode(outputCode);
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
          <CodeArea
            initialValue='const start = "hello world!";'
            input={input}
            onChange={onChange}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default InteractiveCodeEditor;
