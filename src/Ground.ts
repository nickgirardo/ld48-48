import * as Vec2 from './Vec2';
import { CollisionBoundry } from './CollisionBoundry';


const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
];


// temp
const tilesize = 48;

export class Ground {
    map = map;
    render() {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j])
                    window.renderer.debug([[j*tilesize, i*tilesize], [(j+1)*tilesize, (i+1)*tilesize]], 'darkblue');
            }
        }
    };

    getTilesTall(body: CollisionBoundry): number {
        const topTile = Math.floor(body[0][1] / tilesize);
        const bottomTile = Math.ceil(body[1][1] / tilesize);

        return bottomTile - topTile;
    }

    getTilesWide(body: CollisionBoundry): number {
        const leftTile = Math.floor(body[0][0] / tilesize);
        const rightTile = Math.ceil(body[1][0] / tilesize);

        return rightTile - leftTile;
    }

    // The following functions are terrible janky but idgaf
    getPosXClearance(body: CollisionBoundry): number {
        // Determines how many rows of tiles we will check
        const tilesTall = this.getTilesTall(body);
        // Determines from which row we will start checking
        const topTile = Math.floor(body[0][1]/tilesize);

        const rightmostPoint = body[1][0];
        // Start the search for tiles right after the body's rightmost point
        const leftStart = Math.ceil(rightmostPoint/tilesize);

        let clearance = Infinity;
        for (let i = topTile; i < tilesTall + topTile; i++) {
            for (let j = leftStart; j < this.map[i].length; j++) {
                if (map[i][j]) {
                    const currClearance = (j*tilesize) - rightmostPoint;
                    clearance = Math.min(clearance, currClearance);
                    break;
                }
            }
        }

        return clearance;
    }

    getNegXClearance(body: CollisionBoundry): number {
        // Determines how many rows of tiles we will check
        const tilesTall = this.getTilesTall(body);
        // Determines from which row we will start checking
        const topTile = Math.floor(body[0][1]/tilesize);

        const leftmostPoint = body[0][0];
        // Start the search for tiles right after the body's leftmost point
        const rightStart = Math.floor(leftmostPoint/tilesize) - 1;

        let clearance = -Infinity;
        for (let i = topTile; i < tilesTall + topTile; i++) {
            for (let j = rightStart; j >= 0; j--) {
                if (map[i][j]) {
                    const currClearance = ((j+1)*tilesize) - leftmostPoint;
                    clearance = Math.max(clearance, currClearance);
                    break;
                }
            }
        }

        return clearance;
    }

    getPosYClearance(body: CollisionBoundry): number {
        // Determines how many rows of tiles we will check
        const tilesWide = this.getTilesWide(body);
        // Determines from which column we will start checking
        const leftTile = Math.floor(body[0][0]/tilesize);

        const bottommostPoint = body[1][1];
        // Start the search for tiles right after the body's bottommost point
        const topStart = Math.ceil(bottommostPoint/tilesize);

        let clearance = Infinity;
        for (let i = leftTile; i < tilesWide + leftTile; i++) {
            for (let j = topStart; j < this.map.length; j++) {
                if (map[j][i]) {
                    const currClearance = (j*tilesize) - bottommostPoint;
                    clearance = Math.min(clearance, currClearance);
                    break;
                }
            }
        }

        return clearance;
    }

    getNegYClearance(body: CollisionBoundry): number {
        // Determines how many rows of tiles we will check
        const tilesWide = this.getTilesWide(body);
        // Determines from which column we will start checking
        const leftTile = Math.floor(body[0][0]/tilesize);

        const topmostPoint = body[0][1];
        // Start the search for tiles right after the body's topmost point
        const bottomStart = Math.ceil(topmostPoint/tilesize);

        let clearance = -Infinity;
        for (let i = leftTile; i < tilesWide + leftTile; i++) {
            for (let j = bottomStart; j >= 0; j--) {
                if (map[j][i]) {
                    const currClearance = ((j+1)*tilesize) - topmostPoint;
                    clearance = Math.max(clearance, currClearance);
                    break;
                }
            }
        }

        return clearance;
    }
}
