import React from "react";
import SimpleBoxTemplate from "../SimpleBoxTemplate";
import CustomRingState from "./indicators/CustomRingState";
import {Plus} from "tabler-icons-react";
import {Center} from "@mantine/core";

interface Prop{
    title: string,
    onClick(): void
}

function AddStorageBox({title, onClick }: Prop) {
    return(

        <SimpleBoxTemplate title={title}>
            <Center style={{height: '100%'}}>
                <CustomRingState
                    color={'gray'}
                    colorOnHover={'lightcyan'}
                    icon={<Plus size={24}/>}
                    tooltipContent={<></>}
                    tooltipDisabled
                    size={200}
                    onClick={onClick}
                />
            </Center>

        </SimpleBoxTemplate>

    )
}

export default AddStorageBox