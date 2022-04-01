import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.styles.css";

interface IResizable extends Omit<ResizableBoxProps, "height" | "width"> {
  height?: number;
  width?: number;
}

const Resizable: React.FC<IResizable> = ({
  height = 300,
  width = Infinity,
  axis,
  resizeHandles = ["s"],
  children,
}) => {
  return (
    <ResizableBox
      width={width}
      height={height}
      axis={axis}
      resizeHandles={resizeHandles}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
