import React, {useEffect, useState} from "react";
import GuideAddingStorage from "../components/storageConfiguration/addingStorage/GuideAddingStorage";
import {Accordion, Title, Text, Badge} from "@mantine/core";
import GuideCreateRaid from "../components/storageConfiguration/createRaid/GuideCreateRaid";
import StepComplete from "../components/storageConfiguration/StepComplete";
import {getRaidStatus} from "../services/DeviceInitialisation";
import {showErrorNotification} from "../services/AppNotificationProvider";

function StorageConfig(){

    const [raidIsDone, setRaidIsDone] = useState<boolean>(false)
    const labelTextCreateRaid = 'Create RAID'

    useEffect(() => {
        updateRaidIsDone()
    }, [])

    function labelCreateRaid(isDone: boolean){
        if(isDone){
            return <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>{labelTextCreateRaid}</Text>
                    <Badge style={{marginLeft: '8px'}}>Done</Badge>
                </div>
        }
        return <Text>{labelTextCreateRaid}</Text>
    }

    function updateRaidIsDone(){
        getRaidStatus().then((result) => {
            setRaidIsDone(result.exists)
        }).catch(error => {
            showErrorNotification('Sorry!', error.message)
        })
    }


    return (
        <div className='content'>
            <Title order={1}>Storage Configurator</Title>

            <Accordion >

                <Accordion.Item label='Add Storage Device'>
                    <GuideAddingStorage/>
                </Accordion.Item>
                <Accordion.Item label={labelCreateRaid(raidIsDone)}>
                    { raidIsDone ? <StepComplete/> : <GuideCreateRaid onComplete={updateRaidIsDone}/>}
                </Accordion.Item>

            </Accordion>

        </div>

    )
}


export default StorageConfig
