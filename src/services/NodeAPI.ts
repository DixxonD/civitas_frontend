import {server} from "../config/config";
import {Node, SharedNode} from "../config/types";
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

export async function getAllAvailableNodes(): Promise<Node[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/nodes/available`)
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }
}

export async function getAllMarriedNodes(): Promise<SharedNode[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/nodes/married`)
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


export async function setAsBackupProvider(node: Node, interval: number): Promise<void>{
    try{
        const {data: result} = await axios.post(`${baseURL}/api/nodes`, {...node, interval: interval})
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }

}