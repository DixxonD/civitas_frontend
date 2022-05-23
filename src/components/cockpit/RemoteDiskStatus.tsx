import {RaidStatus} from "../../config/types";
import SimpleBoxTemplate from "../SimpleBoxTemplate";
import {Center, Grid} from "@mantine/core";
import StateIndicator from "./indicators/StateIndicator";
import StateDescription from "./indicators/StateDescription";
import React from "react";

interface Prop{
    remoteStorage: RaidStatus,
}

function RemoteDiskStatus({remoteStorage}:Prop){

    return (
        <SimpleBoxTemplate
            title='Remote Storage'
        >
            <Grid>
                <Grid.Col span={8}>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <StateIndicator pool={remoteStorage}/>
                        <Center>
                            <StateDescription pool={remoteStorage}/>
                        </Center>
                    </div>
                </Grid.Col>
            </Grid>

        </SimpleBoxTemplate>
    )
}

export default RemoteDiskStatus
