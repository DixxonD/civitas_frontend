import React from "react";
import {StorageProvider} from "../../../config/types";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";
import {Center, Grid, Text, Stack} from "@mantine/core";
import NodeNameText from "../nodeName/NodeNameText";
import CustomRingState from "../indicators/CustomRingState";
import {Check, Ghost, QuestionMark, X} from "tabler-icons-react";
import ProviderNodeMenu from "./ProviderNodeMenu";

interface Prop{
    provider: StorageProvider,
    diskState: string
}

function ProviderNode({provider, diskState}:Prop){

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

        if(!provider.hasDisk){
            return <CustomRingState
                color={'gray'}
                tooltipContent={<Text>No storage has been provided yet.</Text>}
                icon={<Ghost size={30}/> }/>
        }

        if(diskState === '' || !diskState){
            return <CustomRingState
                color={'gray'}
                tooltipContent={<Text>Status of the storage medium is unknown</Text>}
                icon={<QuestionMark size={22}/>}
            />
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




