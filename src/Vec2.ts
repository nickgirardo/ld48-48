export type Vec2 = [number, number];

export const clone = (v: Vec2): Vec2 =>
    [...v];

export const add = (a: Vec2, b: Vec2): Vec2 =>
    [a[0] + b[0], a[1] + b[1]];

export const sub = (a: Vec2, b: Vec2): Vec2 =>
    [a[0] - b[0], a[1] - b[1]];

export const sMult = (s: number, v: Vec2): Vec2 =>
    [s * v[0], s * v[1]];

export const vMult = (a: Vec2, b: Vec2): Vec2 =>
    [a[0] * b[0], a[1] * b[1]];


