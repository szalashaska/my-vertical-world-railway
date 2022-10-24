import React, { useRef, useState, useEffect } from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const CanvasCreate = ({ height, width, url, setPath }) => {
  const [ctx, setCtx] = useState(null);
  const [canvasRect, setCanvasRect] = useState({
    deltaX: 0,
    deltaY: 0,
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [userPath, setUserPath] = useState([]);

  const canvasRef = useRef(null);

  const drawLine = (x, y) => {
    if (isMouseDown) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 8;
      ctx.lineJoin = "round";
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      setPosition({ x, y });
    }
  };

  const recordLine = (x, y) => {
    if (isMouseDown) {
      setUserPath([
        ...userPath,
        {
          x: ((x * 100) / width).toFixed(4),
          y: ((y * 100) / height).toFixed(4),
        },
      ]);
    }
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    setUserPath([]);
  };

  const handleMouseDown = (e) => {
    // Clear canvas and reset user path
    clearCanvas();
    setUserPath([]);
    setIsMouseDown(true);

    setPosition({
      x: e.pageX - canvasRect.deltaX,
      y: e.pageY - canvasRect.deltaY,
    });
  };

  const handleMouseMove = (e) => {
    drawLine(e.pageX - canvasRect.deltaX, e.pageY - canvasRect.deltaY);
    recordLine(e.pageX - canvasRect.deltaX, e.pageY - canvasRect.deltaY);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (userPath.length > 0) setPath(userPath);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const updateCanvasCoordinates = () => {
    // Updates Canvas coordinates, allows user to scroll and zoom image

    const boundingRect = canvasRef.current.getBoundingClientRect();
    let x;
    let y;
    // Image was not scorlled Y direction
    if (window.pageYOffset === 0) {
      y = boundingRect.top;
      // If Image was scrolled down
    } else {
      y = boundingRect.top + Math.round(window.pageYOffset);
    }
    // Image was not scorlled X direction
    if (window.pageXOffset === 0) {
      x = boundingRect.left;
      // If Image was scrolled aside
    } else {
      x = boundingRect.left + Math.round(window.pageXOffset);
    }

    setCanvasRect({
      deltaX: x,
      deltaY: y,
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
      updateCanvasCoordinates();
    }

    // Adds event listner, removes it after component unmounts.
    window.addEventListener("resize", updateCanvasCoordinates);
    return () => window.removeEventListener("resize", updateCanvasCoordinates);
  }, [url]);

  return (
    <StyledCanvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      height={height}
      width={width}
      url={url}
    />
  );
};

export default CanvasCreate;