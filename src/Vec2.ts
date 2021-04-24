export type Vec2 = [number, number];

export const add = (a: Vec2, b: Vec2): Vec2 =>
    [a[0] + b[0], a[1] + b[1]];

export const sub = (a: Vec2, b: Vec2): Vec2 =>
    [a[0] - b[0], a[1] - b[1]];
