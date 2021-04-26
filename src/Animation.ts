import * as Vec2 from './Vec2';
import { Images } from './util/Image';

import { Tomato } from './entities/Tomato';

export enum Anims {
    TOMATO,
}

export enum TomatoAnim {
    IDLE,
    ANTICIPATION,
    SPITTING,
    HURT,
    DEAD,
}

export const AnimateTomato = (tomato: Tomato) => {
    const sheet = window.images[Images.TOMATO_SHEET];

    switch (tomato.animState) {
        case TomatoAnim.IDLE: {
            // This value should alternate between 0 and 1 every 45 frames
            // Index is used to offset so that different entities don't sync up
            const frame = Math.floor((window.frame + (tomato.index * 21)) % 150 / 75);

            const posOffset: Vec2.Vec2 = [0, 20];
            const frameSize: Vec2.Vec2 = [64, 84];

            window.renderer.drawImagePart(
                sheet,
                frame ? [68, 0] : [0, 0],
                [64, 82],
                Vec2.sub(tomato.pos, posOffset),
                frameSize,
            );
            return;
        }
        case TomatoAnim.ANTICIPATION: {
            const posOffset: Vec2.Vec2 = [0, 10];
            const frameSize: Vec2.Vec2 = [64, 74];

            window.renderer.drawImagePart(
                sheet,
                [0, 86],
                [64, 74],
                Vec2.sub(tomato.pos, posOffset),
                frameSize,
            );

            return;
        }
        case TomatoAnim.SPITTING: {
            // TODO using the anticipation anim for now :(
            const posOffset: Vec2.Vec2 = [0, 10];
            const frameSize: Vec2.Vec2 = [64, 74];

            window.renderer.drawImagePart(
                sheet,
                [66, 86],
                [64, 74],
                Vec2.sub(tomato.pos, posOffset),
                frameSize,
            );

            return;
        }
        case TomatoAnim.HURT: {
            const posOffset: Vec2.Vec2 = [0, 2];
            const frameSize: Vec2.Vec2 = [64, 74];

            window.renderer.drawImagePart(
                sheet,
                [0, 165],
                [64, 74],
                Vec2.sub(tomato.pos, posOffset),
                frameSize,
            );
            return;
        }
        case TomatoAnim.DEAD:  {
            const posOffset: Vec2.Vec2 = [0, 2];
            const frameSize: Vec2.Vec2 = [74, 84];

            window.renderer.drawImagePart(
                sheet,
                [68, 165],
                [72, 90],
                Vec2.sub(tomato.pos, posOffset),
                frameSize,
            );
            return;
        }
    }
};
