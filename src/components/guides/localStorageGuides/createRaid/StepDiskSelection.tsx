import React, {useEffect, useState} from "react";
import {Box, Text, Stack, Grid, Center, SimpleGrid} from "@mantine/core";
import {StorageDeviceDescription} from "../../../../config/types";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import SimpleBoxTemplate from "../../../SimpleBoxTemplate";
import DiskListElement from "../../../DiskListElement";

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
            <DiskSelectionBox diskDescription={disk} selectedDisks={selectedDiskIDs} onSelect={onSelectDisk} onUnselect={onUnselectDisk}/>
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
        <SimpleGrid
            cols={4}
            spacing='lg'
            breakpoints={[
                {maxWidth: 780, cols: 1, spacing: 'sm'},
                {maxWidth: 1100, cols: 2, spacing: 'md'},
                {maxWidth: 1800, cols: 3, spacing: 'md'},
            ]}
        >
            {renderDisks(registeredDisks, selectedDiskIDs)}
        </SimpleGrid>
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

    const selectedColor = 'gainsboro'
    const defaultColor = 'white'

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
       <DiskListElement disk={disk} onClick={onClick} backgroundColor={color} hover={false}/>
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
