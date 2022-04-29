import React, {useState} from "react";
import { Menu, Divider, Modal } from '@mantine/core';
import {
    Trash,
    FolderPlus,
    Upload
} from 'tabler-icons-react';
import {useDisclosure} from "@mantine/hooks";

interface Prop {
    dirName: string,
    onDeleteDirectory(dirName: string): void,
    onCreateDirectory(dirName: string): void,
    onUploadFiles(dirName: string): void
}

function ExplorerElementMenu({onCreateDirectory, onDeleteDirectory, onUploadFiles, dirName}: Prop){

    const [opened, handlers] = useDisclosure(false)

    return (
        <>

        <Menu opened={opened} onOpen={handlers.open} onClose={handlers.close}>
            <Menu.Label>Create</Menu.Label>

            <Menu.Item
                icon={<FolderPlus size={18}/>}
                onClick={() => onCreateDirectory(dirName)}
            >
                Add Folder
            </Menu.Item>

            <Menu.Item
                icon={<Upload size={18}/>}
                onClick={() => onUploadFiles(dirName)}
            >
                Upload Files
            </Menu.Item>

            <Divider/>

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
                color={'red'}
                icon={<Trash size={18}/>}
                onClick={() => onDeleteDirectory(dirName)}
            >Delete Folder</Menu.Item>
        </Menu>
        </>
    )
}

export default ExplorerElementMenu