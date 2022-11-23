const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const logDir = path.join(__dirname, 'access_tmp.log');

const input = fs.createReadStream(logDir, {
    encoding: "utf8"
});

const rl = readLine.createInterface(input);

const destPath = path.join(__dirname, 'logs')

function createLogs(cb){
    fs.mkdir(destPath, {recursive: true}, cb);
}

function parseLogs() {
    rl.on("line", line => {
        const [filename, fileContent] = line.split(" - - ");
        if (filename && fileContent) {
            const logPath = path.join(__dirname, 'logs', filename + '_requests.log')
            const output = fs.createWriteStream(logPath, {
                encoding: "utf8",
                flags: "a+"
            });
            output.write(fileContent + "\n");
        }
    });
    rl.on("close", () => console.log("Parse done!"))
}

createLogs(parseLogs);

/*На всякий случай прям совсем задание

function createLogs(cb){
    fs.mkdir(destPath, {recursive: true}, cb);
}

function saveLogs() {
    rl.on("line", line => {
        const [filename, fileContent] = line.split(" - - ");
        if (filename==='89.123.1.41'|| filename==='34.48.240.111') {
            const logPath = path.join(__dirname, 'logs', filename + '_requests.log')
            const output = fs.createWriteStream(logPath, {
                encoding: "utf8",
                flags: "a+"
            });
            output.write(fileContent + "\n");
        }
    });
    rl.on("close", () => console.log("Parse done!"))
}

createLogs(saveLogs);

*/