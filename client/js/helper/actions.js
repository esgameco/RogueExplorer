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
    mouseMove(mousePos, mapSize, scale, tileSize=32) {
        // TODO: Move math out of Action
        const newPos = [Math.floor(mousePos[0]/(tileSize*scale)), Math.floor(mapSize[1]-(mousePos[1]/(tileSize*scale)))];
        this.socket.emit('move', newPos);
    }
}

export default Action;