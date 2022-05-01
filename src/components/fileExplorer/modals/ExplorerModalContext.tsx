import React, {useState, useContext} from "react";
import ModalChangeFileStructure from "./ModalChangeFileStructure";
import {useSelectedPath} from "../ExplorerContext";
import {Text} from "@mantine/core";

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


    return (
        <SelectedDirectoryUpdate.Provider value={setSelectedDirectory}>
            <AddDirectoryVisibleUpdateContext.Provider value={setAddDirVisible}>
                <DeleteDirVisibleUpdateContext.Provider value={setDeleteDirVisible}>
                    <AddFileVisibleUpdateContext.Provider value={setAddFileVisible}>
                        <ModalChangeFileStructure
                            visible={addDirVisible}
                            title="Add Folder"
                            onClose={() => {setAddDirVisible(false)}}
                            content={(
                                <Text>{`${path.toString()}/${selectedDirectory}`}</Text>
                            )}
                        />
                        <ModalChangeFileStructure
                            visible={deleteDirVisible}
                            title="Delete Folder"
                            onClose={() => {setDeleteDirVisible(false)}}
                            content={(
                                <Text>{`${path.toString()}/${selectedDirectory}`}</Text>
                            )}
                        />
                        <ModalChangeFileStructure
                            visible={addFileVisible}
                            title="Add File"
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