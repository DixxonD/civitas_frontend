import React, {useEffect, useState} from "react";
import {StorageDeviceDescription} from "../../../../config/types";
import {Button, LoadingOverlay, Text} from "@mantine/core";

import {getRegisteredDisks} from "../../../../services/DeviceAPI";
import GuideRegisterStorage from "../../localStorageGuides/addingStorage/GuideRegisterStorage";
import SimpleBoxTemplate from "../../../SimpleBoxTemplate";
import {provideDisk} from "../../../../services/NodeAPI";
import {showErrorNotification} from "../../../../services/AppNotificationProvider";

interface Prop{
    supplierNodeId: string,
    onFinish() : void
}

function GuideProvideDisk({supplierNodeId, onFinish}: Prop) {

    const [registeredDisks, setRegisteredDisks] = useState<StorageDeviceDescription[]>([])
    const [guide, setGuide] = useState<JSX.Element>(diskSelectionList)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchRegisteredDisks()
    }, [])

    useEffect( () => {
        showDiskList()
    }, [registeredDisks])



    function fetchRegisteredDisks(){
        getRegisteredDisks().then((disks) => {
            setRegisteredDisks(disks)
        })
    }

    function onAddNewDevice(){
        setGuide(selectDiskGuide)
    }

    function showDiskList(){
        setGuide(diskSelectionList())
    }

    function onSelectDiskToProvide(diskID: string){
        setIsLoading(true)
        provideDisk(supplierNodeId, diskID)
            .catch((error) => {showErrorNotification('Sorry!', error.message)})
            .finally(() =>  {
                setIsLoading(false)
                onFinish()
            })
    }

    const selectDiskGuide = (
        <>
            <GuideRegisterStorage onLastStep={fetchRegisteredDisks}/>
        </>)

    function diskSelectionList(){

    return (
        <>
            {registeredDisks.map(disk => (
                <SimpleBoxTemplate
                    key={disk.id}
                    customTitle={(
                    <>
                        <Text>{disk.name}</Text>
                        <Text>{disk.size}</Text>
                        <Text>{disk.mountPoint}</Text>
                    </>
                )}
                    menu={<Button onClick={()=> {onSelectDiskToProvide(disk.id)}}>Select</Button>}
                >
                    <></>
                </SimpleBoxTemplate>
            ))}
            <Button
                style={{marginTop: 10}}
                variant={registeredDisks.length === 0 ? 'filled' : 'outline'}
                onClick={() => onAddNewDevice()}>Add new storage device</Button>
        </>
    )}

    return (
        <>
            <LoadingOverlay visible={isLoading}/>
            {guide}
        </>
    )
}
export default GuideProvideDisk