// @ts-ignore
import bananaSheet from  '../sprites/tomato_sheet.png';
// @ts-ignore
import tomatoSheet from  '../sprites/banana_sheet.png';
// @ts-ignore
import vommitSprite from  '../sprites/vommit.png';
// @ts-ignore
import nailSprite from  '../sprites/nail.png';
// @ts-ignore
import appleSprite from  '../sprites/apple.png';

// TODO should src be a string? Is there a more specific type?
const loadImage = (src: string): Promise<ImageBitmap> => 
    new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();

        // Setting this forces the image to start loading
        img.src = src;

        // Something went wrong
        // This shouldn't happen since we aren't fetching our images
        // from a network, but from a dataURI
        img.onerror = error => reject(error);

        // Loading finished, the img can be used now
        img.onload = () => resolve(img);
    }).then((img: HTMLImageElement) => createImageBitmap(img));

export enum Images {
    CHAR_SHEET,

    TOMATO_SHEET,
    BANANA_SHEET,

    VOMMIT,
    NAIL,
    APPLE,
};

export async function loadImages () {
    const banana = await loadImage(bananaSheet);
    const tomato = await loadImage(tomatoSheet);
    const vommit = await loadImage(vommitSprite);
    const nail = await loadImage(nailSprite);
    const apple = await loadImage(appleSprite);

    // TODO
    window.images = {
        // TODO
        [Images.CHAR_SHEET]: tomato,

        [Images.TOMATO_SHEET]: tomato,
        [Images.BANANA_SHEET]: banana,
        [Images.VOMMIT]: vommit,
        [Images.NAIL]: nail,
        [Images.APPLE]: apple,
    };
}
