import React, {useEffect, useState} from "react";
import {StorageDeviceDescription} from "../../../config/types";
import {Space, Text} from "@mantine/core";
import deviceInitialisationStrings from "../deviceInitialisationStrings";

interface Prop{
    deviceDescription: StorageDeviceDescription | undefined
}

function StepConfirmDevice({deviceDescription}: Prop){
    const [content, setContent] = useState<JSX.Element>(() => (noDeviceFound))
    useEffect(() => {
        if(!deviceDescription){
            setContent(noDeviceFound)
        }else{
            setContent(deviceFound(deviceDescription))
        }

    }, [deviceDescription])

    const noDeviceFound = (
        <Text>
            {deviceInitialisationStrings.noDeviceFound}
        </Text>
    )


    function deviceFound(device: StorageDeviceDescription) {
        return (
            <>
            <Text>{deviceInitialisationStrings.deviceFound}</Text>
            <Space h='md'/>
            <Text>Name: {device.name} </Text>
            <Text>Size: {device.size}</Text>
            <Text>Mount point: {device.mountPoint}</Text>
            <Space h='md'/>
            <Text>{deviceInitialisationStrings.confirmDevice}</Text>
            </>)
    }


    return (
        <div>
            {content}
        </div>
    )
}

export default StepConfirmDevice


