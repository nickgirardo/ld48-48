import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry } from '../CollisionBoundry';

import { Char } from './Char';

export class Shovel implements Entity {
    kind = EntityTypes.SHOVEL;
    scene: Scene | undefined;

    alive: boolean = true;

    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [64, 32];
    offset: Vec2.Vec2 = [0, 0];

    char: Char;

    lifetime: number = 20;

    constructor(char: Char) {
        this.char = char;
    }

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'green');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        this.lifetime--;
        if (!this.lifetime)
            this.scene.removeEntity(this);

        this.pos = Vec2.add(this.char.pos, this.offset);
    }

    getCollisionBounds(): CollisionBoundry {
        return [this.pos, Vec2.add(this.pos, this.size)];
    }
}



