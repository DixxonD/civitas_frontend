import React, {useState, useEffect} from "react";
import { Badge } from '@mantine/core';
import ExplorerElement from "./ExplorerElement";
import ExplorerHeader from "./ExplorerHeader";
import {FileDescription} from "../../config/types";
import {useSelectedPath, useSelectedPathUpdate} from "./ExplorerContext";


interface Props  {
    files: FileDescription[],
    onRefresh(): void
}

function Explorer({files, onRefresh}: Props){
    const path = useSelectedPath()
    const setPath = useSelectedPathUpdate()

    const [content, setContent] = useState<React.ReactElement[]>(() => {return renderList(files)})
    const [showBackButton, setShowBackButton] = useState<boolean>(false)

    useEffect(() => {
        updateView(files)
        setShowBackButton(path.length > 0)
    }, [path])


    useEffect(() => {
        updateView(files)
     }, [files])

    function updateView(files: FileDescription[]){

        if(path.length === 0){
            setContent(renderList(files))
        }

        let subSet: FileDescription[] = files
        path.forEach(dir => {
            const data =  subSet.filter(element => element.name === dir)
            if(data.length > 0){
                const contents = data[0].contents
                subSet = contents ? contents : []
            }
            setContent(renderList(subSet))
        })
    }

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
                <td ><ExplorerElement fileDescription={file} onClick={onItemClick} /></td>
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
                onRefresh={onRefresh}
                showBackButton={showBackButton}
                path={path}
            />
            <table width={'100%'} >
                <tbody>{content}</tbody>
                { content.length === 0 &&
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Badge color="gray" size="xl" radius="lg"> Empty Directory</Badge>
                    </div>
                }
            </table>
            </>
    )
}

export default Explorer