import Action from './helper/actions.js';
import ResourceManager from './helper/resources.js';
import GameMap from './game/map.js';

// Creating websocket
const socket = new WebSocket('ws://localhost:8080/');

// Setting up Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Instanciating helper classes
const resourceManager = new ResourceManager();
const action = new Action(socket);

// Updates map when socket first connects
socket.addEventListener('open', (ev) => {
    action.wait();
});

// Updates map every message from server
socket.addEventListener('message', ({data}) => {
    const gameData = JSON.parse(data);
    const gameMap = new GameMap(gameData, resourceManager);
    gameMap.draw(ctx)
});

// Sends actions to server when player uses keyboard
window.addEventListener('keydown', (ev) => {
    const keyMapping = {
        'a': 'l',
        'd': 'r',
        's': 'd',
        'w': 'u',
    }
    if (keyMapping[ev.key])
        action.move(keyMapping[ev.key]);
});

