class Entity {
    constructor(symbol, pos, exists=true) {
        this.symbol = symbol;
        this.pos = pos;
        this.exists = exists;
    }
}

export default Entity;