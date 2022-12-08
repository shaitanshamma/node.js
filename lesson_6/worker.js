import {workerData, parentPort} from 'worker_threads';


import http from "http";

import fs from "fs";
import path from "path";
import {Server} from "socket.io"

const host = "localhost";
const {portOfset} = workerData
const port = 3000 + portOfset;


const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {

        const filePath = path.join(process.cwd(), "./lesson_6/index.html");
        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
    }
});
const io = new Server(server)
io.on('connection', (client) => {

    let nick = 'anonymous';
    console.log(`Client ${nick} connected`)
    client.on('client-msg', (data) => {
        nick = data.nick;
        client.broadcast.emit('server-msg', {nick: data.nick, msg: data.msg});
        client.emit('server-msg', {nick: data.nick, msg: data.msg});
    });
    client.on('disconnect', () => {
        console.log(`Client ${nick} disconnect!`);
        client.broadcast.emit(`Client ${nick} disconnect!`);
    });
})

server.listen(port, host, () => {
    parentPort.postMessage({result: `Server was started: ${host}${port}`})
})