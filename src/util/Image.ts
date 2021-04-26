// @ts-ignore
import bananaSheet from '../sprites/banana_sheet.png';
// @ts-ignore
import bananaSheetFlip from '../sprites/banana_sheet_flipped.png';
// @ts-ignore
import tomatoSheet from '../sprites/tomato_sheet.png';
// @ts-ignore
import tomatoSheetFlip from '../sprites/tomato_sheet_flipped.png';
// @ts-ignore
import vommitSpriteLeft from '../sprites/vommit_left.png';
// @ts-ignore
import vommitSpriteRight from '../sprites/vommit_right.png';
// @ts-ignore
import nailSprite from '../sprites/nail.png';
// @ts-ignore
import appleSprite from '../sprites/apple.png';

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
    TOMATO_SHEET_FLIP,
    BANANA_SHEET,
    BANANA_SHEET_FLIP,

    VOMMIT_LEFT,
    VOMMIT_RIGHT,
    NAIL,
    APPLE,
};

export async function loadImages () {
    const banana = await loadImage(bananaSheet);
    const bananaFlip = await loadImage(bananaSheetFlip);
    const tomato = await loadImage(tomatoSheet);
    const tomatoFlip = await loadImage(tomatoSheetFlip);

    const vommitLeft = await loadImage(vommitSpriteLeft);
    const vommitRight = await loadImage(vommitSpriteRight);
    const nail = await loadImage(nailSprite);
    const apple = await loadImage(appleSprite);

    // TODO
    window.images = {
        // TODO
        [Images.CHAR_SHEET]: tomato,

        [Images.TOMATO_SHEET]: tomato,
        [Images.TOMATO_SHEET_FLIP]: tomatoFlip,
        [Images.BANANA_SHEET]: banana,
        [Images.BANANA_SHEET_FLIP]: bananaFlip,
        [Images.VOMMIT_LEFT]: vommitLeft,
        [Images.VOMMIT_RIGHT]: vommitRight,
        [Images.NAIL]: nail,
        [Images.APPLE]: apple,
    };
}
