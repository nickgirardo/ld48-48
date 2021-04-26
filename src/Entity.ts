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

    // The index of the entity in its scene's entity list
    // This is used so that different entities animations don't line up
    index: number;

    // NOTE moreso that just if the entity is alive (for instance nails aren't)
    // but if they are active
    // This allows us to easily filter corpses out of collision detection
    alive: boolean;
}

export enum EntityTypes {
    // The player character
    CHAR,

    // Enemies
    BANANA,
    TOMATO,

    // Projectiles/ Weapons
    VOMMIT,
    NAIL,
    SHOVEL,
}
