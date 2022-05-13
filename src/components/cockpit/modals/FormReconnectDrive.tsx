import React  from "react";
import {Button, Text, Group} from '@mantine/core';
import {RaidStatus} from "../../../config/types";

import {reconnectDrive} from "../../../services/DashboardAPI"
import {showDoneNotification, showErrorNotification} from "../../../services/AppNotificationProvider";

interface Prop{
    pool: RaidStatus,
    close(): void,
    onSuccess(): void
}

function FormReconnectDrive({pool, close, onSuccess}: Prop){

    function onClick(){
        if(!pool.path){
            showErrorNotification("Sorry!", "The selected pool is unknown")
            return
        }

        reconnectDrive(pool.path).then(success => {
            if (success) {
                showDoneNotification('The disc has been reconnected')
                onSuccess()
                return
            }
            showErrorNotification('Sorry!', 'No disc could be reconnected.')

        }).catch(error => {
            showErrorNotification('Sorry!', error.message)
        })

        close()
    }

    return (
        <>
            <Text>Reconnect an already registered disk after you have plugged it in again.</Text>
            <Group position='right'>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button onClick={() => onClick()}>Reconnect Drive</Button>
            </Group>
        </>


    )

}
export default FormReconnectDrive