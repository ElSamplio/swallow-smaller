import { Actor, CollisionType, Color, Engine } from "excalibur";

export const createAndAddBricks = (game: Engine): Actor[] => {
  // Build Bricks
  // Padding between bricks
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 20; // y-offset
  const columns = 5;
  const rows = 3;
  const brickColor = [Color.Violet, Color.Orange, Color.Yellow];
  // Individual brick width with padding factored in
  const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
  const brickHeight = 30; // px
  const bricks: Actor[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      bricks.push(
        new Actor({
          x: xoffset + i * (brickWidth + padding) + padding,
          y: yoffset + j * (brickHeight + padding) + padding,
          width: brickWidth,
          height: brickHeight,
          color: brickColor[j % brickColor.length],
        })
      );
    }
  }
  bricks.forEach(function (brick) {
    // Make sure that bricks can participate in collisions
    brick.body.collisionType = CollisionType.Active;
    // Add the brick to the current scene to be drawn
    game.add(brick);
  });
  return bricks;
};
