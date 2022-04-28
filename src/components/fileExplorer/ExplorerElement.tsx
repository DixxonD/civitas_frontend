import React, {useState} from "react";
import {Box, CSSObject, MantineTheme, Text} from '@mantine/core';
import {FileDescription} from "./Explorer";
import {BsDownload, BsFillTrashFill, BsFolder} from 'react-icons/bs'


interface Prop {
    fileDescription: FileDescription,
    onClick: Function
}

function ExplorerElement({fileDescription, onClick}: Prop){

    const [file, setFile] = useState<FileDescription>(fileDescription)
    
    return(
        <div
            style={{marginTop: '5px'}}
            onClick={() => onClick(file)}
        >
            {file.type === 'directory' ? <ExplorerElementDirectory fileName={file.name}/> : <ExplorerElementFile fileName={file.name}/>}
        </div>
        )
}

type PropFile = {
    fileName: string
}


function ExplorerElementFile({fileName}: PropFile){
    return (
        <Box
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
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

function ExplorerElementDirectory({fileName}: PropFile){
    return (
        <Box
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}
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
            <BsFolder  style={styleIcon} size={iconSize}/>
            <Text>
                {fileName}
            </Text>
        </Box>
    )
}

const styleIcon = {
    marginRight: '1em', cursor: 'pointer'
}
const iconSize = '1.8em'

export default ExplorerElement

