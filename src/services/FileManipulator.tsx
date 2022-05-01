import React from "react";
import axios from "axios";
import {server} from "../config/config";
import {DirectoryManipulation} from "../config/types";

function createDirectory(values: DirectoryManipulation){
    console.log("create a new Folder at", values.basePath, values.name)
    return axios.post(`${server.addr}:${server.port}/api/directory`,values)

}

async function fetchFileStructure(){
    return (await axios.get(`${server.addr}:${server.port}/api/files`)).data
}



export {fetchFileStructure, createDirectory}
