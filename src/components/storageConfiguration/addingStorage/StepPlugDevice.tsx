import React from "react";
import { Space, Text} from "@mantine/core";
import deviceInitialisationStrings from "../deviceInitialisationStrings";

function StepPlugDevice(){
    return (
        <div>
            <Text>{deviceInitialisationStrings.plugInDevice}</Text>
            <Text>{deviceInitialisationStrings.bluePortsHint}</Text>
            <Space h='md'/>
            <Text>{deviceInitialisationStrings.goToNextStep}</Text>



        </div>
    )
}

export default StepPlugDevice