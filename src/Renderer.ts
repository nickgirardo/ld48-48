import * as Vec2 from './Vec2';
import { CollisionBoundry } from './CollisionBoundry';

export default class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scale: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // NOTE this value is immediately reassigned within this.resize
        // this assignment is here to satisfy typescript
        this.scale = 0;

        this.canvas = canvas;
        this.ctx = ctx;

        this.resize();
        window.addEventListener('resize', this.resize);
    }

    clear() {
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize = () => {
        const widthAspect = 16;
        const heightAspect = 9;
        // get the max size that fits both width and height by finding the min scale
        this.scale = Math.min(window.innerWidth / widthAspect, window.innerHeight / heightAspect);

        // now set canvas size and resolution to the new scale
        this.canvas.width = Math.floor(widthAspect * this.scale);
        this.canvas.height = Math.floor(heightAspect * this.scale);
        this.canvas.style.width = `${this.canvas.width}px`
        this.canvas.style.height = `${this.canvas.height}px`
    }

    // NOTE the actual type of fillStyle is different but idgaf
    debug(body: CollisionBoundry, fillStyle: string) {
        const scaleFactor = this.scale / 92;
        const size = Vec2.sMult(scaleFactor, Vec2.sub(body[1], body[0]));
        const topLeft = Vec2.sMult(scaleFactor, body[0]);

        this.ctx.fillStyle = fillStyle;

        // NOTE rounding to whole number values to avoid pixel wide gaps
        this.ctx.fillRect(
            Math.floor(topLeft[0]),
            Math.floor(topLeft[1]),
            Math.ceil(size[0]),
            Math.ceil(size[1])
        );
    }
}

