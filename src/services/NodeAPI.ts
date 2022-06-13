import {server} from "../config/config";
import {Node, RaidStatus, StorageProvider, StorageSupplier} from "../config/types";
import axios from "axios";
import {enableSelfSignedSSL, handleAxiosError} from "./utils";

const baseURL = `${server.prefix}${server.addr}:${server.port}`
const remoteURL = (remoteIP: string) => `${server.prefix}${remoteIP}:${server.port}`

export async function getOwnNodeInformation(): Promise<Node>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/discover`, enableSelfSignedSSL)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function updateNodeInformation(node: Node): Promise<void>{
    try{
        await axios.post(`${baseURL}/api/node`, node, enableSelfSignedSSL)
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function getLocalStorage(): Promise<RaidStatus[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/local`, enableSelfSignedSSL)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

export async function getStorageProviders(): Promise<StorageProvider[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/node/providers`, enableSelfSignedSSL)
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

export async function getRemoteDiskState(ownNodeID: string, remoteIP: string): Promise<string>{
    try {
        const {data: result} = await axios.get(`${remoteURL(remoteIP)}/api/marry/providerStatus?nodeID=${ownNodeID}`)
        return result.disk_state
    }catch (error){
        throw handleAxiosError(error)
    }
}