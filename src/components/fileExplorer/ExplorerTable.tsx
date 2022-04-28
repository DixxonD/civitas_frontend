import React, {useState} from "react";
import { Table, Button, Collapse } from '@mantine/core';

type FileDescription = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescription[]
}

type Props = {
    files: FileDescription[] | undefined
}

interface ShowState {
    [name: string]: boolean
}

function ExplorerTable({files}: Props){

    const [content, setContent] = useState(files)
    const [showSubDir, setShowSubDir] = useState<ShowState>({})


    // @ts-ignore
    const elements = content.map(file => (
        <>
        <tr key={file.name}>
            <td>{file.name}</td>
            <td><Button onClick={() => toggleExpand(file.name)} >Toggle</Button></td>
        </tr>
        { file.type === 'directory' &&
            <Collapse in={isShowSubDir(file.name)}>
                <ExplorerTable files={file.contents}/>
            </Collapse>
        }
        </>

    ))



    const toggleExpand = (directoryName: string) => {
        if(directoryName in showSubDir){
            showSubDir[directoryName] = !showSubDir[directoryName]
            setShowSubDir({...showSubDir })
        }else{
            console.log("set true")
            showSubDir[directoryName] = true
            setShowSubDir({...showSubDir})
            //setShowSubDir({...showSubDir, directoryName: true })
        }
    }

    function isShowSubDir  (directoryName: string): boolean {
        if(directoryName in showSubDir) {
            console.log("return ", showSubDir[directoryName])
            return showSubDir[directoryName]
        }else{
            console.log("dont show")
            return false
        }

    }


    return(
        <>
            <Table >
                <thead>
                <tr>
                    <th>Filename</th>
                    <th>Toggle</th>
                </tr>
                </thead>
                <tbody>{elements}</tbody>
            </Table>
        </>
    )
}

export default ExplorerTable