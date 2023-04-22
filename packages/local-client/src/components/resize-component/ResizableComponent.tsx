import React, { useEffect, useRef, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const getResizableProps = (
  direction: "horizontal" | "vertical",
  innerWidth: number,
  innerHeight: number,
  width: number,
  setWidth: any
): ResizableBoxProps => {
  if (direction === "vertical") {
    return {
      className: "resize-vertical",
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 300],
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  }
  return {
    className: "resize-horizontal",
    maxConstraints: [innerWidth * 0.75, Infinity],
    minConstraints: [innerWidth * 0.2, Infinity],
    width,
    height: Infinity,
    resizeHandles: ["e"],
    onResizeStop: (event, data) => {
      setWidth(data.size.width);
    },
  };
};

const ResizableComponent: React.FC<resizableProps> = ({
  direction,
  children,
}): JSX.Element => {
  const debounceTimer = useRef<any>(null);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.7);
  useEffect(() => {
    const resizeHandler = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [width]);
  return (
    <ResizableBox
      {...getResizableProps(
        direction,
        innerWidth,
        innerHeight,
        width,
        setWidth
      )}
    >
      {children}
    </ResizableBox>
  );
};

export default ResizableComponent;
