import { Engine } from "excalibur";

export class Game {
  private static instance: Engine;

  private constructor() {}

  public static getInstance(canvas: HTMLCanvasElement | undefined): Engine {
    if (!Game.instance) {
      this.instance = new Engine({
        canvasElement: canvas,
        height: 600,
        width: 800,
      });
    }
    return Game.instance;
  }
}
