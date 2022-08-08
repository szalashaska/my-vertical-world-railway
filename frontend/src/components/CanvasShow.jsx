import React, { useRef, useState, useEffect } from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const CanvasShow = ({ height, width, url, routePath }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  let position = {
    x: routePath[0].x,
    y: routePath[0].y,
  };

  const drawLine = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    position = { x, y };
  };

  const drawUsersLine = (path) => {
    path.map((element) => {
      drawLine(element.x, element.y);
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      drawUsersLine(routePath);
    }
  }, [ctx]);

  return (
    <>
      <StyledCanvas
        ref={canvasRef}
        height={height}
        width={width}
        url={`${url}`}
      />
    </>
  );
};

export default CanvasShow;