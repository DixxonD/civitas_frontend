import {RaidStatus, StorageProvider} from "../../config/types";
import SimpleBoxTemplate from "../SimpleBoxTemplate";
import {Center, Grid, Text, Stack} from "@mantine/core";
import StateIndicator from "./indicators/StateIndicator";
import StateDescription from "./indicators/StateDescription";
import React from "react";
import NodeNameText from "./nodeName/NodeNameText";
import CustomRingState from "./indicators/CustomRingState";
import {Check, X} from "tabler-icons-react";

interface Prop{
    provider: StorageProvider,
}

function StorageProviderStatus({provider}:Prop){

    function getTime(date: Date) {
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        })
    }

    function renderRingState(){
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
                            <Text>Last Backup: {getTime(provider.lastBackup)} </Text>
                            </Stack>
                        </Center>
                    </div>
                </Grid.Col>
            </Grid>

        </SimpleBoxTemplate>
    )
}

export default StorageProviderStatus




