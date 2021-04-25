import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Vommit } from './Vommit';
import { Keys, keysDown } from '../util/keyboard';
import * as Vec2 from '../Vec2';

import { CollisionBoundry } from '../CollisionBoundry';

enum TomatoAnim {
    IDLE,
    // IN_RANGE?
    ANTICIPATION,
    SPITTING,
    HURT,
    DEAD,
}

enum Facing {
    LEFT,
    RIGHT,
}

export class Tomato implements Entity {
    kind = EntityTypes.TOMATO;
    scene: Scene | undefined;

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

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'darkred');
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        const char = this.scene.entities.find(e => e.kind === EntityTypes.CHAR);

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

        const fire = () => {
            // This should never happen
            if(!this.scene)
                return;

            this.frameLastFire = window.frame;

            const vommit = new Vommit();
            vommit.pos = Vec2.clone(this.pos);
            vommit.pos[1] = vommit.pos[1] + 10;

            vommit.vel = this.facing === Facing.LEFT ? [-vommit.speed, 0] : [vommit.speed, 0];
            this.scene.addEntity(vommit);
        }

        // Fire a shot if in range for at least 30 frames
        if (
            this.inRange &&
            this.frameEnteredRange + 30 < window.frame &&
            this.frameLastFire + 75 < window.frame
        )
            fire();


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

