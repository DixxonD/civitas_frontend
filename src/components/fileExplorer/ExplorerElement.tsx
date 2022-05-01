import React, {useState} from "react";
import {Box, Text} from '@mantine/core';

import {BsDownload, BsFillTrashFill, BsFolder} from 'react-icons/bs'
import {FileDescription} from "../../config/types";
import ExplorerElementMenu from "./ExplorerElementMenu";


interface Prop {
    fileDescription: FileDescription,
    onClick(file: FileDescription): void,
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

function ExplorerElement({fileDescription, onClick}: Prop){

    const [file, setFile] = useState<FileDescription>(fileDescription)

    function getExplorerElement(file: FileDescription){
        return file.type === 'directory' ?
            <ExplorerElementDirectory
                dirName={file.name}
                onClick={() => onClick(file)}
                menuElement={(
                    <ExplorerElementMenu dirName={file.name}/>
                )}
            /> :
            <ExplorerElementFile fileName={file.name}/>
    }

    return(
        <>
            <div style={{marginTop: '5px', flexDirection: 'row', display: 'flex', width: '100%'}}>
                {getExplorerElement(file)}
            </div>
        </>
    )
}



function ExplorerElementFile({fileName}: PropFile){
    return (
        <Box
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '8px'}}
            sx={(theme) => ({
                backgroundColor:  theme.colors.gray[2],
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
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.colors.gray[1],
                },
            })}
        >
                <div
                    style={{ padding: '8px',display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',width: '100%'}}
                    onClick={onClick}
                >
                    <BsFolder  style={styleIcon} size={iconSize}/>
                    <Text>{dirName}</Text>
                </div>
                <div style={{padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    {menuElement}
                </div>

        </Box>
    )
}



export default ExplorerElement

