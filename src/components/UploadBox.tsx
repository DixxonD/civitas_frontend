import React from "react";
import {Group, Text, MantineTheme, useMantineTheme} from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import {Dropzone, DropzoneStatus, FullScreenDropzone, IMAGE_MIME_TYPE} from '@mantine/dropzone';


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
                Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like
            </Text>
        </div>
    </Group>
)


function UploadBox(){
    const theme = useMantineTheme()

    return(
        <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
        >
            {(status => dropzoneChildren(status, theme))}
        </Dropzone>
    )
}

export default UploadBox