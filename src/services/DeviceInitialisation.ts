import {server} from "../config/config";
import {BuildProgress, RaidStatus, StorageDeviceDescription} from "../config/types";
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
        const {data: response}  = await axios.get(`${baseURL}/api/addDrive/after`)
        return response
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
        const {data: result}  = await axios.get(`${baseURL}/api/createRaid/disks`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
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
        const {data: result}  = await axios.get(`${baseURL}/api/createRaid/progress`)
        return result
    }catch (error ){
        throw handleAxiosError(error)
    }
}

export async function getRaidStatus(): Promise<RaidStatus>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/createRaid/status`)
        return result
    }catch (error){
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