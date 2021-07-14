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
const gMap = require('./game/map');
const player = require('./game/player');

// Data variables
// TODO: Remove from global scope somehow
let gameData = {
    map: gMap.generateMap(30, 15),
    players: {}
};

// TODO: Enemy AI
// Use setInterval every 100ms to simulate enemy moves

// Initializes WebSocket server
io.on('connection', (client) => {
    console.log(`${client.id} connected`);

    client.on('init', (name) => {
        player.newPlayer(gameData.players, [5, 5], 10, 5, 3, name, client.id);
        io.emit('update', gameData);
    });

    client.on('move', (newPos) => {
        console.log(newPos)
        gameData.players[client.id].pos = move.movePlayer(gameData.map, newPos, gameData.players[client.id].pos);
        io.emit('update', gameData);
    });

    client.on('disconnect', () => {
        player.removePlayer(gameData.players, client.id);
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