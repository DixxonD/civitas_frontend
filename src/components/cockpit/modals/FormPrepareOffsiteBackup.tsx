import React, {useState} from "react";
import {Center, Loader, Text} from "@mantine/core";
import SelectOrRegisterDisk from "./SelectOrRegisterDisk";
import {prepareOffsiteBackup} from "../../../services/DeviceAPI";
import {showDoneNotification, showErrorNotification} from "../../../services/AppNotificationProvider";

interface Prop{
    close(): void
}

function FormPrepareOffsiteBackup({close}: Prop){

    const [showWaiting, setShowWaiting] = useState<boolean>(false)

    function onDiskSelected(diskId: string){
        setShowWaiting(true)
        prepareOffsiteBackup(diskId).then((success) => {
            if(!success){
                showErrorNotification('Sorry!', 'Copying the backup to the disc did not succeed.' )
                close()
                return
            }
            showDoneNotification('The data was copied successfully.')
            close()
        }).catch((error) => {
            showErrorNotification('Sorry!', error.message)
            close()
        })

    }


    return (
        <>
            {!showWaiting && (
                <>
                    <Text>
                        Select an already registered storage to copy your local backup to it.
                        When the copy is finished, you can give the disk to your friend so that he can add it to his system.
                        This way you don't have to send all your backup data to him over the Internet.
                    </Text>
                    <SelectOrRegisterDisk onDiskClick={onDiskSelected}/>
                </>
            )}

            {showWaiting && (
                <Center style={{margin: '20px'}}>
                    <Loader size='xl' variant='bars' />
                </Center>
            )}

        </>
    )
}

export default FormPrepareOffsiteBackup
