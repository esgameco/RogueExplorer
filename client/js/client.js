import Actions from './helper/actions.js';

const socket = new WebSocket('ws://localhost:8080/');

socket.addEventListener('message', (ev) => {
    console.log(ev.data);
});

socket.addEventListener('open', (ev) => {
    Actions.move(socket, 'left');
});

// Setting up Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'Blue';
ctx.fillRect(100, 100, 10, 10);