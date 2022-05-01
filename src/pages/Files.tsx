import React, {useEffect, useState} from 'react'
import {Title} from '@mantine/core';
import {Skeleton} from "@mantine/core";

import Explorer from "../components/fileExplorer/Explorer";

import {closeNotification, showErrorNotification, showLoadingNotification} from "../services/AppNotificationProvider";
import {
    useFileStructure,
    useFileStructureUpdate,
} from "../components/fileExplorer/ExplorerContext";
import {fetchFileStructure} from "../services/FileManipulator";

function Files(){
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const files = useFileStructure()
    const setFiles = useFileStructureUpdate()

    useEffect( () => {
        if(files.length === 0){
            updateFileStructure()
        }
    }, [])



    useEffect(() => {
        if(isUpdating){
            showLoadingNotification('data-load', 'One moment please', 'The latest data is downloaded from the node')
        }else{
            closeNotification('data-load', 'Done')
        }
    }, [isUpdating])


    function updateFileStructure(){
        setIsUpdating(true)
        fetchFileStructure()
            .then(response => {
                setFiles(response.data)
                setIsUpdating(false)
            }).catch(()  => {
            setIsUpdating(false)
            showErrorNotification('Sorry!', 'Something went wrong')
            setFiles([])
        })
    }


    /*
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

     */
/*
    function updateFiles(){
        fetchFileStructure().then(result => {
            setFiles(result)
        }).catch(() => {
            setIsUpdating(false)
            showErrorNotification('Sorry!', 'Something went wrong')
            setFiles([])
        })
    }

 */



    return (
        <div className='content'>

            <Title order={1}>Files</Title>
            <Skeleton visible={isUpdating}>
                <Explorer files={files} onRefresh={updateFileStructure}/>
            </Skeleton>
        </div>
    )
}

export default Files
//<ExplorerAccordion files={files}/>
// <ExplorerTable files={files}/>