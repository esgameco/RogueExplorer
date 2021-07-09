const ws = require('ws');
const http = require('http');

// Create servers
const server = http.createServer();
const wss = new ws.Server({noServer:true});

// Initializes WebSocket server
wss.on('connection', (ws) => {
    ws.send('Server -> Client');
    ws.on('message', (msg) => {
        console.log(msg);
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

server.on('listening', () => console.log('Listening on 8080.'));

server.listen(8080);