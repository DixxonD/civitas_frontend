import React from "react";
import {Check} from "tabler-icons-react";
import {Center,Text, Paper, Space, Button} from "@mantine/core";
import deviceInitialisationStrings from "./deviceInitialisationStrings";


function StepComplete(){

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