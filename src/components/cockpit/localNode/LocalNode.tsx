import React from "react";
import {Grid} from "@mantine/core";
import StorageSpaceIndicator from "../indicators/StorageSpaceIndicator";
import {RaidStatus} from "../../../config/types";
import StateIndicator from "../indicators/StateIndicator";
import StateDescription from "../indicators/StateDescription";
import LocalNodeMenu from "./LocalNodeMenu";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";

interface Prop{
    pool: RaidStatus,
    onRefresh(): void
}

function LocalNode({pool, onRefresh}:Prop){

    return (
        <SimpleBoxTemplate
            title='Local Node'
            menu={<LocalNodeMenu pool={pool} onRefresh={onRefresh}/>}
        >
            <Grid>
                <Grid.Col span={8}>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <StateIndicator pool={pool}/>
                        <StorageSpaceIndicator pool={pool}/>
                    </div>
                </Grid.Col>
                <Grid.Col span={12} style={{marginLeft: '10px'}}>
                    <StateDescription pool={pool}/>
                </Grid.Col>
            </Grid>

        </SimpleBoxTemplate>
    )
}

export default LocalNode
