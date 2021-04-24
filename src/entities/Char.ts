import { Entity } from '../Entity';

export class Char extends Entity {
    x = 0;
    y = 0;

    render() {
        console.log(this.x, this.y);
        console.log(window.canvas, window.ctx);
    }

    update() {
        this.x++;
        this.y++;
    }
}


