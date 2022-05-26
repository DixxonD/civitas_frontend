import React, {useState} from "react";
import {Button, Text, Group} from '@mantine/core';
import {restoreRemoteBackup} from "../../../services/DashboardAPI";
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import SyncProgress from "../SyncProgress";

interface Prop{
    close(): void,
}

function FormRestoreBackup({close}: Prop){

    const [restoringHasStarted, setRestoringHasStarted] = useState<boolean>(false)

    function restoreBackup(){
        setRestoringHasStarted(true)
        restoreRemoteBackup()
            .catch((error)  => {
                showErrorNotification('Sorry!', error.message)
            }).finally(() => {
                setRestoringHasStarted(false)
                close()
            })
    }

    return (
        <>
            { !restoringHasStarted && (
                <>
                    <Text>Do you want to download the remote backup to your local node? </Text>
                    <Group position='right'>
                        <Button variant='outline' onClick={() => close()}>Cancel</Button>
                        <Button onClick={() => restoreBackup()}>Restore Backup</Button>
                    </Group>
                </>
                )}

            { restoringHasStarted && (
                <SyncProgress emptyIfNoSync={false}/>
            )}
        </>
    )
}

export default FormRestoreBackup