import React from "react";
import {Space, Text} from "@mantine/core";
import deviceInitialisationStrings from "./deviceInitialisationStrings";

function StepUnplugDevice(){
    return (
        <div>
            <Text>{deviceInitialisationStrings.plugOutDevice}</Text>
            <Space h='md'/>
            <Text>{deviceInitialisationStrings.goToNextStep}</Text>
        </div>
    )
}

export default StepUnplugDevice