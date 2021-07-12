import Creature from './utils/creature.js';

class Player extends Creature {
    constructor({pos, hp, atk, def, playerName, playerId}) {
        super('@', pos, hp, atk, def);
        this.name = playerName;
        this.id = playerId;
    }
}

export default Player