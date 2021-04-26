import Renderer from '../Renderer';
import { Images } from '../util/Image';

export {};

// Very janky, but for the sake of time I'm extending the global window object
declare global {
    interface Window {
        images: { [img in Images]: ImageBitmap },
        renderer: Renderer,
        frame: number,
    }
}
