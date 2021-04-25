import { init } from './util/keyboard';
import { Scene } from './Scene';
import { Ground } from './Ground';
import { Char } from './entities/Char';
import { Banana } from './entities/Banana';

// NOTE asserting these are not null
// This is somewhat fine as if these are infact null than
// everything will be broken regardless
const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Putting these on the global window object for the sake of time
window.canvas = canvas;
window.ctx = ctx;
window.frame = 0;

// Set up keyboard listeners
init();

const ground = new Ground();

// NOTE bellow is just testing some basic scene shit
const scene = new Scene(ground);

const char = new Char();
char.pos = [350, 250];

scene.addEntity(char);

const banana = new Banana();
banana.pos = [550, 150];

scene.addEntity(banana);

// TODO resize to 16x9 (or 4x3 or something)
// TODO resize on init and window resize event
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tick = () => {
    window.frame++;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scene.update();
    window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
