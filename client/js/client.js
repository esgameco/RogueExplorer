import Actions from './helper/actions.js';

const socket = new WebSocket('ws://localhost:8080/');

socket.addEventListener('message', (ev) => {
    console.log(ev.data);
});

socket.addEventListener('open', (ev) => {
    Actions.move(socket, 'left');
});
