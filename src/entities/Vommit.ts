import { Entity, EntityTypes } from '../Entity';

import { Scene } from '../Scene';
import { Keys, keysDown } from '../util/keyboard';
import { vommitSound, deflectSound } from '../Audio';
import * as Vec2 from '../Vec2';

import { CollisionBoundry, checkOverlap } from '../CollisionBoundry';

enum Facing {
    LEFT,
    RIGHT,
}

export class Vommit implements Entity {
    kind = EntityTypes.VOMMIT;
    scene: Scene | undefined;

    alive: boolean = true;

    pos: Vec2.Vec2 = [0, 0];
    size: Vec2.Vec2 = [64, 32];
    vel: Vec2.Vec2 = [0, 0];
    speed: number = 8;

    lifetime: number = 60;

    facing: Facing = Facing.LEFT;

    audio = vommitSound.getAudio();
    deflectAudio = deflectSound.getAudio();

    constructor() {
        this.audio.play();
    }

    render() {
        window.renderer.debug(this.getCollisionBounds(), 'purple');
    }

    remove(deflect: boolean = false) {
        this.scene!.removeEntity(this);
        this.audio.channels[0].buffer = null;

        if(deflect)
            this.deflectAudio.play();
    }

    update() {
        if (!this.scene)
            return;

        const ground = this.scene.ground;

        // Check for collisions
        // Only interested in shovel, which destroys this
        const a = this.scene.entities
            .filter(e => e.kind === EntityTypes.SHOVEL)
            .filter(e => checkOverlap(e.getCollisionBounds(), this.getCollisionBounds()))
            .forEach(e => {
                switch (e.kind) {
                    case EntityTypes.SHOVEL:
                        this.remove(true);
                        return;
                }
            });


        this.lifetime--;
        if (!this.lifetime)
            this.remove();

        // Clamp with x clearances (for ground collision)
        if (this.vel[0] > 0) {
            const posXClearance: number = ground.getPosXClearance(this.getCollisionBounds());
            if (!posXClearance)
                this.remove();

            this.vel[0] = Math.min(posXClearance, this.vel[0]);
        } else {
            const negXClearance: number = ground.getNegXClearance(this.getCollisionBounds());
            if (!negXClearance)
                this.remove();

            this.vel[0] = Math.max(negXClearance, this.vel[0]);
        }

        this.pos = Vec2.add(this.pos, this.vel);
    }

    getCollisionBounds(): CollisionBoundry {
        return [this.pos, Vec2.add(this.pos, this.size)];
    }
}


