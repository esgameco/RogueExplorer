class Action {
    constructor(socket) {
        this.socket = socket;
    }

    // Initializes user with server -- user is added to the game
    init() {
        this.socket.emit('init', 'ooga');
    }

    // Moves in cardinal directions based on keys pressed (wasd)
    keyMove(direction, player) {
        let newPos = player.pos;
        if (direction == 'l')
            newPos = [newPos[0]-1, newPos[1]];
        else if (direction == 'r') 
            newPos = [newPos[0]+1, newPos[1]];
        else if (direction == 'd')
            newPos = [newPos[0], newPos[1]-1];
        else if (direction == 'u')
            newPos = [newPos[0], newPos[1]+1];
        this.socket.emit('move', newPos);
    }

    // TODO: Use A* later to find path based on player's current position
    // Moves to the position under the mouse
    mouseMove(mousePos, mapSize, mapPos, scale, tileSize=32) {
        const newPos = this.getTilePos(mousePos, mapSize, mapPos, scale, tileSize);
        this.socket.emit('move', newPos);
    }

    // Attacks an enemy or player at the mouse position
    attack({enemies}, mousePos, mapSize, mapPos, scale, tileSize=32) {
        const tilePos = this.getTilePos(mousePos, mapSize, mapPos, scale, tileSize);

        // TODO: Add player attacking later
        // Get the enemy or player at position
        Object.keys(enemies).forEach((id) => {
            if (enemies[id].pos[0] == tilePos[0] && enemies[id].pos[1] == tilePos[1])
                this.socket.emit('attack', id);
        });
    }

    getTilePos(mousePos, mapSize, mapPos, scale, tileSize=32) {
        // TODO: Move math out of Action
        return [Math.floor((mousePos[0]/(tileSize*scale))-mapPos[0]), Math.floor((mapSize[1]-(mousePos[1]/(tileSize*scale)))+mapPos[1])];
    }
}

export default Action;