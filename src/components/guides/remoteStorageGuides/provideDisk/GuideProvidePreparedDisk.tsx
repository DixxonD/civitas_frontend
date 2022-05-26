import React, {useEffect, useState} from "react";
import {PreparedDisk} from "../../../../config/types";
import {addPreparedDisk, getPreparedDisks} from "../../../../services/DeviceAPI";
import DiskListElement from "../../../DiskListElement";
import {Badge, Button} from "@mantine/core";
import {showDoneNotification, showErrorNotification} from "../../../../services/AppNotificationProvider";

interface Prop{
    onFinish(): void
}

function GuideProvidePreparedDisk({onFinish}:Prop) {

    const [preparedDisks, setPreparedDisks] = useState<PreparedDisk[]>([])

    useEffect(() => {
        fetchPreparedDisks()
    }, [])

    function fetchPreparedDisks(){
            getPreparedDisks().then(preparedDisks => {
                setPreparedDisks(preparedDisks)
            })
    }

    function onDiskClick(poolName: string){
        addPreparedDisk(poolName).then(() => {
            showDoneNotification('Disk successfully provided.')
            onFinish()
        }).catch((error) => {
            showErrorNotification('Sorry!', error.message)
            onFinish()
        })
    }


    function renderPreparedDisks(disks: PreparedDisk[]){
        if(disks.length === 0){
            return <div><Badge color="teal" style={{marginTop: '10px', marginBottom: '10px'}}>No disks found</Badge></div>
        }

            return disks.filter(disk => disk.hasSupplier).map(disk => <DiskListElement disk={disk} onClick={onDiskClick}/>)
    }


    return (
        <>
            {renderPreparedDisks(preparedDisks)}
            <Button style={{marginTop: 20}} variant='outline' onClick={() => fetchPreparedDisks()}>Refresh List</Button>
        </>)
}

export default GuideProvidePreparedDisk