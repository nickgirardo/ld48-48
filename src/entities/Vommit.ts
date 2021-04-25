import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry } from '../CollisionBoundry';

enum Facing {
    LEFT,
    RIGHT,
}

export class Vommit implements Entity {
    kind = EntityTypes.VOMMIT;
    scene: Scene | undefined;

    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [64, 32];
    vel: Vec2.Vec2 = [0, 0];
    speed: number = 8;

    lifetime: number = 60;

    facing: Facing = Facing.LEFT;

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'purple');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        this.lifetime--;
        if (!this.lifetime)
            this.scene.removeEntity(this);

        // Clamp with x clearances (for ground collision)
        if (this.vel[0] > 0) {
            const posXClearance: number = ground.getPosXClearance(this.getCollisionBounds());
            if (!posXClearance)
                this.scene.removeEntity(this);

            this.vel[0] = Math.min(posXClearance, this.vel[0]);
        } else {
            const negXClearance: number = ground.getNegXClearance(this.getCollisionBounds());
            if (!negXClearance)
                this.scene.removeEntity(this);

            this.vel[0] = Math.max(negXClearance, this.vel[0]);
        }

        this.pos = Vec2.add(this.pos, this.vel);
    }

    getCollisionBounds(): CollisionBoundry {
        return [this.pos, Vec2.add(this.pos, this.size)];
    }
}


