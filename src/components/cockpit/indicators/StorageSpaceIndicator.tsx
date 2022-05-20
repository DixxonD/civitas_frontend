import React, {useState} from "react";
import {RingProgress, Text, Tooltip} from "@mantine/core";
import {RaidStatus} from "../../../config/types";


interface Prop{
    pool: RaidStatus
}

function StorageSpaceIndicator({pool}: Prop){

    const [showTooltip, setShowTooltip] = useState<boolean>(false)


    function renderRingProgress(){
        if(!(pool.size && pool.free)){
            return (<></>)
        }

    const used = pool.size - pool.free
    const usedText = Number(used).toFixed(1)
    const percentage = calcPercentage(used, pool.size)

        return (

            <Tooltip
                opened={showTooltip}
                label={`${usedText} / ${pool.size} GB`}
                withArrow
                color='blue'
            >
                <RingProgress
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    size={150}
                    thickness={20}
                    label={<Text color='blue' size='md' weight={700} align='center'>{percentage}%</Text>}
                    sections={[
                        {value: percentage, color: 'blue'},
                    ]}
                />
            </Tooltip>
        )

    }



    function calcPercentage(used: number, capacity: number){ return Number(((used / capacity) * 100).toFixed(1))}

    return renderRingProgress()

}

export default StorageSpaceIndicator
