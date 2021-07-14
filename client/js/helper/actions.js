class Action {
    constructor(socket) {
        this.socket = socket;
    }

    init() {
        this.socket.emit('init', 'ooga');
    }

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
    mouseMove(mousePos, mapSize, tileSize=32) {
        const newPos = [Math.floor(mousePos[0]/tileSize), Math.floor(mapSize[1]-(mousePos[1]/tileSize))];
        this.socket.emit('move', newPos);
    }
}

export default Action;