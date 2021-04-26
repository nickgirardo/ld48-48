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

        // The returned value from push is the index into the array
        const index = this.entities.push(entity);

        // We give this to the entity so that different entities animations
        // can be offset and don't sync
        entity.index = index;
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
