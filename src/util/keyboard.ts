// Keyboard handler util
// Note that the actual state of the keyboard isn't being exported yet

export enum Keys {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    JUMP = 'jump',
    SWING = 'swing',
    FIRE = 'fire',
};

export const keysDown: { [key in Keys]: boolean } = {
    up: false,
    down: false,
    left: false,
    right: false,
    jump: false,
    swing: false,
    fire: false,
};

// TODO should be able to include arrow keys as well
let keyMap = new Map<number, Keys>();

keyMap.set(87, Keys.UP);
keyMap.set(83, Keys.DOWN);
keyMap.set(65, Keys.LEFT);
keyMap.set(68, Keys.RIGHT);
keyMap.set(74, Keys.JUMP);
keyMap.set(75, Keys.SWING);
keyMap.set(76, Keys.FIRE);

// Set up keyboard event listeners
export const init = () => {
    document.addEventListener('keydown', event => {
        const key = keyMap.get(event.keyCode);

        // If we don't find the key in the map we don't care about it
        if (!key)
            return;

        keysDown[key] = true;
    });

    document.addEventListener('keyup', event => {
        const key = keyMap.get(event.keyCode);

        // If we don't find the key in the map we don't care about it
        if (!key)
            return;

        keysDown[key] = false;
    });
};
