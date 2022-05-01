import React, {useState, useContext} from "react";
import ModalChangeFileStructure from "./ModalChangeFileStructure";
import {useSelectedPath} from "../ExplorerContext";
import {Text} from "@mantine/core";
import FromAddDirectory from '../modals/FromAddDirectory'
import {FormValuesAddFile} from "../../../config/types";

interface Prop {
    children: JSX.Element
}

const AddDirectoryVisibleUpdateContext = React.createContext<Function>(() => {})
const AddFileVisibleUpdateContext = React.createContext<Function>(() => {})
const DeleteDirVisibleUpdateContext = React.createContext<Function>(() => {})
const SelectedDirectoryUpdate = React.createContext<Function>(() => {})


export function ExplorerModalProvider({children}: Prop){
    const path = useSelectedPath()
    const [addDirVisible, setAddDirVisible] = useState<boolean>(false)
    const [addFileVisible, setAddFileVisible] = useState<boolean>(false)
    const [deleteDirVisible, setDeleteDirVisible] = useState<boolean>(false)
    const [selectedDirectory, setSelectedDirectory] = useState<string>("")

    function getBasePath(): string{
        return '/'.concat(path.join('/').concat(selectedDirectory))
    }

    function onCreateNewDirectory(values: FormValuesAddFile){
        console.log(values)
    }



    return (
        <SelectedDirectoryUpdate.Provider value={setSelectedDirectory}>
            <AddDirectoryVisibleUpdateContext.Provider value={setAddDirVisible}>
                <DeleteDirVisibleUpdateContext.Provider value={setDeleteDirVisible}>
                    <AddFileVisibleUpdateContext.Provider value={setAddFileVisible}>
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
                                />
                            )}
                        />
                        <ModalChangeFileStructure
                            title="Delete Folder"
                            visible={deleteDirVisible}
                            onClose={() => {setDeleteDirVisible(false)}}
                            content={(
                                <Text>{`${path.toString()}/${selectedDirectory}`}</Text>
                            )}
                        />
                        <ModalChangeFileStructure
                            title="Upload Files"
                            visible={addFileVisible}
                            onClose={() => {setAddFileVisible(false)}}
                            content={(
                                <Text>{`${path.toString()}/${selectedDirectory}`}</Text>
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