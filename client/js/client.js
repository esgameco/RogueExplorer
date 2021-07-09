const socket = new WebSocket('ws://localhost:8080/');

socket.addEventListener('message', (ev) => {
    console.log(ev);
    socket.send('Client -> Server')
});