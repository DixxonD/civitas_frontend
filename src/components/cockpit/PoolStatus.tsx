import React from "react";
import {Grid, Paper, Title} from "@mantine/core";
import StorageSpaceIndicator from "./indicators/StorageSpaceIndicator";
import {RaidStatus} from "../../config/types";
import StateIndicator from "./indicators/StateIndicator";
import StateDescription from "./indicators/StateDescription";
import PoolStatusMenu from "./PoolStatusMenu";

interface Prop{
    pool: RaidStatus
}

function PoolStatus({pool}:Prop){

    return (
        <Paper style={{marginTop: '30px', marginBottom: '20px'}}  shadow="xs" p='md'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',width: '100%'}}>
                <Title order={3} style={{marginLeft:'10px'}}>{pool.path}</Title>
                <div style={{display: 'flex', justifyContent: 'flex-end',  width: '100%'}}>
                    <PoolStatusMenu pool={pool}/>
                </div>

            </div>

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



        </Paper>
    )
}

export default PoolStatus