import Entity from './entity.js';

class Creature extends Entity {
    // TODO: Change atk and def to be sum of item's effects
    constructor(symbol, pos, hp, atk, def) {
        super(symbol, pos);
        this.hp = hp;
        this.atk = atk;
        this.def = def;
    }
}