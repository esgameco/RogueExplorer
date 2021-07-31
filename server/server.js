// Websocket dependencies
const http = require('http');

// Create servers
const server = http.createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        //   allowedHeaders: ["my-custom-header"],
        // credentials: true
    }
});

// User dependencies
const move = require('./game/move');
const attack = require('./game/attack');
const gen = require('./game/gen');
const player = require('./game/player');

// Data variables
// TODO: Remove from global scope somehow
let gameMap = gen.generateMap(100, 50);
let enemies = gen.generateEnemies(gameMap, 50);

let gameData = {
    map: gameMap,
    players: {},
    enemies,
    items: {},
};

// TODO: Enemy AI
// Use setInterval every 100ms to simulate enemy moves

// Initializes WebSocket server
io.on('connection', (client) => {
    console.log(`${client.id} connected`);

    client.on('init', (name) => {
        // TODO: Add starting items
        player.newPlayer(gameData.players, [5, 5], 100, 5, 3, 0, {}, name, client.id);
        io.emit('update', gameData);
    });

    client.on('move', (newPos) => {
        // Checks for whether the client is in the level
        if (player.playerExists(gameData.players, client.id)) {
            // TODO: Check for whether the player has to pass through walls to get to the new pos
            gameData.players[client.id].pos = move.movePlayer(gameData.map, newPos, gameData.players[client.id].pos);

            // Only updates if the position changes correctly
            if (gameData.players[client.id].pos == newPos)
                io.emit('update', gameData);
        } else
            console.log('Player does not exist.');
    });

    client.on('attack', (enemyId) => {
        if (player.playerExists(gameData.players, client.id)) {
            if (gameData.enemies[enemyId]) {
                // TODO: Check distance
                attack.attack(gameData, client.id, enemyId);
            } else {
                console.log('Enemy does not exist');
            }
        } else
            console.log('Player does not exist.');
        io.emit('update', gameData);
    });

    client.on('disconnect', () => {
        // player.removePlayer(gameData.players, client.id);
        delete gameData.players[client.id];
        io.emit('update', gameData);
        console.log(`${client.id} disconnected`);
    });
});

// Upgrades HTTP to WebSocket
// server.on('upgrade', (req, sock, head) => {
//     wss.handleUpgrade(req, sock, head, (ws) => {
//         wss.emit('connection', ws, req);
//     });
// });

// Send http response back
// server.on('connection', (sock) => {
//     sock.end('cs')
// })

server.listen(8080, listeningListener=() => console.log('Listening on 8080.'));