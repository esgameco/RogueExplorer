import Creature from './utils/creature.js';

// TODO: Use prototypes for '@'
class Player extends Creature {
    constructor({pos, hp, atk, def, xp, items, name}) {
        super('@', pos, hp, atk, def);
        this.xp = xp;
        this.items = items;
        this.name = name;
    }
}

export default Player