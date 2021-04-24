import { Entity } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import {
    CollisionBoundry,
    drawCollisionBounds,
    checkOverlap,
} from '../CollisionBoundry';

export class Char extends Entity {
    scene: Scene | undefined;
    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [32, 64];
    vel: Vec2.Vec2 = [0, 0];

    // TODO this might be helpful
    // kind = EntityTypes.Char;

    render() {
        drawCollisionBounds(this.getCollisionBounds());
    }

    update() {
        // ground = this.scene.ground;
        // const posXClearance: number = ground.getPosXClearance(this);
        const posXClearance: number = 0;
        const negXClearance: number = 0;
        const posYClearance: number = 0;
        const negYClearance: number = 0;

        this.vel = [0, 0];

        if (keysDown[Keys.LEFT])
            this.vel = Vec2.add(this.vel, [-1, 0]);
        if (keysDown[Keys.RIGHT])
            this.vel = Vec2.add(this.vel, [1, 0]);

        // TODO please note the clearances here
        this.pos = Vec2.add(this.pos, this.vel);
    }

    getCollisionBounds(): CollisionBoundry {
        return [this.pos, Vec2.add(this.pos, this.size)];
    }
}
