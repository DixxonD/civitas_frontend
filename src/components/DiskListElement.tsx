import React from "react";
import {PreparedDisk, StorageDeviceDescription} from "../config/types";
import {Group, Paper, Text} from "@mantine/core";

interface Prop {
    disk: StorageDeviceDescription | PreparedDisk,
    onClick(deviceID: string): void
}

function DiskListElement({disk, onClick}: Prop){

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
            '&:hover': {
                backgroundColor: theme.colors.gray[1],
            },
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