export default {
    move: (socket, direction) => {
        socket.send(JSON.stringify({
            action: 'move',
            direction
        }));
    },
};