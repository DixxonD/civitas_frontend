import React, {useEffect, useState} from 'react'
import {Title, Alert} from '@mantine/core';
import {Skeleton} from "@mantine/core";

import Explorer from "../components/fileExplorer/Explorer";

import {closeNotification, showErrorNotification, showLoadingNotification} from "../services/AppNotificationProvider";
import {useFileStructure, useFileStructureUpdate,} from "../components/fileExplorer/ExplorerContext";
import {fetchFileStructure, isStorageInitialized} from "../services/FileManipulator";
import {AlertCircle} from "tabler-icons-react";

function Files(){
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [isInitialized, setIsInitialized] = useState<boolean>(true)
    const files = useFileStructure()
    const setFiles = useFileStructureUpdate()

    useEffect(  () => {
        if(files.length === 0){
            setIsUpdating(true)
            isStorageInitialized().then(isInitialized => {
                if(isInitialized){
                    setIsInitialized(true)
                    updateFileStructure()
                }else{
                    setIsInitialized(false)
                    setIsUpdating(false)
                }
            }).catch( error => {
                showErrorNotification('Sorry!', error.message)
                setIsUpdating(false)
            })
        }
    }, [])


    useEffect(() => {
        if(isUpdating){
            showLoadingNotification('data-load', 'One moment please', 'The latest data is downloaded from the node')
        }else{
            closeNotification('data-load')
        }
    }, [isUpdating])


    function updateFileStructure(){
        setIsUpdating(true)
        fetchFileStructure()
            .then(response => {
                setFiles(response)
                setIsUpdating(false)
            }).catch(()  => {
                setIsUpdating(false)
                showErrorNotification()
                setFiles([])
        })
    }

    return (
        <div className='content'>

            <Title order={1}>Files</Title>
            <Skeleton visible={isUpdating}>
                { isInitialized ? <Explorer files={files} onRefresh={updateFileStructure}/> : <StorageNotInitialized/>}
            </Skeleton>
        </div>
    )
}

export default Files


function StorageNotInitialized(){
    return (
        <Alert
            icon={<AlertCircle size={24}/>} title='Storage not yet initialized' color='red'>
            The primary memory is not yet initialized. Navigate to the Storage Configuration Section to add disks to the system.
        </Alert>
    )
}
