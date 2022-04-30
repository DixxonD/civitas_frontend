import React from "react";
import axios from "axios";
import {server} from "../config/config";

function createDirectory(targetPath: string){
    console.log("create a new Folder at", targetPath)

}

async function fetchFileStructure(){
    return axios.get(`${server.addr}:${server.port}/api/files`)
}

export {fetchFileStructure}
