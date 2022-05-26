import React, {useEffect, useState} from "react";
import {StorageDeviceDescription} from "../../../config/types";
import {getRegisteredDisks} from "../../../services/DeviceAPI";
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import {Badge, Button, Divider, Group, Paper, Text} from "@mantine/core";
import GuideRegisterStorage from "../../guides/localStorageGuides/addingStorage/GuideRegisterStorage";

interface Prop{
    onDiskClick(deviceID: string): void
}


function SelectOrRegisterDisk({onDiskClick}: Prop){

    const [showAddDisk, setShowAddDisk] = useState<boolean>(false)
    const [registeredDevices, setRegisteredDevices] = useState<StorageDeviceDescription[]>([])
    useEffect(() => {updateRegisteredDisks()}, [])

    function updateRegisteredDisks(){
        getRegisteredDisks().then(disks => {
            setRegisteredDevices(disks)
        }).catch(error => {
            showErrorNotification('Sorry!', error.message)
        })
    }

    function renderDisks(devices: StorageDeviceDescription[]){
        if(devices.length === 0){
            return <Badge color="teal" style={{marginTop: '10px', marginBottom: '10px'}}>No discs registered yet</Badge>
        }

        return devices.map(device => (
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
                onClick={() => onDiskClick(device.id)}
            >
                <Group>
                    <Text weight={700}>{device.name}</Text>
                    <Text>{device.size}</Text>
                    <Text>{device.mountPoint}</Text>
                </Group>
            </Paper>


        ))
    }

    function onAddDeviceFinished(){
        setShowAddDisk(false)
        updateRegisteredDisks()
    }

    function showDiskList(devices: StorageDeviceDescription[]): JSX.Element{
        return (<>
                {renderDisks(devices)}
                <Divider my="sm" style={{marginTop: '15px'}} />
                <Text>Register a new storage device to add it to the list:</Text>
                <Button style={{marginTop: '10px'}} onClick={() => setShowAddDisk(true)}>Register new Disk</Button>
            </>
        )
    }



    return (
        <>
            {!showAddDisk ? showDiskList(registeredDevices) : <GuideRegisterStorage onLastStep={onAddDeviceFinished}/>}
        </>


    )


}

export default SelectOrRegisterDisk