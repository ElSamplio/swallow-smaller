import { Actor, CollisionType, Color, Engine, Vector, vec } from "excalibur";

export const createAndAddBall = (game: Engine): Actor => {
  // Create a ball at pos (100, 300) to start
  const ball = new Actor({
    x: 100,
    y: 300,
    // Use a circle collider with radius 10
    radius: 10,
    // Set the color
    color: Color.Red,
  });
  // Start the serve after a second
  const BALL_SPEED = 350;
  const ballSpeed = vec(BALL_SPEED, BALL_SPEED);
  setTimeout(() => {
    // Set the velocity in pixels per second
    ball.vel = ballSpeed;
  }, 1000);
  // Set the collision Type to passive
  // This means "tell me when I collide with an emitted event, but don't let excalibur do anything automatically"
  ball.body.collisionType = CollisionType.Passive;
  // Other possible collision types:
  // "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
  // "ex.CollisionType.Active - this means participate and let excalibur resolve the positions/velocities of actors after collision"
  // "ex.CollisionType.Fixed - this means participate, but this object is unmovable"
  // Add the ball to the current scene
  postUpdateBall(game, ball, ballSpeed);
  game.add(ball);
  return ball;
};

export const postUpdateBall = (
  game: Engine,
  ball: Actor,
  ballSpeed: Vector
) => {
  // Wire up to the postupdate event
  ball.on("postupdate", () => {
    // If the ball collides with the left side
    // of the screen reverse the x velocity
    if (ball.pos.x < ball.width / 2) {
      ball.vel.x = ballSpeed.x;
    }
    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (ball.pos.x + ball.width / 2 > game.drawWidth) {
      ball.vel.x = ballSpeed.x * -1;
    }
    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (ball.pos.y < ball.height / 2) {
      ball.vel.y = ballSpeed.y;
    }
  });
};
