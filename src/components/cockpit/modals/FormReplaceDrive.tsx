import React from "react";
import {Text} from '@mantine/core';
import {RaidStatus} from "../../../config/types";
import {showDoneNotification, showErrorNotification} from "../../../services/AppNotificationProvider";
import SelectOrRegisterDisk from "./SelectOrRegisterDisk";

interface Prop{
    pool: RaidStatus,
    close(): void,
    onSuccess(): void,
    replaceFunction(path: string, diskId: string): Promise<boolean>
}

function FormReplaceDrive({pool, close,replaceFunction, onSuccess}: Prop){

    function onClick(diskId: string){
        if(!pool.path){
            showErrorNotification("Sorry!", "The selected pool is unknown")
            return
        }

        replaceFunction(pool.path, diskId).then(success => {
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

    return (
        <>
            <Text>Select an already registered storage device to replace it with a faulty one:</Text>
            <SelectOrRegisterDisk onDiskClick={onClick}/>
        </>


    )

}
export default FormReplaceDrive