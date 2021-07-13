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

// Updates map when socket first connects
socket.on('connect', () => {
    action.init();
});

// Updates map every message from server
socket.on('update', (gameData) => {
    const players = Object.keys(gameData.players).map((id) => { return new Player(gameData.players[id]) });
    console.log(players)
    const gameMap = new GameMap(gameData.map, players, resourceManager);
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
        action.move(keyMapping[ev.key]);
});

