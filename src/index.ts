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

const char = new Char();
scene.addEntity(char);

scene.update();
scene.update();

scene.removeEntity(char);
scene.update();
