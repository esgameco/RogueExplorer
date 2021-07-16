import Creature from './utils/creature.js';

class Enemy extends Creature {
    constructor({symbol, pos, hp, atk, def, dropXp, dropItems, name}) {
        super(symbol, pos, hp, atk, def);
        this.dropXp = dropXp;
        this.dropItems = dropItems;
        this.name = name;
    }
}

export default Enemy;