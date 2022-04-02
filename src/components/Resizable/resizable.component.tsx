import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.styles.css";

interface IResizable extends Omit<ResizableBoxProps, "height" | "width"> {
  height?: number;
  width?: number;
}

const Resizable: React.FC<IResizable> = ({ axis, children }) => {
  let resizableProps: ResizableBoxProps;

  if (axis === "x") {
    resizableProps = {
      className: "resize-horizontal",
      width: window.innerWidth * 0.75,
      height: Infinity,
      axis,
      resizeHandles: ["e"],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      axis,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
