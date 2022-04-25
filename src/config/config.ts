interface ServerConfig {
    addr: string,
    port: number
}

const server: ServerConfig = {
    addr: 'http://localhost',
    port: 3000
}

export {server}
