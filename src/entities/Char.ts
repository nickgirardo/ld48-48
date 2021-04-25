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
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        this.vel = [0, 0];

        if (keysDown[Keys.LEFT])
            this.vel = Vec2.add(this.vel, [-3, 0]);
        if (keysDown[Keys.RIGHT])
            this.vel = Vec2.add(this.vel, [3, 0]);

        // Clamp with x clearances (for ground collision)
        if(this.vel[0] > 0) {
            const posXClearance: number = ground.getPosXClearance(this.getCollisionBounds());
            this.vel[0] = Math.min(posXClearance, this.vel[0]);
        } else {
            const negXClearance: number = ground.getNegXClearance(this.getCollisionBounds());
            this.vel[0] = Math.max(negXClearance, this.vel[0]);
        }

        // Clamp with y clearances (for ground collision)
        if(this.vel[1] > 0) {
            const posYClearance: number = ground.getPosYClearance(this.getCollisionBounds());
            this.vel[1] = Math.min(posYClearance, this.vel[1]);
        } else {
            const negYClearance: number = ground.getNegYClearance(this.getCollisionBounds());
            this.vel[1] = Math.max(negYClearance, this.vel[1]);
        }

        this.pos = Vec2.add(this.pos, this.vel);
    }

    getCollisionBounds(): CollisionBoundry {
        return [this.pos, Vec2.add(this.pos, this.size)];
    }
}
