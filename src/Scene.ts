import { Entity } from './Entity';
import { Ground } from './Ground';

type SceneType = {
    ground: Ground;
    entities: Entity[];
    addEntity: (entity: Entity) => void;
    removeEntity: (entity: Entity) => void;
    update: () => void;
};

export class Scene<SceneType> {
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
        console.log(this.entities);
        this.entities.forEach(e => e.update());
        this.entities.forEach(e => e.render());
    };
}
