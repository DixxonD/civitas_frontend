import React from "react";
import PathView from "./PathView";
import {Button, Group, Text} from "@mantine/core";

interface Prop{
    basePath: string,
    isDirectory: boolean,
    onDelete(basePath: string): void,
    onAbort(): void
}

/**
 * Dialogue to delete a file
 * @param basePath Defines in which directory a folder is to be created.
 * @param onDelete Function to delete file
 * @param onAbort Function to cancel
 * @param isDirectory
 */
function FormDeleteFile({basePath, onDelete, onAbort, isDirectory}: Prop){
    const type = isDirectory? 'Directory' : 'File'

    return (
        <>
            <PathView title={`${type} to delete:`} basePath={basePath}/>
            <Text size='md'>{`Really delete this ${type.toLowerCase()}?`}</Text>
            <Group position='right'>
                <Button variant="outline" onClick={onAbort}>No</Button>
                <Button onClick={() => onDelete(basePath)} color='red'>Yes, delete</Button>
            </Group>
        </>
    )
}

export default FormDeleteFile