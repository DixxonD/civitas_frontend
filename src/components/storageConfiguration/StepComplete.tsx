import React, {useEffect} from "react";
import {Check} from "tabler-icons-react";
import {Center,Text, Space} from "@mantine/core";
import deviceInitialisationStrings from "./deviceInitialisationStrings";

interface Prop{
    onComplete?: Function | undefined
}

function StepComplete({onComplete}: Prop){

    useEffect(() => {
        if(onComplete){
            onComplete()
        }
    }, [])

    return (
        <div>
            <Center>
                <Check size={60} color='teal'/>
                <Space w='md'/>
                <Text  size='md' weight='500'>{deviceInitialisationStrings.allDone}</Text>
            </Center>
        </div>
    )
}

export default StepComplete