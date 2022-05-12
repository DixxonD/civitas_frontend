import React, {useEffect, useState} from "react";
import { RingProgress, Text} from "@mantine/core";

interface Prop{
    label: string,
    utilised: number,
    capacity: number,
    unit: string
}

function StorageSpaceIndicator({label, utilised, capacity, unit}: Prop){

    const [usedSpace, setUsedSpace] = useState<number>(utilised)
    const [fullCapacity, setFullCapacity] = useState<number>(capacity)
    const [percentage, setPercentage] = useState<number>(() => calcPercentage(usedSpace, fullCapacity))
    const [availableSpace, setAvailableSpace] = useState<string>(() => `${utilised}/${capacity} ${unit}`)


    useEffect(() => {setUsedSpace(utilised)}, [utilised])
    useEffect(() => {setFullCapacity(capacity)}, [capacity])
    useEffect(() => {
        setPercentage(() => calcPercentage(usedSpace, capacity))
        setAvailableSpace(() =>  `${utilised}/${capacity} ${unit}`)
    }, [utilised, capacity])

    function calcPercentage(used: number, capacity: number){ return Number(((used / capacity) * 100).toFixed(1))}

    return (
        <div   style={{display: 'flex', flexDirection: 'column',alignItems:'center', width: 150}}>
            <RingProgress
                size={150}
                thickness={20}
                label={<Text color='blue' size='md' weight={700} align='center'>{percentage}%</Text>}
                sections={[
                {value: percentage, color: 'blue'},
                ]}
            />
                <Text weight={550}>{label}</Text>
                <Text >{availableSpace}</Text>
        </div>
    )
}

export default StorageSpaceIndicator