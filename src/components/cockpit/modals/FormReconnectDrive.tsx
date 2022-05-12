import React  from "react";
import {Button, Text, Group} from '@mantine/core';
import {RaidStatus} from "../../../config/types";

interface Prop{
    pool: RaidStatus,
    close(): void
}

function FormReconnectDrive({pool, close}: Prop){

    function reconnectDrive(){
        //todo: call backend
        close()
    }

    return (
        <>
            <Text>Reconnect an already registered disk after you have plugged it in again.</Text>
            <Group position='right'>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button onClick={() => reconnectDrive()}>Reconnect Drive</Button>
            </Group>
        </>


    )

}
export default FormReconnectDrive