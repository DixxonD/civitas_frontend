import React from "react";
import axios from "axios";
import {server} from "../config/config";
import {DirectoryManipulation} from "../config/types";

const baseURL = `${server.prefix}${server.addr}:${server.port}`

async function isStorageInitialized(): Promise<boolean>{
    return (await axios.get(`${baseURL}/api/storage`)).data.isInitialized
}

function createDirectory(values: DirectoryManipulation){
    return axios.post(`${baseURL}/api/directory`,values)
}

async  function deleteDirectory(basePath: string){
    return axios.delete(`${baseURL}/api/directory`, {
        data: {
            path: basePath
        }
    })
}

async function fetchFileStructure(){
    return (await axios.get(`${baseURL}/api/files`)).data
}

async function setUploadDirectory(target: string){
    return axios.post(`${baseURL}/api/uploadDir`, {path: target})
}

async function fetchFile(target: string){
    return axios.get(`${baseURL}/api/file/${target}`,{responseType: 'blob'})
}

async function deleteFile(target: string){
    return axios.delete(`${baseURL}/api/file`, {data: {path: target}})
}

export {fetchFileStructure, fetchFile, createDirectory, deleteDirectory, setUploadDirectory, deleteFile, isStorageInitialized}
