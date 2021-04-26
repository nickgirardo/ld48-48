import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry } from '../CollisionBoundry';
import { Images } from '../util/Image';

enum Facing {
    LEFT,
    RIGHT,
}

export class Nail implements Entity {
    kind = EntityTypes.NAIL;
    scene: Scene | undefined;
    index: number = 0;

    alive: boolean = true;

    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [48, 24];
    vel: Vec2.Vec2 = [0, 0];
    speed: number = 8;

    lifetime: number = 90;

    facing: Facing = Facing.LEFT;

    render() {
        const img = this.facing === Facing.LEFT ?
            window.images[Images.NAIL_LEFT] : 
            window.images[Images.NAIL_RIGHT];

        window.renderer.drawImage(img, this.pos, this.size);
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        // TODO should nails have lifetimes?
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


