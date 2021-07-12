class Action {
    constructor(socket) {
        this.socket = socket;
    }

    init() {
        this.socket.emit('init', 'ooga');
    }

    move(direction) {
        this.socket.emit('move', direction);
    }
}

export default Action;