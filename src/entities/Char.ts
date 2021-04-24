import { Entity } from '../Entity';

import { Keys, keysDown } from '../util/keyboard';

export class Char extends Entity {
    x = 0;
    y = 0;

    render() {
        window.ctx.fillStyle = 'red';
        window.ctx.fillRect(this.x, this.y, 50, 50);
    }

    update() {
        if (keysDown[Keys.LEFT])
            this.x--;
        if (keysDown[Keys.RIGHT])
            this.x++;
    }
}


