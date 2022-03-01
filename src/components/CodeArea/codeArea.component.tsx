import React, { FC } from "react";

interface IProps {
  input: string;
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeArea: FC<IProps> = ({ input, onClick, onChange }) => {
  return (
    <div style={{ display: "flex" }}>
      <textarea
        value={input}
        onChange={onChange}
        style={{ height: "200px", width: "300px" }}
      />
      <button
        onClick={onClick}
        style={{ height: "50px", alignSelf: "center", marginLeft: "10px" }}
      >
        Transpile
      </button>
    </div>
  );
};

export default CodeArea;
