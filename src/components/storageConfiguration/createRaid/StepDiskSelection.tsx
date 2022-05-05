import React, {useEffect, useState} from "react";
import {Box, Text, Stack, Grid, Center} from "@mantine/core";
import {StorageDeviceDescription} from "../../../config/types";


function StepDiskSelection(){


    const [diskPair, setDiskPair] = useState<DiskPair>(new DiskPair())
    const [selectedDisks, setSelectedDisks] = useState<string[]>([])

    function onSelectDisk(disk: StorageDeviceDescription){
       setDiskPair(diskPair =>  diskPair.addDisk(disk))
    }

    function onUnselectDisk(disk: StorageDeviceDescription){
        setDiskPair(diskPair => diskPair.removeDisk(disk))

    }

    useEffect(() => {
        const selected: string[] = []
        diskPair.getDisks().forEach(disk => selected.push(disk.id))
        setSelectedDisks(selected)
    }, [diskPair])

    return (
        <Grid>
            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDisks}
                    diskDescription={{name: "numero uno", mountPoint: '/blah', id: '1', size: '300GB'}}/>
            </Grid.Col>
            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDisks}
                    diskDescription={{name: "numero due", mountPoint: '/blah', id: '2', size: '300GB'}}/>
            </Grid.Col>

            <Grid.Col span={4}>
                <DiskSelectionBox
                    onSelect={onSelectDisk}
                    onUnselect={onUnselectDisk}
                    selectedDisks={selectedDisks}
                    diskDescription={{name: "numero drüüü", mountPoint: '/blah', id: '3', size: '300GB'}}/>
            </Grid.Col>


        </Grid>
    )

}

export default StepDiskSelection

interface Prop{
    diskDescription: StorageDeviceDescription,
    selectedDisks: string[],
    onSelect(selectedDisk: StorageDeviceDescription): void,
    onUnselect(unselectedDisk: StorageDeviceDescription): void
}

function DiskSelectionBox({diskDescription, onSelect, onUnselect, selectedDisks}: Prop){

    const selectedColor = 'blue'
    const defaultColor = 'gray'

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
        }else{
            onSelect(disk)
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