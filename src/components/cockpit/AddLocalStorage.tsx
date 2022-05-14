import React from "react";
import SimpleBoxTemplate from "../SimpleBoxTemplate";
import CustomRingState from "./indicators/CustomRingState";
import {Plus} from "tabler-icons-react";
import {Center} from "@mantine/core";

function AddLocalStorage() {
    return(

        <SimpleBoxTemplate title='Add local storage'>
            <Center style={{height: '100%'}}>
                <CustomRingState
                    color={'gray'}
                    colorOnHover={'lightcyan'}
                    icon={<Plus size={24}/>}
                    tooltipContent={<></>}
                    tooltipDisabled
                    size={200}
                />
            </Center>

        </SimpleBoxTemplate>

    )
}

export default AddLocalStorage