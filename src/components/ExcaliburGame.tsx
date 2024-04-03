"use client";
import React, { useRef } from "react";
import { useStartGame } from "./hooks/useStartGame";

const ExcaliburGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { myGame } = useStartGame(canvasRef);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={() => myGame?.start()}>Start</button>
      <button onClick={() => myGame?.stop()}>Stop</button>
    </div>
  );
};

export default ExcaliburGame;
