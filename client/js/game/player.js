import Creature from './utils/creature.js';

class Player extends Creature {
    constructor({pos, hp, atk, def, name, id}) {
        super('@', pos, hp, atk, def);
        this.name = name;
        this.id = id;
    }
}

export default Player