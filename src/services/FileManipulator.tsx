import React from "react";
import axios from "axios";
import {server} from "../config/config";
import {DirectoryManipulation} from "../config/types";

const baseURL = `http://${server.addr}:${server.port}`

function createDirectory(values: DirectoryManipulation){
    return axios.post(`${baseURL}/api/directory`,values)
}

async  function deleteDirectory(basePath: string){
    return axios.delete(`${baseURL}/api/directory`, {
        data: {
            basePath: basePath
        }
    })
}

async function fetchFileStructure(){
    return (await axios.get(`${baseURL}/api/files`)).data
}

async function setUploadDirectory(target: string){
    return axios.post(`${baseURL}/api/uploadDir`, {target: target})
}

async function fetchFile(target: string){
    return axios.get(`${baseURL}/api/file/${target}`,{responseType: 'blob'})
}

async function deleteFile(target: string){
    return axios.delete(`${baseURL}/api/file`, {data: {target: target}})
}

export {fetchFileStructure, fetchFile, createDirectory, deleteDirectory, setUploadDirectory, deleteFile}
