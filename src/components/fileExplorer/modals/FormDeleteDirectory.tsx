import React from "react";
import PathView from "./PathView";
import {Button, Group, Text} from "@mantine/core";

interface Prop{
    basePath: string,
    onDelete(basePath: string): void,
    onAbort(): void
}

function FormDeleteDirectory({basePath, onDelete, onAbort}: Prop){

    return (
        <>
            <PathView title="Directory to delete:" basePath={basePath}/>
            <Text size='md'>Really delete this folder?</Text>
            <Group position='right'>
                <Button variant="outline" onClick={onAbort}>No</Button>
                <Button onClick={() => onDelete(basePath)} color='red'>Yes, delete</Button>
            </Group>
        </>
    )
}

export default FormDeleteDirectory