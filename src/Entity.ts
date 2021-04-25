import { Scene } from './Scene';
import { Vec2 } from './Vec2';
import { CollisionBoundry } from './CollisionBoundry';

export interface Entity {
    scene: Scene | undefined;
    render: () => void;
    update: () => void;
    getCollisionBounds: () => CollisionBoundry;
    kind: EntityTypes;
    pos: Vec2;
}

export enum EntityTypes {
    // The player character
    CHAR,

    // Enemies
    BANANA,
    TOMATO,

    // Projectiles
    VOMMIT,
    NAIL,
}
