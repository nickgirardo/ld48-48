import { Scene } from './Scene';

export class Entity {
    scene: Scene | undefined;
    render() {};
    update() {};
    getCollisionBounds() {};
}
