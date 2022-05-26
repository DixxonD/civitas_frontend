import React, {useState} from "react";

import {LoadingOverlay, Text} from "@mantine/core";

import {provideDisk} from "../../../../services/NodeAPI";
import {showErrorNotification} from "../../../../services/AppNotificationProvider";
import SelectOrRegisterDisk from "../../../cockpit/modals/SelectOrRegisterDisk";

interface Prop{
    supplierNodeId: string,
    onFinish() : void
}

function GuideProvideEmptyDisk({supplierNodeId, onFinish}: Prop) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function onSelectDiskToProvide(diskID: string){
        setIsLoading(true)
        provideDisk(supplierNodeId, diskID)
            .catch((error) => {showErrorNotification('Sorry!', error.message)})
            .finally(() =>  {
                setIsLoading(false)
                onFinish()
            })
    }

    return (
        <>
            <LoadingOverlay visible={isLoading}/>
            <Text>
                Select an already registered storage medium to provide it to a friend as a storage medium.
                Your storage device will serve him as an offsite backup.
            </Text>
            <SelectOrRegisterDisk onDiskClick={onSelectDiskToProvide}/>
        </>
    )
}
export default GuideProvideEmptyDisk