import {server} from "../config/config";
import {BuildProgress, RaidStatus, StorageDeviceDescription} from "../config/types";
import axios from "axios";
import {handleAxiosError} from "./utils";

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
        const {data: result}  = await axios.get(`${baseURL}/api/localRaid/disks`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function buildRaid(selectedIDs: string[]){
    try{
        await axios.post(`${baseURL}/api/localRaid/build`, selectedIDs)
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function getBuildProgress(): Promise<BuildProgress>{
    try{
        const {data: result}  = await axios.get(`${baseURL}/api/localRaid/progress`)
        return result
    }catch (error ){
        throw handleAxiosError(error)
    }
}

export async function getPrimaryRaidStatus(): Promise<RaidStatus>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/localRaid/status`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

