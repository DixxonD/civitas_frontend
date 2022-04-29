import React, {useState, useEffect} from "react";
import { Text } from '@mantine/core';
import ExplorerElement from "./ExplorerElement";
import ExplorerHeader from "./ExplorerHeader";
import {FileDescription} from "../../config/types";


type Props = {
    files: FileDescription[]
}

function Explorer({files}: Props){

    const [path, setPath] = useState<string[]>([])
    const [allFiles, setAllFiles] = useState<FileDescription[]>( files)
    const [content, setContent] = useState<React.ReactElement[]>(() => {return renderList(files)})
    const [showBackButton, setShowBackButton] = useState<boolean>(false)

    useEffect(() => {
        if(path.length === 0){
            setContent(renderList(allFiles))
        }
        let subSet = allFiles
        path.forEach(dir => {
            const data =  subSet.filter(element => element.name === dir)
            if(data.length > 0){
                // @ts-ignore
                subSet = data[0].contents
            }
            setContent(renderList(subSet))
        })
    }, [path])

    useEffect(() => {
        setShowBackButton(path.length > 0)
    }, [path])

    useEffect(() => {
        setAllFiles(files)
        setPath([])
    }, [files])

    function sortFileDescriptions(a: FileDescription, b: FileDescription): number {
        if(a.type === b.type){
            return (a.type).localeCompare(b.name)
        }
        if(a.type === 'directory') return -1
        return 1
    }

    function renderList (files: FileDescription[]) {
        return files.sort(sortFileDescriptions)
            .map(file => (
            <tr key={file.name}>
                <td ><ExplorerElement fileDescription={file} onClick={onItemClick}/></td>
            </tr>
        ))
    }


    function goBack(): void{
        const currPath = [...path]
        currPath.pop()
        setPath(currPath)
    }

    function goBackTo(index: number): void{
        setPath(path => path.slice(0, index))
    }

    function onItemClick(file: FileDescription){
        if(file.type === 'directory'){
            setPath(oldPathArr => [...oldPathArr, file.name])
        }
    }

    return (
        <>
            <ExplorerHeader
                onBack={goBack}
                onClick={goBackTo}
                showBackButton={showBackButton}
                path={path}
            />
            <table width={'100%'} >
                <tbody>{content}</tbody>
            </table>

            <Text onClick={goBack}>back</Text>
        </>
    )
}

export default Explorer