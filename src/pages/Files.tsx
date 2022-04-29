import React, {useState} from 'react'
import {Button, Title} from '@mantine/core';
import {server} from '../config/config'
import {useUploader} from "../components/upload/UploadContext";
import {DashboardModal} from "@uppy/react";

// @ts-ignore
import FileBrowser from "react-keyed-file-browser"
import Explorer from "../components/fileExplorer/Explorer";
import axios from "axios";
import {FileDescription} from "../config/types";

function Files(){
    const [showModal, setShowModal] = useState(false)
    const [files, setFiles] = useState<FileDescription[]>([]);

    async function fetchFileStructure(): Promise<FileDescription[]>{
        try{
            const result = await axios.get(`${server.addr}:${server.port}/api/files`)
            console.log(result.data)
            return result.data
        }catch (error){
            throw error
        }

    }

    function updateFiles(){
        fetchFileStructure().then(result => {
            setFiles(result)
        }).catch(error => {
            //todo: error message
            console.log("eerrrorr")
            setFiles([])
        })
    }


    const uppy = useUploader()
    return (
        <div>
            <Title order={1}>Files</Title>
            <Button onClick={updateFiles}>Refresh</Button>
            <DashboardModal
                uppy={uppy}
                open={showModal}
                disabled={false}
                hideUploadButton={true}
            />


            <Explorer files={files}/>
        </div>
    )
}

export default Files
//<ExplorerAccordion files={files}/>
// <ExplorerTable files={files}/>