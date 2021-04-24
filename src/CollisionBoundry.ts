import * as Vec2 from './Vec2';

export type CollisionBoundry = [Vec2.Vec2, Vec2.Vec2];

export const checkOverlap = (a: CollisionBoundry, b: CollisionBoundry): boolean =>
    (a[0][0] < b[1][0]) &&
    (b[0][0] < a[1][0]) &&
    (a[0][1] < b[1][1]) &&
    (b[0][1] < a[1][1]);

export const drawCollisionBounds = (a: CollisionBoundry) => {
    const size = Vec2.sub(a[1], a[0]);

    window.ctx.fillStyle = 'red';
    window.ctx.fillRect(a[0][0], a[0][1], size[0], size[1]);
};
