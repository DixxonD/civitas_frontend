import React, {useState} from "react";
import {Box, Modal, Text} from '@mantine/core';

import {BsDownload, BsFillTrashFill, BsFolder} from 'react-icons/bs'
import {FileDescription} from "../../config/types";
import ExplorerElementMenu from "./ExplorerElementMenu";
import ModalAddDirectory from "./modals/ModalAddDirectory";
import ModalDeleteDirectory from "./modals/ModalDeleteDirectory";
import ModalUploadFiles from "./modals/ModalUploadFiles";


interface Prop {
    fileDescription: FileDescription,
    onClick(file: FileDescription): void,
    path: string[]
}

interface PropFile {
    fileName: string
}

interface PropDir {
    dirName: string,
    onClick(): void,
    menuElement: JSX.Element
}

const styleIcon = {marginRight: '1em', cursor: 'pointer'}
const iconSize = '1.8em'

function ExplorerElement({fileDescription, onClick, path}: Prop){

    const [file, setFile] = useState<FileDescription>(fileDescription)
    const [showCreateDirectory, setShowCreateDirectory] = useState<boolean>(false)
    const [showDeleteDirectory, setShowDeleteDirectory] = useState<boolean>(false)
    const [showUploadFiles, setShowUploadFiles] = useState<boolean>(false)
    const [selectedDirectory, setSelectedDirectory] = useState<string>("")

    function onCreateDirectory(dirName: string){
        setSelectedDirectory(dirName)
        setShowCreateDirectory(true)
    }

    function onDeleteDirectory(dirName: string){
        setSelectedDirectory(dirName)
        setShowDeleteDirectory(true)
    }

    function onUploadFiles(dirName: string){
        setSelectedDirectory(dirName)
        setShowUploadFiles(true)
    }

    function getExplorerElement(file: FileDescription){
        return file.type === 'directory' ?
            <ExplorerElementDirectory
                dirName={file.name}
                onClick={() => onClick(file)}
                menuElement={(
                    <ExplorerElementMenu
                        dirName={file.name}
                        onUploadFiles={onUploadFiles}
                        onDeleteDirectory={onDeleteDirectory}
                        onCreateDirectory={onCreateDirectory}/>
                )}
            /> :
            <ExplorerElementFile fileName={file.name}/>
    }

    return(
        <>
            <ModalAddDirectory visible={showCreateDirectory} basePath={path} dirName={selectedDirectory}/>
            <ModalDeleteDirectory visible={showDeleteDirectory} basePath={path} dirName={selectedDirectory}/>
            <ModalUploadFiles visible={showUploadFiles} basePath={path} dirName={selectedDirectory}/>
            <div style={{marginTop: '5px', flexDirection: 'row', display: 'flex', width: '100%'}}>
                {getExplorerElement(file)}
            </div>
        </>
    )
}



function ExplorerElementFile({fileName}: PropFile){
    return (
        <Box
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}
            sx={(theme) => ({
                backgroundColor:  theme.colors.gray[2],
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
            })}
        >
            <Text>
                {fileName}
            </Text>
            <div>
                <BsDownload style={styleIcon} size={iconSize}/>
                <BsFillTrashFill style={styleIcon} size={iconSize}/>

            </div>
        </Box>
    )
}

function ExplorerElementDirectory({dirName, onClick, menuElement}: PropDir){
    return (
        <Box
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}
            sx={(theme) => ({
                backgroundColor:  theme.colors.gray[3],
                textAlign: 'left',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.colors.gray[1],
                },
            })}
        >
            <div
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',width: '100%'}}
                onClick={onClick}
            >
                <BsFolder  style={styleIcon} size={iconSize}/>
                <Text>{dirName}</Text>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                {menuElement}
            </div>
        </Box>
    )
}



export default ExplorerElement

