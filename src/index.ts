import Renderer from './Renderer';
import { init } from './util/keyboard';
import { loadImages } from './util/Image';

import { Scene } from './Scene';
import { Ground } from './Ground';

import { Char } from './entities/Char';
import { Banana } from './entities/Banana';
import { Tomato } from './entities/Tomato';

// NOTE asserting these are not null
// This is somewhat fine as if these are infact null than
// everything will be broken regardless
const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Putting these on the global window object for the sake of time
window.renderer = new Renderer(canvas, ctx);
window.frame = 0;

// Set up keyboard listeners
init();

const startGame = () => {
    const ground = new Ground();

    // NOTE bellow is just testing some basic scene shit
    const scene = new Scene(ground);

    const char = new Char();
    char.pos = [350, 250];
    scene.addEntity(char);

    const banana = new Banana();
    banana.pos = [550, 150];
    scene.addEntity(banana);

    const tomato = new Tomato();
    tomato.pos = [450, 150];
    scene.addEntity(tomato);

    const tick = () => {
        window.frame++;
        window.renderer.clear();
        scene.update();
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};

loadImages().then(startGame);

