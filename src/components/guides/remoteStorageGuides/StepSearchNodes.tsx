import React, {useEffect} from "react";
import {Center, Loader} from "@mantine/core";
import {Node} from "../../../config/types";

interface Prop{
    onFound(nodes: Node[]): void
}

function StepSearchNodes({onFound}: Prop){

    useEffect(() => {
        //todo: fetch nodes
        setTimeout(() => {onFound([{id: 'blah123', name: 'myNode'}])}, 2000)
        //onFound([])
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