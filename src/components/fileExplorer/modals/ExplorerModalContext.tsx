import React, {useState, useContext, useEffect} from "react";
import ModalChangeFileStructure from "./ModalChangeFileStructure";
import {useFileStructureUpdate, useSelectedPath} from "../ExplorerContext";
import {LoadingOverlay, Text} from "@mantine/core";
import FromAddDirectory from '../modals/FromAddDirectory'
import {DirectoryManipulation, SimpleAxiosError} from "../../../config/types";
import FormDeleteDirectory from "./FormDeleteDirectory";
import {createDirectory, deleteDirectory, fetchFileStructure} from "../../../services/FileManipulator";
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import Uploader from "../../upload/Uploader";
import PathView from "./PathView";

interface Prop {
    children: JSX.Element
}

const AddDirectoryVisibleUpdateContext = React.createContext<Function>(() => {})
const AddFileVisibleUpdateContext = React.createContext<Function>(() => {})
const DeleteDirVisibleUpdateContext = React.createContext<Function>(() => {})
const SelectedDirectoryUpdate = React.createContext<Function>(() => {})


export function ExplorerModalProvider({children}: Prop){
    const path = useSelectedPath()
    const setFiles = useFileStructureUpdate()
    const [addDirVisible, setAddDirVisible] = useState<boolean>(false)
    const [addFileVisible, setAddFileVisible] = useState<boolean>(false)
    const [deleteDirVisible, setDeleteDirVisible] = useState<boolean>(false)
    const [selectedDirectory, setSelectedDirectory] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        if(addFileVisible){
            pathForUpload = getBasePath()
            return
        }
    }, [addFileVisible])

    function getBasePath(): string{
        const firstSlash = path.length === 0 ? '' : '/'
        return firstSlash + path.join('/').concat('/' + selectedDirectory)
    }


    function onCreateNewDirectory(values: DirectoryManipulation){
        setAddDirVisible(false)
        setIsLoading(true)
        createDirectory(values)
            .then(() => {
                updateView()
            }).catch(() => {
                showErrorNotification('Sorry!', 'Could not create the folder')
                setIsLoading(false)
            })
    }

    function onDeleteDirectory(basePath: string){
        setDeleteDirVisible(false)
        setIsLoading(true)
        deleteDirectory(basePath)
            .then(() => {
                updateView()
            }).catch((error: SimpleAxiosError) => {
                showErrorNotification('Sorry!', error.response.data)
                setIsLoading(false)
        })
    }


    function onAbort(){
        setDeleteDirVisible(false)
        setAddDirVisible(false)
    }


    function updateView(){
        fetchFileStructure().then(result => {
            setFiles(result)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
            showErrorNotification('Sorry!', 'Something went wrong')
            setFiles([])
        })
    }

    return (
        <SelectedDirectoryUpdate.Provider value={setSelectedDirectory}>
            <AddDirectoryVisibleUpdateContext.Provider value={setAddDirVisible}>
                <DeleteDirVisibleUpdateContext.Provider value={setDeleteDirVisible}>
                    <AddFileVisibleUpdateContext.Provider value={setAddFileVisible}>
                        <LoadingOverlay visible={isLoading}/>
                        <ModalChangeFileStructure
                            title="Add Folder"
                            visible={addDirVisible}
                            onClose={() => {setAddDirVisible(false)}}
                            content={(
                                <FromAddDirectory
                                    basePath={getBasePath()}
                                    label="Folder name"
                                    placeholder="Name of new folder"
                                    onSubmit={onCreateNewDirectory}
                                    onAbort={onAbort}
                                />
                            )}
                        />
                        <ModalChangeFileStructure
                            title="Delete Folder"
                            visible={deleteDirVisible}
                            onClose={() => {setDeleteDirVisible(false)}}
                            content={(
                                <FormDeleteDirectory
                                    basePath={getBasePath()}
                                    onDelete={onDeleteDirectory}
                                    onAbort={onAbort}
                                />
                            )}
                        />
                        <ModalChangeFileStructure
                            title="Upload Files"
                            visible={addFileVisible}
                            onClose={() => {
                                updateView()
                                setAddFileVisible(false)}}
                            content={(
                                <>
                                    <PathView title="Upload Path:" basePath={getBasePath()}/>
                                    <Uploader />
                                </>
                            )}
                        />
                            {children}
                        </AddFileVisibleUpdateContext.Provider>
                </DeleteDirVisibleUpdateContext.Provider>
            </AddDirectoryVisibleUpdateContext.Provider>
        </SelectedDirectoryUpdate.Provider>
    )
}

export function useSelectedDirectoryUpdate(){
    return useContext(SelectedDirectoryUpdate)
}

export function useAddDirVisibleUpdate(){
    return useContext(AddDirectoryVisibleUpdateContext)
}

export function useAddFileVisibleUpdate(){
    return useContext(AddFileVisibleUpdateContext)
}

export function useDeleteDirVisibleUpdate(){
    return useContext(DeleteDirVisibleUpdateContext)
}

let pathForUpload = ''
export function getPathForUpload(){
    return pathForUpload
}