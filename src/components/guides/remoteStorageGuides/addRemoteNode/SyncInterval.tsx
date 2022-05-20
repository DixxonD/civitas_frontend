import React, {useState} from "react";
import {Group, NumberInput, Text} from "@mantine/core";
import {ArrowFork} from "tabler-icons-react";

interface Prop{
    defaultInterval: number,
    onChange(interval: number): void
}

function SyncInterval({defaultInterval, onChange}: Prop) {

    const [interval, setInterval] = useState<number>(defaultInterval)

    function onUpdate(interval: number | undefined){
        const value = interval? interval : defaultInterval
        setInterval(value)
        onChange(value)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Group
                spacing='xs'
                onClick={(e) => e.stopPropagation() }
            >
                <Text size='xs'>Set Sync interval to </Text>
                <NumberInput
                    style={{width: 80}}
                    value={interval}
                    onChange={onUpdate}
                    placeholder="interval"
                    width={10}
                    min={1}
                    size='xs'
                    icon={<ArrowFork size={24}/>}
                    required
                    hideControls
                />
                <Text size='xs'>minutes.</Text>
            </Group>
        </div>

    )
}
export default SyncInterval
