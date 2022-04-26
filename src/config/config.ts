interface ServerConfig {
    addr: string,
    port: number
}

const server: ServerConfig = {
    addr: 'http://192.168.1.130',
    port: 5000
}

const tus = {
    endpoint: '/api/upload'
}

export {server, tus}
