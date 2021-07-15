// External dependencies
// import { io } from 'socket-io-client';

// User dependencies
import Action from './helper/actions.js';
import ResourceManager from './helper/resources.js';
import GameInstance from './game/instance.js';
import Canvas from './helper/canvas.js';

// Creating socket
const socket = io('ws://localhost:8080/');

// Setting up Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Instanciating helper classes
const resourceManager = new ResourceManager();
const action = new Action(socket);

// Game instance
const instance = new GameInstance(ctx, resourceManager);

// Updates map when socket first connects
socket.on('connect', () => {
    action.init();
});

// Updates map every message from server
socket.on('update', (gameData) => {
    instance.update(gameData);
    instance.draw();
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
        action.keyMove(keyMapping[ev.key], instance.players[socket.id]);
});

// Sends move action to the server based on the mouse position
window.addEventListener('mousedown', (ev) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mousePos = [ev.clientX, ev.clientY];

    // TODO: Test if it works
    if (Canvas.inCanvas(canvasRect, mousePos))
        action.mouseMove(Canvas.canvasMousePos(canvasRect, mousePos), gameMap.getSize());
});

// TODO: Move screen when middle mouse is clicked

// TODO: Zoom in/out on middle mouse scroll

// TODO: Context menu on right click