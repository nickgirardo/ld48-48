import { Entity, EntityTypes } from '../Entity';

import { Images } from '../util/Image';

import { Scene } from '../Scene';
import { Vommit } from './Vommit';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry, checkOverlap } from '../CollisionBoundry';

import { AnimateTomato, Anims, TomatoAnim } from '../Animation';

enum Facing {
    LEFT = 'left',
    RIGHT = 'right',
}

export class Tomato implements Entity {
    kind = EntityTypes.TOMATO;
    scene: Scene | undefined;
    index: number = 0;

    health: number = 5;
    alive: boolean = true;

    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [64, 64];
    vel: Vec2.Vec2 = [0, 0];
    friction: Vec2.Vec2 =  [0.3, 1];
    speed: number = 8;

    frameEnteredRange: number = 0;
    frameLastFire: number = 0;

    animState: TomatoAnim = TomatoAnim.IDLE;

    facing: Facing = Facing.LEFT;
    inRange: boolean = false;

    frameStunned: number = 0;
    invincibility: number = 0;

    // How many frames the enemies corpse will hang around for after death
    despawnCounter: number = 180;

    render() {
        let color = this.invincibility ? 'pink' : 'darkred';
        // window.renderer.debug(this.getCollisionBounds(), color);

        AnimateTomato(this);

    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        const char = this.scene.entities.find(e => e.kind === EntityTypes.CHAR);

        const takeHit = (e: Entity, damage: number) => {
            // If the player has recently taken a hit, ignore this
            if (this.invincibility)
                return;

            // TODO lose health
            this.vel = this.pos[0] > e.pos[0] ? [30, -20] : [-30, -20];
            this.invincibility = 60;
            this.frameStunned = window.frame;

            this.health -= damage;
            if (this.health <= 0) {
                this.alive = false;
            }
        };

        const fire = () => {
            // This should never happen
            if(!this.scene)
                return;

            this.frameLastFire = window.frame;

            const vommit = new Vommit();
            vommit.pos = Vec2.clone(this.pos);
            vommit.pos[1] = vommit.pos[1] + 20;

            vommit.vel = this.facing === Facing.LEFT ? [-vommit.speed, 0] : [vommit.speed, 0];
            vommit.facing = this.facing;
            this.scene.addEntity(vommit);
        }


        if (this.alive) {
            this.animState = TomatoAnim.IDLE;

            // If the tomato has fired recently, animate him as such
            if (window.frame - this.frameLastFire < 20)
                this.animState = TomatoAnim.SPITTING;

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

            if (char) {
                if (char.pos[0] > this.pos[0])
                    this.facing = Facing.RIGHT;
                else
                    this.facing = Facing.LEFT;

                const diff = Vec2.sub(char.pos, this.pos);

                const isInRange = Math.abs(diff[0]) < 240 && diff[1] < 120 && diff[1] > -200;

                // Are we just now entering the range?
                if (!this.inRange && isInRange)
                    this.frameEnteredRange = window.frame;

                this.inRange = isInRange;
            }
            // Fire a shot if in range for at least 30 frames
            if (
                char &&
                char.alive &&
                this.inRange &&
                this.frameLastFire + 30 < window.frame &&
                this.frameStunned + 55 < window.frame
            )
                this.animState = TomatoAnim.ANTICIPATION;

            if (
                char &&
                char.alive &&
                this.inRange &&
                this.frameEnteredRange + 30 < window.frame &&
                this.frameLastFire + 75 < window.frame &&
                this.frameStunned + 100 < window.frame
            )
                fire();

            if (window.frame - this.frameStunned < 30)
                this.animState = TomatoAnim.HURT;

        } else {
            // The tomato is dead :)
            this.animState = TomatoAnim.DEAD;
            this.despawnCounter--;

            if (!this.despawnCounter)
                this.scene.removeEntity(this);
        }


        // Gravity
        // TODO should this be stored somewhere so we don't accidentally give
        // different entities different gravities?
        const fGravity: Vec2.Vec2 = [0, 1.5];
        this.vel = Vec2.add(this.vel, fGravity);

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

