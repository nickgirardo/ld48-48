import Renderer from '../Renderer';

export {};

// Very janky, but for the sake of time I'm extending the global window object
declare global {
    interface Window {
        renderer: Renderer,
        frame: number,
    }
}
