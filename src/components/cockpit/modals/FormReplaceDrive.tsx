import React, {useState, useEffect} from "react";
import {Button, Text, Group, Badge, Paper, Divider} from '@mantine/core';
import {RaidStatus, StorageDeviceDescription} from "../../../config/types";
import {getRegisteredDisks} from "../../../services/DeviceAPI";
import {showDoneNotification, showErrorNotification} from "../../../services/AppNotificationProvider";
import GuideAddingStorage from "../../storageConfiguration/addingStorage/GuideAddingStorage";
import {replaceDrive} from "../../../services/DashboardAPI";

interface Prop{
    pool: RaidStatus,
    close(): void,
    onSuccess(): void,
}

function FormReplaceDrive({pool, close, onSuccess}: Prop){
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
                    onClick={() => onClick(device.id)}
                >
                    <Group>
                        <Text weight={700}>{device.name}</Text>
                        <Text>{device.size}</Text>
                        <Text>{device.mountPoint}</Text>
                    </Group>
                </Paper>


        ))
    }

    function onClick(diskId: string){
        if(!pool.path){
            showErrorNotification("Sorry!", "The selected pool is unknown")
            return
        }

        replaceDrive(pool.path, diskId).then(success => {
            if (success) {
                showDoneNotification('The disc has been replaced.')
                onSuccess()
                return
            }
            showErrorNotification('Sorry!', 'No disc could be replaced.')

        }).catch(error => {
            showErrorNotification('Sorry!', error.message)
        })

        close()
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
            <Text>Select an already registered storage device to replace it with a faulty one:</Text>
            {!showAddDisk ? showDiskList(registeredDevices) : <GuideAddingStorage onLastStep={onAddDeviceFinished}/>}
        </>


    )

}
export default FormReplaceDrive