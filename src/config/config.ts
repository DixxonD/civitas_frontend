interface ServerConfig {
    prefix: string,
    addr: string,
    port: number
}

const server: ServerConfig = {
    prefix: 'http://',
    addr: process.env.REACT_APP_BACKEND_IP || 'localhost',
    port: 5000
}

const tus = {
    endpoint: '/api/upload'
}

export {server, tus}
