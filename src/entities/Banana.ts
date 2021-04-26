import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry, checkOverlap } from '../CollisionBoundry';

enum BananaAnim {
    IDLE,
    ANTICIPATION,
    JUMPING,
    FALLING,
    HURT,
    DEAD,
}

enum Facing {
    LEFT,
    RIGHT,
}

export class Banana implements Entity {
    kind = EntityTypes.BANANA;
    scene: Scene | undefined;
    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [48, 92];
    vel: Vec2.Vec2 = [0, 0];
    friction: Vec2.Vec2 =  [0.3, 1];
    speed: number = 8;

    alive: boolean = true;
    health: number = 5;

    lastJump: Facing = Facing.LEFT;
    lastJumpFrame: number = 0;
    lastGroundedFrame: number = -1;

    animState: BananaAnim = BananaAnim.IDLE;

    invincibility: number = 0;
    frameStunned: number = 0;

    // How long an enemy's corpse will remain after death
    despawnCounter: number = 120;

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'darkred');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        const takeHit = (e: Entity, damage: number) => {
            // If the player has recently taken a hit, ignore this
            if (this.invincibility)
                return;

            this.vel = this.pos[0] > e.pos[0] ? [30, -20] : [-30, -20];
            this.invincibility = 60;
            this.frameStunned = window.frame;

            this.health -= damage;
            if (this.health <= 0)
                this.alive = false;
        };

        // Gravity
        // TODO should this be stored somewhere so we don't accidentally give
        // different entities different gravities?
        const fGravity: Vec2.Vec2 = [0, 1.5];
        this.vel = Vec2.add(this.vel, fGravity);

        const fJump: Vec2.Vec2 = [0, -25];
        const grounded: boolean = ground.getPosYClearance(this.getCollisionBounds()) === 0;

        if (this.alive) {
            // Check for collisions
            // Only interested in collisions with player's attacks (nail, shovel)
            const a = this.scene.entities
                .filter(e => [EntityTypes.NAIL, EntityTypes.SHOVEL].includes(e.kind))
                .filter(e => checkOverlap(e.getCollisionBounds(), this.getCollisionBounds()))
                .forEach(e => {
                    switch (e.kind) {
                        case EntityTypes.NAIL:
                            takeHit(e, 1);
                            this.scene!.removeEntity(e);
                            return;
                        case EntityTypes.SHOVEL:
                            takeHit(e, 2);
                            return;
                    }
                });

            if (this.invincibility)
                this.invincibility--;

            if (grounded) {
                // The banana has just landed
                if (this.lastGroundedFrame < this.lastJumpFrame) {
                    this.animState = BananaAnim.IDLE;
                    this.lastGroundedFrame = window.frame;
                    this.lastJump = this.lastJump === Facing.LEFT ?
                        Facing.RIGHT :
                        Facing.LEFT;
                }

                // About to jump, anticipation here
                if (window.frame - this.lastGroundedFrame > 30 && window.frame - this.frameStunned > 105)
                    this.animState = BananaAnim.ANTICIPATION;

                // Jump here
                if (window.frame - this.lastGroundedFrame > 45 && window.frame - this.frameStunned > 120) {
                    this.animState = BananaAnim.JUMPING;
                    this.lastJumpFrame = window.frame;
                    this.vel = Vec2.add(this.vel, fJump);
                }
            } else {
                // The banana is not grounded
                if (this.lastJump === Facing.LEFT) {
                    this.vel = Vec2.add(this.vel, [this.speed, 0]);
                } else {
                    this.vel = Vec2.add(this.vel, [-this.speed, 0]);
                }

                // Check if we need to set the anim state to falling
                if (this.vel[1] > 0)
                    this.animState = BananaAnim.FALLING;
            }
        } else {
            this.animState = BananaAnim.DEAD;
            this.despawnCounter--;

            if (!this.despawnCounter)
                this.scene.removeEntity(this);
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
