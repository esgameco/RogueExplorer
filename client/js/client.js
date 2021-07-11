import Actions from './helper/actions.js';
import ResourceManager from './helper/resources.js';
import GameMap from './game/map.js';

const socket = new WebSocket('ws://localhost:8080/');

// Setting up Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const resourceManager = new ResourceManager();

// ctx.fillStyle = 'Blue';
// ctx.fillRect(100, 100, 10, 10);

// const images = ['item/potion/black', 'item/potion/black', 'item/potion/black', 'item/potion/black'].map((n) => resourceManager.getResource(n));

// images.forEach((img, i) => {
//     img.addEventListener('load', () => { 
//         ctx.drawImage(img, i*50, 0);
//     });
// });

socket.addEventListener('open', (ev) => {
    console.log('Opened connection.');
});

socket.addEventListener('message', ({data}) => {
    const gameData = JSON.parse(data);
    const gameMap = new GameMap(gameData, resourceManager);
    gameMap.draw(ctx)
});

window.addEventListener('keydown', (ev) => {
    const keyMapping = {
        'a': 'l',
        'd': 'r',
        's': 'd',
        'w': 'u',
    }
    if (keyMapping[ev.key])
        Actions.move(socket, keyMapping[ev.key]);
});

