import Creature from './utils/creature';

class Player extends Creature {
    constructor(pos, hp, atk, def, name) {
        super('@', pos, hp, atk, def);
        this.name = name;
    }
}

export default Player