const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const logDir = path.join(__dirname, 'access_tmp.log');

const input = fs.createReadStream(logDir, {
    encoding: "utf8"
});

const rl = readLine.createInterface(input);

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
rl.on("close",()=> console.log("Parse done!"))

