import React, { FC } from "react";
import MonacoEditor from "@monaco-editor/react";

interface IProps {
  input: string;
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeArea: FC<IProps> = ({ input, onClick, onChange }) => {
  return (
    <>
      <MonacoEditor
        language="javascript"
        width="50%"
        height="200px"
        theme="dark"
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
