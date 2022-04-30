import React, {useState, useContext, Dispatch, SetStateAction} from "react";
import {FileDescription} from "../../config/types";
import {fetchFileStructure} from "../../services/FileManipulator";
import {showErrorNotification} from "../../services/AppNotificationProvider";

const FilesContext = React.createContext<FileDescription[]>([])
const FilesUpdateContext = React.createContext<Function>(() => {})
const PathContext = React.createContext<string[]>([])
const PathUpdateContext = React.createContext<Dispatch<SetStateAction<string[]>>>(() => {})

const IsUpdatingContext = React.createContext<boolean>(false) //delete?
const IsUpdatingUpdateContext = React.createContext<Function>(() => {}) //delete?


interface Props{
    children: JSX.Element
}

export function ExplorerProvider({children}: Props){

    const [fileStructure, setFileStructure] = useState<FileDescription[]>([])
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [path, setPath] = useState<string[]>([])


    return (
        <FilesContext.Provider value={fileStructure}>
            <FilesUpdateContext.Provider value={setFileStructure}>
                <IsUpdatingContext.Provider value={isUpdating}>
                    <IsUpdatingUpdateContext.Provider value={setIsUpdating}>
                        <PathContext.Provider value={path}>
                            <PathUpdateContext.Provider value={setPath}>
                                {children}
                            </PathUpdateContext.Provider>
                        </PathContext.Provider>
                    </IsUpdatingUpdateContext.Provider>
                </IsUpdatingContext.Provider>
            </FilesUpdateContext.Provider>
        </FilesContext.Provider>
    )

}


export function useFileStructure(){
    return useContext(FilesContext)
}

export function useFileStructureUpdate(){
    return useContext(FilesUpdateContext)
}

export function useSelectedPath(){
    return useContext(PathContext)
}

export function useSelectedPathUpdate(){
    return useContext(PathUpdateContext)
}

//delete?
export function useIsUpdating(){
    return useContext(IsUpdatingContext)
}

//delete?
export function useIsUpdatingUpdate(){
    return useContext(IsUpdatingUpdateContext)
}