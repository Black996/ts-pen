import React, { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface IProps {
  input: string;
  initialValue: string;
  onClick(evt: React.MouseEvent<HTMLButtonElement>): void;
  onChange(val: string): void;
}

const CodeArea: FC<IProps> = ({ initialValue, input, onClick, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const onFormatClick = () => {
    const unformattedCode = editorRef.current.getModel().getValue();

    const formatted = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      semi: true,
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <>
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
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
