import {server} from "../config/config";
import {Node} from "../config/types";
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
        const {data: result} = await axios.get(`${baseURL}/api/nodes`)
        return result
    }catch (error) {
        throw handleAxiosError(error)
    }
}