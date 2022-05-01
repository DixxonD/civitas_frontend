import React from "react";
import { Menu, Divider } from '@mantine/core';
import {
    Trash,
    FolderPlus,
    Upload
} from 'tabler-icons-react';
import {useDisclosure} from "@mantine/hooks";
import {
    useAddDirVisibleUpdate,
    useAddFileVisibleUpdate, useDeleteDirVisibleUpdate,
    useSelectedDirectoryUpdate
} from "./modals/ExplorerModalContext";

interface Prop {
    dirName: string,
}

function ExplorerElementMenu({ dirName}: Prop){

    const [opened, handlers] = useDisclosure(false)
    const setAddDirVisible = useAddDirVisibleUpdate()
    const setDeleteDirVisible = useDeleteDirVisibleUpdate()
    const setAddFileVisible = useAddFileVisibleUpdate()
    const setSelectedDir = useSelectedDirectoryUpdate()

    const iconSize = 18

    return (
        <>

        <Menu opened={opened} onOpen={handlers.open} onClose={handlers.close}>
            <Menu.Label>Create</Menu.Label>

            <Menu.Item
                icon={<FolderPlus size={iconSize}/>}
                onClick={() => {
                    setAddDirVisible(true)
                    setSelectedDir(dirName)
                }}
            >
                Add Folder
            </Menu.Item>

            <Menu.Item
                icon={<Upload size={iconSize}/>}
                onClick={() =>{
                    setAddFileVisible(true)
                    setSelectedDir(dirName)
                }}
            >
                Upload Files
            </Menu.Item>

            <Divider/>

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
                color={'red'}
                icon={<Trash size={iconSize}/>}
                onClick={() => {
                    setDeleteDirVisible(true)
                    setSelectedDir(dirName)
                }}
            >Delete Folder</Menu.Item>
        </Menu>
        </>
    )
}

export default ExplorerElementMenu