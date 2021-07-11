// Websocket dependencies
const ws = require('ws');
const http = require('http');

// Create servers
const server = http.createServer();
const wss = new ws.Server({noServer:true});

// User dependencies
const move = require('./game/move');
const gMap = require('./game/map')

// Data variables
// TODO: Remove from global scope somehow
let gameData = {
    // map: [
    //     [['#'], ['#'], ['#'], ['#'], ['#']],
    //     [['#'], ['.'], ['.'], ['.'], ['#']],
    //     [['#'], ['.'], ['.'], ['.'], ['#']],
    //     [['#'], ['.'], ['.'], ['.'], ['#']],
    //     [['#'], ['#'], ['#'], ['#'], ['#']],
    // ],
    map: gMap.generateMap(30, 15),
    pos: [2, 2]
};

// Initializes WebSocket server
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        if (msg.action == 'move')
            gameData.pos = move.movePlayer(gameData.map, msg.direction, gameData.pos);
        else
            console.log('Nothing to do.')
        ws.send(JSON.stringify(gameData));
    });
});

// Upgrades HTTP to WebSocket
server.on('upgrade', (req, sock, head) => {
    wss.handleUpgrade(req, sock, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

// Send http response back
// server.on('connection', (sock) => {
//     sock.end('cs')
// })

server.listen(8080, listeningListener=() => console.log('Listening on 8080.'));