import React, {useCallback} from "react";
import {useTus} from "use-tus";

import {Group, Text, MantineTheme, useMantineTheme, Button} from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import {Dropzone, DropzoneStatus, FullScreenDropzone, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import files from "../pages/Files";
import {server} from "../config/config";
import {UppyFile} from "@uppy/core";


function getIconColor(status: DropzoneStatus, theme: MantineTheme){
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
        ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({status, ...props}: React.ComponentProps<TablerIcon> & {status: DropzoneStatus}){
    if(status.accepted){
        return <Upload {...props}/>
    }
    if(status.rejected){
        return <X {...props}/>
    }
    return <Photo {...props}/>
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group
        position="center"
        spacing="xl"
        style={{
            minHeight: 220,
            pointerEvents: 'none'
    }}>
        <ImageUploadIcon
            status={status}
            style={{color: getIconColor(status, theme)}}
            size={80}
        />
        <div>
            <Text size="xl" inline>
                Drag files here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like
            </Text>
        </div>
    </Group>
)



function UploadBox(){
    const theme = useMantineTheme()
    const {upload, setUpload} = useTus()



    const handleSetUpload = useCallback((files: File[]) => {
        files.forEach(file => {
            setUpload(file, {
                endpoint: `${server.addr}:${server.port}/api/upload`,
                metadata: {
                    filename: file.name,
                    filetype: file.type
                }
            })
            console.log(file.name)
        })
        console.log("setUpload")

    }, [setUpload] )

    const handleStart = useCallback(() => {
        if (!upload) {
            return;
        }
        upload.start()
    }, [upload]);


    return(
        <div>
            <Dropzone
                onDrop={(files) => {}}
                onReject={(files) => console.log("rejected files", files)}
            >
                {(status => dropzoneChildren(status, theme))}
            </Dropzone>


        </div>
    )
}

export default UploadBox