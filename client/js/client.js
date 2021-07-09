import Actions from './helper/actions.js';

const socket = new WebSocket('ws://localhost:8080/');

socket.addEventListener('message', (ev) => {
    console.log(ev.data);
    // socket.send('Client -> Server')
});

socket.addEventListener('open', (ev) => {
    console.log(Actions)
    Actions.move(socket, 'left');
});
