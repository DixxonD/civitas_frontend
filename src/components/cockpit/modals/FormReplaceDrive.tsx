import React from "react";
import {Button, Text, Group} from '@mantine/core';
import {RaidStatus} from "../../../config/types";

interface Prop{
    pool: RaidStatus,
    close(): void
}

function FormReplaceDrive({pool, close}: Prop){

    function replaceDrive(){
        //todo: call backend
        close()
    }

    return (
        <>
            <Text>Replace a disconnected disk with a new one.</Text>
            <Group position='right'>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button onClick={() => replaceDrive()}>Replace Drive</Button>
            </Group>
        </>


    )

}
export default FormReplaceDrive