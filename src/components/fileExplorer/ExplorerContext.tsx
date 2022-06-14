import React, {useState, useContext, Dispatch, SetStateAction} from "react";
import {FileDescription} from "../../config/types";


const FilesContext = React.createContext<FileDescription[]>([])
const FilesUpdateContext = React.createContext<Function>(() => {})
const PathContext = React.createContext<string[]>([])
const PathUpdateContext = React.createContext<Dispatch<SetStateAction<string[]>>>(() => {})

interface Props{
    children: JSX.Element
}

/**
 * Global context, so that the list of all files/folders and the selected directory can be accessed by all components and the lists can be kept in memory during the entire runtime.
 */
export function ExplorerProvider({children}: Props){

    const [fileStructure, setFileStructure] = useState<FileDescription[]>([])
    const [path, setPath] = useState<string[]>([])


    return (
        <FilesContext.Provider value={fileStructure}>
            <FilesUpdateContext.Provider value={setFileStructure}>
                <PathContext.Provider value={path}>
                    <PathUpdateContext.Provider value={setPath}>
                        {children}
                    </PathUpdateContext.Provider>
                </PathContext.Provider>
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

