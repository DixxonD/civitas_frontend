import React from 'react'
import {Code, Text} from "@mantine/core";

interface Prop{
    title: string,
    basePath: string
}

function PathView({title, basePath}: Prop){

    return (
        <div style={{marginBottom: '10px'}}>
            <Text size={"sm"}>{title}</Text>
        <Code>{basePath}</Code>
    </div>
    )
}

export default PathView