import React from "react";
import {Button, Text, Group} from '@mantine/core';
import {restoreRemoteBackup} from "../../../services/DashboardAPI";
import {showErrorNotification} from "../../../services/AppNotificationProvider";

interface Prop{
    close(): void,
}

function FormRestoreBackup({close}: Prop){


    function restoreBackup(){
        restoreRemoteBackup()
            .catch((error)  => {
                showErrorNotification('Sorry!', error.message)
         }).finally(() => close())
    }

    return (
        <>
            <Text>Do you want to download the remote backup to your local node? </Text>
            <Group position='right'>
                <Button variant='outline' onClick={() => close()}>Cancel</Button>
                <Button onClick={() => restoreBackup()}>Restore Backup</Button>
            </Group>
        </>
    )
}

export default FormRestoreBackup