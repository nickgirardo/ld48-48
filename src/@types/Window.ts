export {};

// Very janky, but for the sake of time I'm extending the global window object
declare global {
    interface Window {
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    }
}
