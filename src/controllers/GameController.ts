import { Actor } from "excalibur";

export const ballCollidingWithBrick = (ball: Actor, bricks: Actor[]) => {
  // On collision remove the brick, bounce the ball
  let colliding = false;
  ball.on("collisionstart", function (ev) {
    if (bricks.indexOf(ev.other) > -1) {
      // kill removes an actor from the current scene
      // therefore it will no longer be drawn or updated
      ev.other.kill();
    } 
    // reverse course after any collision
    // intersections are the direction body A has to move to not be clipping body B
    // `ev.content.mtv` "minimum translation vector" is a vector `normalize()` will make the length of it 1
    // `negate()` flips the direction of the vector
    var intersection = ev.contact.mtv.normalize();
    // Only reverse direction when the collision starts
    // Object could be colliding for multiple frames
    if (!colliding) {
      colliding = true;
      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        ball.vel.x *= -1;
      } else {
        ball.vel.y *= -1;
      }
    }
  });
  ball.on("collisionend", () => {
    // ball has separated from whatever object it was colliding with
    colliding = false;
  });
};
