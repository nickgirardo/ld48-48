import { Entity } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry } from '../CollisionBoundry';

export class Char extends Entity {
    scene: Scene | undefined;
    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [32, 64];
    vel: Vec2.Vec2 = [0, 0];
    friction: Vec2.Vec2 =  [0.35, 1];
    speed: number = 8;

    // TODO this might be helpful
    // kind = EntityTypes.CHAR;

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'darkgreen');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        // Normal gravity
        const fGravity: Vec2.Vec2 = [0, 1.5];
        // Gravity if the player holds jump (because video games)
        const fGravityJumping: Vec2.Vec2 = [0, 1.22];
        this.vel = Vec2.add(this.vel, keysDown[Keys.JUMP] ? fGravityJumping : fGravity);

        if (keysDown[Keys.LEFT])
            this.vel = Vec2.add(this.vel, [-this.speed, 0]);
        if (keysDown[Keys.RIGHT])
            this.vel = Vec2.add(this.vel, [this.speed, 0]);

        // If the character is grounded they can jump
        const fJump: Vec2.Vec2 = [0, -20];
        const grounded: boolean = ground.getPosYClearance(this.getCollisionBounds()) === 0;
        if (grounded && keysDown[Keys.JUMP])
            this.vel = Vec2.add(this.vel, fJump);


        // Friction
        this.vel = Vec2.vMult(this.vel, this.friction);

        // Clamp with x clearances (for ground collision)
        if (this.vel[0] > 0) {
            const posXClearance: number = ground.getPosXClearance(this.getCollisionBounds());
            this.vel[0] = Math.min(posXClearance, this.vel[0]);
        } else {
            const negXClearance: number = ground.getNegXClearance(this.getCollisionBounds());
            this.vel[0] = Math.max(negXClearance, this.vel[0]);
        }

        // Clamp with y clearances (for ground collision)
        if (this.vel[1] > 0) {
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
