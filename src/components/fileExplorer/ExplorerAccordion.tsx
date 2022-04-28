import React, {useState} from "react";
import {Accordion, Text} from "@mantine/core";


type FileDescirption = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescirption[]
}

type Props = {
    files: FileDescirption[] | undefined
}


function ExplorerAccordion({files}: Props){

    const [content, setContent] = useState(() =>  (
        //@ts-ignore
        files.map(file => {
            if(file.type === 'directory'){
                return (<Accordion.Item  label={file.name}>
                            <ExplorerAccordion files={file.contents}/>
                        </Accordion.Item>)
            }
            return (<Accordion.Item label={file.name}/>)
        })
    ))

    return (
        <>
            <Accordion multiple>
                {content}
            </Accordion>

        </>
    )

}

export default ExplorerAccordion