import {server} from "../config/config";
import axios from "axios";
import {handleAxiosError} from "./utils";
import {RsyncProgressState} from "../config/types";

const baseURL = `${server.prefix}${server.addr}:${server.port}`




export async function reconnectDrive(pool: string): Promise<boolean>{
    const poolPath = removeSlash(pool)
    try{
        const {data: result} = await axios.get(`${baseURL}/api/pool/${poolPath}/reconnect`)
        return result.success
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function replaceDrive(pool: string, diskId: string): Promise<boolean>{
    const poolPath = removeSlash(pool)
    try{
        const {data: result} = await axios.get(`${baseURL}/api/pool/${poolPath}/replace/${diskId}`)
        return result.success
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function restoreRemoteBackup(): Promise<void>{
    try{
        await axios.get(`${baseURL}/api/pool/restore`)
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function getRsyncProgress(): Promise<RsyncProgressState>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/sync/progress`)
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }
}

 const removeSlash = (path: string) =>  path.charAt(0) === '/' ?  path.substring(1) : path
