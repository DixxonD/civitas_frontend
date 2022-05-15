import React, {useEffect} from "react";
import {Center, Loader} from "@mantine/core";
import {Node} from "../../../config/types";
import {getAllAvailableNodes} from "../../../services/NodeAPI";
import {showErrorNotification} from "../../../services/AppNotificationProvider";

interface Prop{
    onFound(nodes: Node[]): void
}

function StepSearchNodes({onFound}: Prop){

    useEffect(() => {
        getAllAvailableNodes()
            .then(nodes => {
                onFound(nodes)
            }).catch(error => {
                showErrorNotification('Sorry!', error.message)
            })

    }, [])


    return (
        <div>
            <Center style={{margin: '20px'}}>
                <Loader size='xl' variant='bars' />
            </Center>
        </div>
    )
}

export default StepSearchNodes