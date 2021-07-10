const ws = require('ws');
const http = require('http');

// Create servers
const server = http.createServer();
const wss = new ws.Server({noServer:true});

// Data variables
// TODO: Remove from global scope somehow
let playerMap = ['#', '#', '@', '#', '#'];
let pos = 2;

// TODO: Change parameter names to something better
const movePlayer = (direction) => {
    if (direction == 'left')
        if (pos > 0) {
            // TODO: Make symbols into constants
            playerMap[pos-1] = '@';
            playerMap[pos] = '#';
            pos--;
        }
    if (direction == 'right')
        if (pos < playerMap.length-1) {
            playerMap[pos+1] = '@';
            playerMap[pos] = '#';
            pos++;
        }
};

// Initializes WebSocket server
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        if (msg.action == 'move') {
            movePlayer(msg.direction);
        }
        ws.send(playerMap.join(''));
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