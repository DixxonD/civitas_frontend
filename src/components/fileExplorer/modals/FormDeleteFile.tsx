import React from "react";
import PathView from "./PathView";
import {Button, Group, Text} from "@mantine/core";

interface Prop{
    basePath: string,
    isDirectory: boolean,
    onDelete(basePath: string): void,
    onAbort(): void
}

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