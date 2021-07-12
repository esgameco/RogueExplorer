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
    pos: [2, 2],
    players: []
};

// TODO: Enemy AI
// Use setInterval ever 500ms to simulate enemy moves

// Initializes WebSocket server
io.on('connection', (client) => {
    console.log(`${client.id} connected`);

    client.on('init', (name) => {
        gameData.players.push(player.newPlayer(10, 5, 3, name, client.id));
        client.emit('update', gameData);
    });

    client.on('move', (direction) => {
        gameData.pos = move.movePlayer(gameData.map, direction, gameData.pos);
        client.emit('update', gameData);
    });

    client.on('disconnect', () => {
        gameData.players = gameData.players.filter(player => player.id != client.id);
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