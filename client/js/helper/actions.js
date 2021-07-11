class Action {
    constructor(socket) {
        this.socket = socket;
    }

    move(direction) {
        this.socket.send(JSON.stringify({
            action: 'move',
            direction
        }));
    }

    wait() {
        this.socket.send(JSON.stringify({
            action: 'wait'
        }));
    }
}

export default Action;