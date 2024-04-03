import { useEffect, useState } from "react";
import { Engine } from "excalibur";
import { createAndAddPaddle } from "@/actors/Paddle";
import { createAndAddBall } from "@/actors/Ball";
import { createAndAddBricks } from "@/actors/Bricks";
import { ballCollidingWithBrick } from "@/controllers/GameController";
import { Game } from "@/controllers/Game";

export const useStartGame = (canvasRef: any) => {
  const [myGame, setMyGame] = useState<Engine>();

  useEffect(() => {
    console.log("Calling effect");
    const game = new Engine({
      canvasElement: canvasRef?.current || undefined,
      width: 800,
      height: 600,
    });
    setMyGame(game);
    // Game.getInstance(canvasRef?.current || undefined);

    const paddle = createAndAddPaddle(game);

    // Add a mouse move listener
    game.input.pointers.primary.on("move", (evt) => {
      paddle.pos.x = evt.worldPos.x;
    });

    const ball = createAndAddBall(game);
    const bricks = createAndAddBricks(game);
    ballCollidingWithBrick(ball, bricks, game);
    // Loss condition
    ball.on("exitviewport", () => {
      alert("You lost!");
      game.stop();
    });

    if (bricks.length === 0) {
      alert("You won!!!");
      game.stop();
    }

    game.start();

    return () => {
      game.stop();
    };
  }, [canvasRef]);

  return { myGame };
};
