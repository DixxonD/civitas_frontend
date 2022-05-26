import React, {useEffect, useState} from "react";
import {StorageDeviceDescription} from "../../../config/types";
import {getRegisteredDisks} from "../../../services/DeviceAPI";
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import {Badge, Button,Space} from "@mantine/core";
import GuideRegisterStorage from "../../guides/localStorageGuides/addingStorage/GuideRegisterStorage";
import DiskListElement from "../../DiskListElement";

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
            return <div><Badge color="teal" style={{marginTop: '10px', marginBottom: '10px'}}>No disks registered yet</Badge></div>
        }

        return devices.map(device => <DiskListElement key={device.id} disk={device} onClick={onDiskClick}/>)
    }

    function onAddDeviceFinished(){
        setShowAddDisk(false)
        updateRegisteredDisks()
    }

    function showDiskList(devices: StorageDeviceDescription[]): JSX.Element{
        return (<>
                <Space  h={20}/>
                {renderDisks(devices)}
                <Button style={{marginTop: '30px'}} variant='outline' onClick={() => setShowAddDisk(true)}>Add new storage device</Button>
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