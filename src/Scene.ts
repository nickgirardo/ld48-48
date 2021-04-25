import { Entity } from './Entity';
import { Ground } from './Ground';

export class Scene {
    constructor(ground: Ground) {
        this.ground = ground;
    }

    // TODO
    ground: Ground;
    entities: Entity[] = [];
    addEntity = (entity: Entity) => {
        entity.scene = this;
        this.entities.push(entity);
    };
    removeEntity = (entity: Entity) => {
        const pos = this.entities.indexOf(entity);

        // Unable to find entity :(
        if (pos === -1)
            return;

        // We have an entity, remove it
        this.entities.splice(pos, 1);
    };
    update = () => {
        this.ground.render();
        this.entities.forEach(e => e.update());
        this.entities.forEach(e => e.render());
    };
}
