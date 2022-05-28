import React, {useEffect, useState} from "react";
import {PreparedDisk, StorageDeviceDescription} from "../config/types";
import {Group, Paper, Text} from "@mantine/core";

interface Prop {
    disk: StorageDeviceDescription | PreparedDisk,
    onClick(deviceID: string): void,
    backgroundColor?: string,
    hover?: boolean
}

function DiskListElement({disk, onClick, backgroundColor='white', hover=true}: Prop){

    const [color, setColor] = useState<string>(backgroundColor)
    useEffect(() => {setColor(backgroundColor)}, [backgroundColor])

    function renderStorageDevice(disk: StorageDeviceDescription){
        return (
            <Group>
                <Text weight={700}>{disk.name}</Text>
                <Text>{disk.size}</Text>
                <Text>{disk.mountPoint}</Text>
            </Group>
        )
    }

    function renderPreparedDisk(disk: PreparedDisk){
        return (<Group>
            <Text weight={700}>{disk.poolName}</Text>
            <Text>{disk.state}</Text>
        </Group>)
    }

    function render(disk: PreparedDisk | StorageDeviceDescription){
        if('hasSupplier' in disk){ //is PreparedDisk
            return renderPreparedDisk(disk)
        }
        return renderStorageDevice(disk)
    }

    return(
        <Paper
        sx={(theme) => ({
            marginTop: '5px',
            cursor: 'pointer',
            backgroundColor: color,
            '&:hover': hover ? {
                backgroundColor: theme.colors.gray[1],
            }: {},
        })}
        shadow="xs"
        p='md'
        onClick={() => onClick('id' in disk? disk.id : disk.poolName)}
    >
            {render(disk)}
    </Paper>
    )
}

export default DiskListElement