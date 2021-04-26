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
import nailPickupSprite from '../sprites/nail_pickup.png';
// @ts-ignore
import applePickupSprite from '../sprites/apple_pickup.png';
// @ts-ignore
import nailLeftSprite from '../sprites/nail_projectile_left.png';
// @ts-ignore
import nailRightSprite from '../sprites/nail_projectile_right.png';

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

    NAIL_PICKUP,
    APPLE_PICKUP,

    NAIL_LEFT,
    NAIL_RIGHT,
};

export async function loadImages () {
    const banana = await loadImage(bananaSheet);
    const bananaFlip = await loadImage(bananaSheetFlip);
    const tomato = await loadImage(tomatoSheet);
    const tomatoFlip = await loadImage(tomatoSheetFlip);

    const vommitLeft = await loadImage(vommitSpriteLeft);
    const vommitRight = await loadImage(vommitSpriteRight);

    const nailPickup = await loadImage(nailPickupSprite);
    const applePickup = await loadImage(applePickupSprite);

    const nailLeft = await loadImage(nailLeftSprite);
    const nailRight = await loadImage(nailRightSprite);

    window.images = {
        // TODO
        [Images.CHAR_SHEET]: tomato,

        [Images.TOMATO_SHEET]: tomato,
        [Images.TOMATO_SHEET_FLIP]: tomatoFlip,
        [Images.BANANA_SHEET]: banana,
        [Images.BANANA_SHEET_FLIP]: bananaFlip,

        [Images.VOMMIT_LEFT]: vommitLeft,
        [Images.VOMMIT_RIGHT]: vommitRight,

        [Images.NAIL_PICKUP]: nailPickup,
        [Images.APPLE_PICKUP]: applePickup,

        [Images.NAIL_LEFT]: nailLeft,
        [Images.NAIL_RIGHT]: nailRight,
    };
}
