import Actions from './helper/actions.js';
import ResourceManager from './helper/resources.js';

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

const resourceManager = new ResourceManager();

// ctx.fillStyle = 'Blue';
// ctx.fillRect(100, 100, 10, 10);

const images = ['item/potion/black', 'item/potion/black', 'item/potion/black', 'item/potion/black'].map((n) => resourceManager.getResource(n));

images.forEach((img, i) => {
    img.addEventListener('load', () => { 
        ctx.drawImage(img, i*50, 0);
    });
});