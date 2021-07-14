// External dependencies
// import { io } from 'socket-io-client';

// User dependencies
import Action from './helper/actions.js';
import ResourceManager from './helper/resources.js';
import GameMap from './game/map.js';
import UI from './game/ui.js';

import Player from './game/player.js';

// Creating socket
const socket = io('ws://localhost:8080/');

// Setting up Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Instanciating helper classes
const resourceManager = new ResourceManager();
const action = new Action(socket);
const ui = new UI();

// Game data
let players = {};
let gameMap = {};

// Updates map when socket first connects
socket.on('connect', () => {
    action.init();
});

// Updates map every message from server
socket.on('update', (gameData) => {
    players = Object.fromEntries(Object.entries(gameData.players).map(([k, v]) => [k, new Player(v)]));
    console.log(players)
    gameMap = new GameMap(gameData.map, players, resourceManager);
    gameMap.draw(ctx);
    ui.display(gameData);
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
        action.keyMove(keyMapping[ev.key], players[socket.id]);
});

window.addEventListener('mousedown', (ev) => {
    const canvasPos = canvas.getBoundingClientRect();
    const mapSize = gameMap.getSize();
    const mousePos = [ev.clientX-canvasPos.left, ev.clientY-canvasPos.top];

    action.mouseMove(mousePos, mapSize);
});