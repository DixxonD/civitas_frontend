import {StorageProvider} from "../../../config/types";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";
import {Center, Grid, Text, Stack} from "@mantine/core";
import React, {useEffect, useState} from "react";
import NodeNameText from "../nodeName/NodeNameText";
import CustomRingState from "../indicators/CustomRingState";
import {Check, Ghost, X} from "tabler-icons-react";
import {getRemoteDiskState} from "../../../services/NodeAPI";
import ProviderNodeMenu from "./ProviderNodeMenu";

interface Prop{
    provider: StorageProvider,
}

function ProviderNode({provider}:Prop){

    const [diskState, setDiskState] = useState<string>('')
    useEffect(() => {
        getRemoteDiskState(provider.nodeID).then(state => {
            setDiskState(state)
        }).catch(error => {
            setDiskState(error.message)
        })
    }, [provider])

    function getTime(date: Date) {
        if(!date){
            return 'unknown'
        }
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        })
    }

    function renderRingState(){

        if(!provider.hasDisk || diskState === ''){
            return <CustomRingState
                color={'gray'}
                tooltipContent={<Text>No storage has been provided yet.</Text>}
                icon={<Ghost size={30}/> }/>
        }

        if(diskState.toLowerCase() !== 'online'){
            return (
                <CustomRingState
                    color={'red'}
                    tooltipContent={<Text>{diskState}</Text>}
                    icon={<X size={22}/>}
                />
            )
        }
        if(provider.missedHeartbeats > 0){
            return (
                <CustomRingState
                    color={'red'}
                    tooltipContent={<Text>Missed Heartbeats: {provider.missedHeartbeats}</Text>}
                    icon={<X size={22}/>}
                />
            )
        }

        return (
            <CustomRingState
                color={'teal'}
                tooltipContent={<Text>Last Backup: {getTime(provider.lastBackup)}</Text>}
                icon={<Check size={22}/>}
            />
        )
    }

    return (
        <SimpleBoxTemplate
            title='Remote Storage'
            menu={<ProviderNodeMenu/>}
        >
            <Grid>
                <Grid.Col key={provider.nodeID}>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        {renderRingState()}
                        <Center>
                            <Stack spacing={0}>
                                <NodeNameText node={provider}/>
                                <Text>IP Address: {provider.ip}</Text>
                                <Text>Backup Frequency: every {provider.frequency} minutes.</Text>
                                {provider.hasDisk && <Text>Last Backup: {getTime(provider.lastBackup)} </Text>}
                            </Stack>
                        </Center>
                    </div>
                </Grid.Col>
            </Grid>

        </SimpleBoxTemplate>
    )
}

export default ProviderNode




