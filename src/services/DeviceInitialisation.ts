import {server} from "../config/config";
import {StorageDeviceDescription} from "../config/types";
import axios from "axios";

const baseURL = `http://${server.addr}:${server.port}`

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function callBeforeState(){
    try {
        return await axios.get(`${baseURL}/api/addDrive/before`)
    }catch (error){
        throw handleAxiosError(error)
    }

}

export async function callAfterState(): Promise<StorageDeviceDescription>{
    try {
        const response = await axios.get(`${baseURL}/api/addDrive/after`)
        return response.data
    } catch (error ) {
        throw handleAxiosError(error)
    }

}

export async function registerDisk(selectedDisk: StorageDeviceDescription){
    try{
        return axios.post(`${baseURL}/api/addDrive/register`,selectedDisk )
    }catch (error) {
        throw handleAxiosError(error)
    }

}

export async function getRegisteredDisks(): Promise<StorageDeviceDescription[]>{
    await sleep(100)
    return Promise.resolve([
        {name: "numero uno", mountPoint: '/blah', id: '1', size: '300GB'},
        {name: "numero due", mountPoint: '/blah', id: '2', size: '300GB'},
        {name: "numero drüüü", mountPoint: '/blah', id: '3', size: '300GB'},
    ])
}

export async function buildRaid(selectedIDs: string[]){
    await sleep(100)
    return Promise.resolve()
}

function handleAxiosError(error: unknown): Error{
    if(axios.isAxiosError(error)){
        if(error.response){
            if(error.response.status < 500){
                return new Error(`${error.response.data}`)
            }
            return new Error("An error occurred in the node.")
        }
    }
    return new Error('The node could not respond')
}