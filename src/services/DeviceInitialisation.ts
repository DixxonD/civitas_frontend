import {server} from "../config/config";
import {BuildProgress, StorageDeviceDescription} from "../config/types";
import axios from "axios";

const baseURL = `${server.prefix}${server.addr}:${server.port}`

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
        await axios.post(`${baseURL}/api/addDrive/register`,selectedDisk )
    }catch (error) {
        throw handleAxiosError(error)
    }

}

export async function getRegisteredDisks(): Promise<StorageDeviceDescription[]>{
    try{
        const result = await axios.get(`${baseURL}/api/createRaid/disks`)
        return result.data
    }catch (error){
        throw handleAxiosError(error)
    }
    /*
    return Promise.resolve([
        {name: "numero uno", mountPoint: '/blah/a', id: '1', size: '300GB'},
        {name: "numero due", mountPoint: '/blah/b', id: '2', size: '300GB'},
        {name: "numero drüüü", mountPoint: '/blah/c', id: '3', size: '300GB'},
    ])

     */
}

export async function buildRaid(selectedIDs: string[]){
    try{
        await axios.post(`${baseURL}/api/createRaid/build`, selectedIDs)
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function getBuildProgress(): Promise<BuildProgress>{
    try{
        const result = await axios.get(`${baseURL}/api/createRaid/progress`)
        return result.data
    }catch (error ){
        throw handleAxiosError(error)
    }
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