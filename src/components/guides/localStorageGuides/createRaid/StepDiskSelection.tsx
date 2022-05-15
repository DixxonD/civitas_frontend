import React, {useEffect, useState} from "react";
import {Box, Text, Stack, Grid, Center} from "@mantine/core";
import {StorageDeviceDescription} from "../../../../config/types";
import deviceInitialisationStrings from "../deviceInitialisationStrings";

interface Prop{
    registeredDisks: StorageDeviceDescription[],
    onSelectionUpdate(diskIDs: string[]):void
}


function StepDiskSelection({onSelectionUpdate, registeredDisks}: Prop){
    const [diskPair, setDiskPair] = useState<DiskPair>(new DiskPair())
    const [selectedDiskIDs, setSelectedDiskIDs] = useState<string[]>([])

    useEffect(() => {
        const selectedIDs: string[] = []
        diskPair.getDisks().forEach(disk => selectedIDs.push(disk.id))
        setSelectedDiskIDs(selectedIDs)
        onSelectionUpdate(selectedIDs)
    }, [diskPair])


    function renderDisks(registeredDisks:  StorageDeviceDescription[], selectedDiskIDs: string[]): JSX.Element[]{
        if(registeredDisks.length < 1){
            return ([<Text key={0} style={{margin: '10px'}}>{deviceInitialisationStrings.atLeastToDevices} </Text>])
        }
        return registeredDisks.map(disk => (
            <Grid.Col span={4} key={disk.id}>
                <DiskSelectionBox diskDescription={disk} selectedDisks={selectedDiskIDs} onSelect={onSelectDisk} onUnselect={onUnselectDisk}/>
            </Grid.Col>
        ))
    }

    function onSelectDisk(disk: StorageDeviceDescription){
        const newDiskPair = diskPair.addDisk(disk)
        setDiskPair(newDiskPair)
    }

    function onUnselectDisk(disk: StorageDeviceDescription){
        const newDiskPair = diskPair.removeDisk(disk)
        setDiskPair(newDiskPair)

    }

    return (
        <Grid>
            {renderDisks(registeredDisks, selectedDiskIDs)}
        </Grid>
    )

}

export default StepDiskSelection

interface PropSelectionBox{
    diskDescription: StorageDeviceDescription,
    selectedDisks: string[],
    onSelect(selectedDisk: StorageDeviceDescription): void,
    onUnselect(unselectedDisk: StorageDeviceDescription): void
}

function DiskSelectionBox({diskDescription, onSelect, onUnselect, selectedDisks}: PropSelectionBox){

    const selectedColor = 'gray'
    const defaultColor = 'gainsboro'

    const [selected, setSelected] = useState<boolean>(false)
    const [color, setColor] = useState<string>(defaultColor)
    const [disk, setDisk] = useState<StorageDeviceDescription>(diskDescription)

    useEffect(() => {
        setSelected(selectedDisks.includes(disk.id))
    }, [selectedDisks])

    useEffect(() => {
        if(selected){
            setColor(selectedColor)
        }else{
            setColor(defaultColor)
        }
    }, [selected])

    function onClick(){
        if(selected){
            onUnselect(disk)
            setSelected(false)
        }else{
            onSelect(disk)
            setSelected(true)

        }
    }

    return (
        <Box
            onClick={onClick}
            sx={{
            backgroundColor: color,
            cursor: 'pointer',

        }}>
            <Center>
                <Stack  spacing='xs' style={{margin: '20px'}}>
                    <Text>{disk.name}</Text>
                    <Text>{disk.size}</Text>
                    <Text>{disk.mountPoint}</Text>
                </Stack>

            </Center>

        </Box>
    )
}


class DiskPair{

    disks: StorageDeviceDescription[] = []
    nextLocation: number = 0

    constructor(diskPair?: DiskPair) {
        if(diskPair){
            this.disks = diskPair.disks
            this.nextLocation = diskPair.nextLocation
        }
    }

    addDisk(disk: StorageDeviceDescription): DiskPair{
        this.disks[this.nextLocation] = disk
        this.nextLocation = this.nextLocation === 0 ? 1 : 0
        return new DiskPair(this)
    }

    removeDisk(disk: StorageDeviceDescription): DiskPair{
        const compareAndRemove = (index: 1 | 0) => {
            if(this.disks[index]){
                if(this.disks[index].id === disk.id){
                    delete this.disks[index]
                }
            }
        }
        compareAndRemove(0)
        compareAndRemove(1)
        return new DiskPair(this)
    }

    getDisks(): StorageDeviceDescription[]{
        return this.disks
    }

}

/*
            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDiskIDs}
                    diskDescription={{name: "numero uno", mountPoint: '/blah', id: '1', size: '300GB'}}/>
            </Grid.Col>
            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDiskIDs}
                    diskDescription={{name: "numero due", mountPoint: '/blah', id: '2', size: '300GB'}}/>
            </Grid.Col>

            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDiskIDs}
                    diskDescription={{name: "numero drüüü", mountPoint: '/blah', id: '3', size: '300GB'}}/>
            </Grid.Col>
 */