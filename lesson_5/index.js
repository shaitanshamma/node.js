import http from 'http'
import fs from 'fs/promises'
import path, {dirname} from 'path'

const port = 3000
const host = 'localhost'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setTemplate = (data) => {
    return `
    <a href="${data.href}">${data.name}</a>
  `
}

const getList = async (directoryPath, requestUrl) => {
    const list = await fs.readdir(directoryPath)
    const data = await Promise.all(
        list.map(async (item) => {
            const href = `${requestUrl}${requestUrl === '/' ? '' : '/'}${item}`
            return setTemplate({
                href,
                name: item,
            })
        })
    )

    if (requestUrl !== '/') {
        const href = requestUrl.split('/').slice(0, -1).join('/')
        const parentDirectory = setTemplate({
            href: href === '' ? '/' : href,
            name: 'Root'
        })
        data.unshift(parentDirectory)
    }
    return data.join('')
}

const readDirHandler = async (request, response) => {
    try {
        const fullPath = path.join(__dirname, request.url)
        const stat = await fs.stat(fullPath)
        const filePath = stat.isDirectory() ? path.join(__dirname, 'index.html') : fullPath
        let data = await fs.readFile(filePath)

        if (stat.isDirectory()) {
            const list = await getList(fullPath, request.url)

            data = data.toString()
                .replaceAll('{path}', request.url)
                .replace('{list}', list)
        }

        response.writeHead(200)
        response.end(data)
    } catch (error) {
        console.log(error);
        response.writeHead(404);
        response.end();
    }
}

const server = http.createServer(readDirHandler)

server.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`)
})

server.on('error', (error) => {
    console.log(error)
})