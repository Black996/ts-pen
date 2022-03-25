import React, { FC } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface IProps {
  input: string;
  initialValue: string;
  onClick(evt: React.MouseEvent<HTMLButtonElement>): void;
  onChange(val: string): void;
}

const CodeArea: FC<IProps> = ({ initialValue, input, onClick, onChange }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  return (
    <>
      <MonacoEditor
        language="javascript"
        value={initialValue}
        width="50%"
        height="200px"
        theme="dark"
        editorDidMount={onEditorDidMount}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <button onClick={onClick} style={{ height: "50px", margin: "10px" }}>
        Transpile
      </button>
    </>
  );
};

export default CodeArea;
