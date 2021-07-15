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
const instance = new GameInstance(canvas, ctx, resourceManager);

// Updates map when socket first connects
socket.on('connect', () => {
    action.init();
});

// Updates map every message from server
socket.on('update', (gameData) => {
    instance.update(gameData);
    instance.draw();
});

// Sends move action to server when player uses one of the available keyboard commands
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
// TODO: Context menu on right click
// TODO: Move screen when middle mouse is clicked
canvas.addEventListener('mousedown', (ev) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mousePos = [ev.clientX, ev.clientY];

    if (Canvas.inCanvas(canvasRect, mousePos))
        action.mouseMove(Canvas.canvasMousePos(canvasRect, mousePos), instance.gameMap.getSize(), instance.tileScale);
});

// Zooms in/out on middle mouse scroll
canvas.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    if (ev.deltaY < 0)
        instance.tileScale += 0.2;
    else 
        instance.tileScale -= 0.2;
    instance.draw();
});