import React, {useEffect, useState} from "react";
import GuideAddingStorage from "../components/guides/localStorageGuides/addingStorage/GuideAddingStorage";
import {Accordion, Title, Text, Badge} from "@mantine/core";
import GuideCreateRaid from "../components/guides/localStorageGuides/createRaid/GuideCreateRaid";
import StepComplete from "../components/guides/localStorageGuides/StepComplete";
import {getPrimaryRaidStatus} from "../services/DeviceAPI";
import {showErrorNotification} from "../services/AppNotificationProvider";
import SimpleBoxTemplate from "../components/SimpleBoxTemplate";

function LocalStorageGuides(){

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
        getPrimaryRaidStatus().then((result) => {
            setRaidIsDone(result.exists)
        }).catch(error => {
            showErrorNotification('Sorry!', error.message)
        })
    }


    return (
        <div className='content'>
            <Title order={1}>Add local storage</Title>
            <SimpleBoxTemplate><Text>The local storage consists of two storage media, which are mirrored. Add at least two storage media first, and then mirror them in the second step.</Text></SimpleBoxTemplate>
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


export default LocalStorageGuides
