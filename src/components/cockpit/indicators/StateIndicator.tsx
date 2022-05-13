import React, {useState} from "react";
import {Center, RingProgress, ThemeIcon, Tooltip, Text} from "@mantine/core";
import {Check, QuestionMark, X} from "tabler-icons-react";
import {Disk, RaidStatus} from "../../../config/types";
import KeyValueRow from "../../KeyValueRow";

interface Prop{
    pool: RaidStatus
}

function StateIndicator({pool}:Prop){

    function getToolTipContent(disks: Disk[]){
        if(!disks){return <Text>No disks found</Text>}
        return (
            <>
                {disks.map(disk => <KeyValueRow description={disk.name} value={disk.state}/>)}
            </>
        )
    }

    function renderState(pool: RaidStatus){
        if(!pool.state){
            return (
                    <CustomRingState
                        color='orange'
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

interface StateProp{
    color: string,
    tooltipContent: JSX.Element,
    icon: JSX.Element
}

function CustomRingState({color, icon, tooltipContent}: StateProp){

    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    return (
        <Tooltip
            opened={showTooltip}
            label={tooltipContent}
            withArrow
            color={color}
        >
            <RingProgress
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                size={150}
                thickness={15}
                sections={[{value: 100, color: color}]}
                label={
                    <Center>
                        <ThemeIcon color={color} variant='light' radius={60} size={60}>
                            {icon}
                        </ThemeIcon>
                    </Center>
                }
        />
        </Tooltip>)
}



export default StateIndicator