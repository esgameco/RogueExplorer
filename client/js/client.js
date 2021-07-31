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

// Panning coordinates
let prevPos = [];
let isMouseDown = false;
let timesSinceDraw = 0;

const staggeredDraw = (inc=1) => {
    if (timesSinceDraw >= 5) {
        instance.draw();
        timesSinceDraw = 0;
    } else
        timesSinceDraw += inc;
};

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

    // Left Click
    if (ev.button === 0)
        action.mouseMove(Canvas.canvasMousePos(canvasRect, mousePos), instance.gameMap.getSize(), instance.mapPos, instance.tileScale);
    // Middle Click
    else if (ev.button === 1) {
        ev.preventDefault();
        prevPos = mousePos;
        instance.draw();
        isMouseDown = true;
    // Right Click
    } else if (ev.button === 2) {
        ev.preventDefault();

        // Use action attack with the enemy id
        action.attack(instance, Canvas.canvasMousePos(canvasRect, mousePos), instance.gameMap.getSize(), instance.mapPos, instance.tileScale);
    }
});

canvas.addEventListener('mousemove', (ev) => {
    const mousePos = [ev.clientX, ev.clientY];

    if (isMouseDown) {
        const posChange = [mousePos[0]-prevPos[0], mousePos[1]-prevPos[1]];
        instance.mapPos[0] += posChange[0]/32;
        instance.mapPos[1] += posChange[1]/32;
        prevPos = mousePos;
        // Used to draw to the screen less so it doesn't lag
        // staggeredDraw();
        instance.draw();
    }
});

canvas.addEventListener('mouseup', (ev) => {
    const mousePos = [ev.clientX, ev.clientY];

    // Middle Click
    if (ev.button === 1) {
        instance.draw();
        isMouseDown = false;
    }
});

// Zooms in/out on middle mouse scroll
canvas.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    if (ev.deltaY < 0)
        instance.changeScale(0.2);
    else 
        instance.changeScale(-0.2);
    instance.draw();
});

// Stops right click menu from showing up
canvas.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
});