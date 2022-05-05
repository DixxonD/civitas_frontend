import {server} from "../config/config";
import {StorageDeviceDescription} from "../config/types";

const baseURL = `http://${server.addr}:${server.port}`

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function callBeforeState(){
    await sleep(500)
    return Promise.resolve()
}

export async function callAfterState(): Promise<StorageDeviceDescription>{
    await sleep(500)
    const resultFromAPICall: StorageDeviceDescription = {name: 'myDevice', size: '100GB', mountPoint: '/blah'}
    return resultFromAPICall
}

export async function registerDisk(){
    await sleep(100)
    return Promise.resolve()
}