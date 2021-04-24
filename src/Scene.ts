import { Entity } from './Entity';

export class Scene {
    entities: Entity[] = [];
    addEntity = (entity: Entity) => {
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
        console.log(this.entities);
        this.entities.forEach(e => e.update());
        this.entities.forEach(e => e.render());
    };
}
