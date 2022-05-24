import {server} from "../config/config";
import {Node, RaidStatus, StorageProvider, StorageSupplier} from "../config/types";
import axios from "axios";
import {handleAxiosError} from "./utils";

const baseURL = `${server.prefix}${server.addr}:${server.port}`


export async function getOwnNodeInformation(): Promise<Node>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/discover`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function updateNodeInformation(node: Node): Promise<void>{
    try{
        await axios.post(`${baseURL}/api/node`, node)
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function getLocalStorage(): Promise<RaidStatus[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/local`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function getStorageProviders(): Promise<StorageProvider[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/providers`)
        return result.map((node: any) => {
            node.lastBackup = new Date(node.lastBackup)
            return node
        })
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function getStorageSuppliers(): Promise<StorageSupplier[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/suppliers`)
        return result
            .map((node: any) => {
                node.lastSeen = new Date(node.lastSeen)
                return node
            })

    }catch (error) {
        console.log(error)
        throw handleAxiosError(error)
    }
}

export async function getAllAvailableNodes(): Promise<Node[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/all`)
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }
}



export async function setAsBackupProvider(node: Node, interval: number): Promise<void>{
    try{
        const {data: result} = await axios.post(`${baseURL}/api/nodes`, {...node, interval: interval})
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }

}

export async function provideDisk(supplierNodeID: string, diskID: string){
    try{
        await axios.post(`${baseURL}/api/node/provideDisk`, {supplierNodeID: supplierNodeID, diskID: diskID})
    }catch (error) {
        throw handleAxiosError(error)
    }
}