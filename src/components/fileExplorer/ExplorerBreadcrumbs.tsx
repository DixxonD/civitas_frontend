import React, {useState, useEffect} from "react";
import {Breadcrumbs, Anchor, Table, Text, Button} from '@mantine/core';
;

type FileDescirption = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescirption[]
}

type Props = {
    files: FileDescirption[]
}

function ExplorerBreadcrumbs({files}: Props){

    const [path, setPath] = useState<string[]>([])
    const [allFiles, setAllFiles] = useState<FileDescirption[]>( files)
    const [content, setContent] = useState<React.ReactElement[]>(() => {return renderList(files)})


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

    function renderList (files: FileDescirption[]) {
        return files.map(file => (
            <tr key={file.name}>
                <td>{getEntry(file)}</td>
            </tr>
        ))
    }

    function getEntry (file: FileDescirption) {
        if(file.type === 'directory'){
            return(
                <Text
                    onClick={() => {setPath(oldPathArr => [...oldPathArr, file.name])}}
                    weight={700}
                >
                {file.name}
                </Text>
            )
        }
        return <Text>{file.name}</Text>
    }

    function goBack(){
        const currPath = [...path]
        currPath.pop()
        setPath(currPath)
    }

    return (
        <>

            <Table >
                <thead>
                <tr>
                    <th>Filename</th>
                </tr>
                </thead>
                <tbody>{content}</tbody>
            </Table>
            <Button onClick={goBack}>back</Button>
        </>
    )
}

export default ExplorerBreadcrumbs