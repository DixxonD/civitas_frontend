import {server} from "../config/config";
import axios from "axios";
import {handleAxiosError} from "./utils";
import {RaidStatus} from "../config/types";

const baseURL = `${server.prefix}${server.addr}:${server.port}`


export async function getAllPools(): Promise<RaidStatus[]>{
    try{
        const {data: result} = await axios.get(`${baseURL}/api/dashboard/pools`)
        return result
    }catch (error){
        throw handleAxiosError(error)
    }
}

