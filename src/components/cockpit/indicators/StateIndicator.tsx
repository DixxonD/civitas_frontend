import React from "react";
import {Text} from "@mantine/core";
import {Check, QuestionMark, X} from "tabler-icons-react";
import {Disk, RaidStatus} from "../../../config/types";
import KeyValueRow from "../../KeyValueRow";
import CustomRingState from "./CustomRingState";

interface Prop{
    pool: RaidStatus
}

function StateIndicator({pool}:Prop){

    function getToolTipContent(disks: Disk[]){
        if(!disks){return <Text>No disks found</Text>}
        return (
            <>
                {disks.map(disk => <KeyValueRow description={disk.name} value={disk.state} key={disk.name}/>)}
            </>
        )
    }

    function renderState(pool: RaidStatus){
        if(!pool.state){
            return (
                    <CustomRingState
                        color='gray'
                        icon={<QuestionMark size={22}/>}
                        tooltipContent={getToolTipContent(pool.disks)}
                    />
        )}

        if(pool.state.toLocaleLowerCase() === 'online'){
            return (
                <CustomRingState
                        color='teal'
                        icon={<Check size={22}/>}
                        tooltipContent={getToolTipContent(pool.disks)}
                    />
        )}

        return (
            <CustomRingState
                color='red'
                icon={<X size={22}/>}
                tooltipContent={getToolTipContent(pool.disks)}
            />
    )}

    return renderState(pool)

}





export default StateIndicator