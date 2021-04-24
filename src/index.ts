import { init } from './util/keyboard';
import { Scene } from './Scene';
import { Char } from './entities/Char';

// NOTE asserting these are not null
// This is somewhat fine as if these are infact null than
// everything will be broken regardless
const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Putting these on the global window object for the sake of time
window.canvas = canvas;
window.ctx = ctx;

// Set up keyboard listeners
init();

// NOTE bellow is just testing some basic scene shit
// TODO remove
const scene = new Scene();
// scene.ground = Ground();

const char = new Char();

char.pos = [50, 50];

scene.addEntity(char);

// TODO resize to 16x9 (or 4x3 or something)
// TODO resize on init and window resize event
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tick = () => {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scene.update();
    window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
