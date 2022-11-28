#!/usr/bin/env node
import fsp from 'fs/promises';
import fs from 'fs';
import inquirer from 'inquirer';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


fsp.readdir(__dirname, {
    withFileTypes: true
}).then((fileList) => {
    let list = []
    fileList.forEach(el => list.push(el));
    return list;
}).then((list) => {
    return inquirer.prompt({
        name: "fileName",
        type: 'file-tree-selection',
        message: "Choose file:",
    })
}).then((file) => {
    const strToSearch = process.argv.slice(2).toString();
    const input = fs.createReadStream(file.fileName, 'utf8');
    const output = fs.createWriteStream(strToSearch + '.log', 'utf8');
    const rl = readline.createInterface(input);
    rl.on('line',(line)=>{
        if(line.includes(strToSearch)){
            console.log(line + '\n');
            output.write(line + '\n')
        }
    })
})

