import React, {useEffect, useState} from 'react'
import {Title} from '@mantine/core';
import {server} from '../config/config'
import {useUploader} from "../components/upload/UploadContext";
import {DashboardModal} from "@uppy/react";

// @ts-ignore
import FileBrowser from "react-keyed-file-browser"
import Explorer from "../components/fileExplorer/Explorer";
import axios from "axios";
import {FileDescription} from "../config/types";
import {closeNotification, showLoadingNotification, showErrorNotification} from "../components/AppNotificationProvider";

function Files(){
    const [showModal, setShowModal] = useState(false)
    const [files, setFiles] = useState<FileDescription[]>([]);
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    useEffect( () => {
        updateFiles()
    }, [])

    useEffect(() => {
        if(isUpdating){
            showLoadingNotification('data-load', 'One moment please', 'The latest data is downloaded from the node')
        }else{
            closeNotification('data-load', 'Done')
        }
    }, [isUpdating])

    async function fetchFileStructure(): Promise<FileDescription[]>{
        try{
            setIsUpdating(true)
            const result = await axios.get(`${server.addr}:${server.port}/api/files`)
            setIsUpdating(false)
            return result.data
        }catch (error){
            throw error
        }

    }

    function updateFiles(){
        fetchFileStructure().then(result => {
            setFiles(result)
        }).catch(() => {
            setIsUpdating(false)
            showErrorNotification('Sorry!', 'Something went wrong')
            setFiles([])
        })
    }



    const uppy = useUploader()
    return (
        <div>

            <Title order={1}>Files</Title>
            <DashboardModal
                uppy={uppy}
                open={showModal}
                disabled={false}
                hideUploadButton={true}
            />
            <Explorer files={files} onRefresh={updateFiles}/>
        </div>
    )
}

export default Files
//<ExplorerAccordion files={files}/>
// <ExplorerTable files={files}/>