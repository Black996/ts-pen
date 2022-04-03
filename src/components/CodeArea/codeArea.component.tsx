import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./codeArea.styles.css";

interface IProps {
  input: string;
  initialValue: string;
  onChange(val: string): void;
}

const CodeArea: FC<IProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const onFormatClick = () => {
    const unformattedCode = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        semi: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        language="javascript"
        value={initialValue}
        theme="dark"
        height="100%"
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
    </div>
  );
};

export default CodeArea;
