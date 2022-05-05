import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.styles.css";

interface IResizable extends Omit<ResizableBoxProps, "height" | "width"> {
  height?: number;
  width?: number;
}

const Resizable: React.FC<IResizable> = ({ axis, children }) => {
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth * 0.75);

  React.useEffect(() => {
    // let timerId: NodeJS.Timeout;

    function listener() {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);

      if (window.innerWidth * 0.75 < width) {
        setWidth(window.innerWidth * 0.75);
      }
    }

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [width]);

  function determinePropsFromAxis() {
    let resizableProps: ResizableBoxProps;

    if (axis === "x") {
      resizableProps = {
        className: "resize-horizontal",
        width,
        height: Infinity,
        axis,
        resizeHandles: ["e"],
        maxConstraints: [innerWidth * 0.75, Infinity],
        minConstraints: [innerWidth * 0.2, Infinity],
        onResizeStop: (evt, data) => setWidth(data.size.width),
      };
    } else {
      resizableProps = {
        width: Infinity,
        height: 300,
        axis,
        resizeHandles: ["s"],
        maxConstraints: [Infinity, innerHeight * 0.9],
        minConstraints: [Infinity, 50],
      };
    }

    return resizableProps;
  }

  return <ResizableBox {...determinePropsFromAxis()}>{children}</ResizableBox>;
};

export default Resizable;
