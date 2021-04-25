import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry, checkOverlap } from '../CollisionBoundry';

export class Char implements Entity {
    scene: Scene | undefined;
    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [48, 92];
    vel: Vec2.Vec2 = [0, 0];
    friction: Vec2.Vec2 =  [0.6, 1];
    speed: number = 4;

    // If this is greater than 0, the player cannot move
    // Counted down on each frame
    invincibility: number = 0;

    // If this is greater than 0, the player cannot move
    // Counted down on each frame
    stun: number = 0;

    // TODO this might be helpful
    kind = EntityTypes.CHAR;

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'darkgreen');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        // Reduce counters for stun and invincibility
        if (this.invincibility)
            this.invincibility--;

        if (this.stun)
            this.stun--;

        const takeHit = (e: Entity) => {
            // If the player has recently taken a hit, ignore this
            if (this.invincibility)
                return;

            // TODO lose health
            this.vel = this.pos[0] > e.pos[0] ? [30, -20] : [-30, -20];
            this.invincibility = 120;
            this.stun = 30;
        };

        // Check for collisions
        const a = this.scene.entities
            .filter(e => e !== this)
            .filter(e => checkOverlap(e.getCollisionBounds(), this.getCollisionBounds()))
            .forEach(e => {
                switch (e.kind) {
                    case EntityTypes.CHAR:
                        return;
                    case EntityTypes.BANANA:
                        // TODO lose health
                        takeHit(e);
                        return;
                }
            });

        // Normal gravity
        const fGravity: Vec2.Vec2 = [0, 1.5];
        // Gravity if the player holds jump (because video games)
        const fGravityJumping: Vec2.Vec2 = [0, 1.22];
        this.vel = Vec2.add(this.vel, keysDown[Keys.JUMP] ? fGravityJumping : fGravity);

        // The player can only move or jump if not stunned
        if (!this.stun) {
            if (keysDown[Keys.LEFT])
                this.vel = Vec2.add(this.vel, [-this.speed, 0]);
            if (keysDown[Keys.RIGHT])
                this.vel = Vec2.add(this.vel, [this.speed, 0]);

            // If the character is grounded they can jump
            const fJump: number = -20;
            const grounded: boolean = ground.getPosYClearance(this.getCollisionBounds()) === 0;
            if (grounded && keysDown[Keys.JUMP])
                this.vel[1] = Math.min(this.vel[1], fJump);
        }

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
