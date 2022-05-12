import React, {useEffect, useState} from "react";
import {Grid, Paper} from "@mantine/core";
import StorageSpaceIndicator from "./indicators/StorageSpaceIndicator";
import {RaidStatus} from "../../config/types";

interface Prop{
    poolStates: RaidStatus[]
}

function StorageSpaceBoard({poolStates}: Prop){

    const [pools, setPools] = useState<JSX.Element[]>()

    useEffect(()=> {
        renderPools().then(pools => setPools(pools))
    }, [poolStates])

    async function renderPools(): Promise<JSX.Element[]> {
        return poolStates.filter(pool => pool.exists).map(pool => (
            <Grid.Col span={3}>
                <StorageSpaceIndicator
                    label={pool.path || ''}
                    utilised={((pool.size || 0) - (pool.free || 0))}
                    capacity={pool.size || 0}
                    unit='GB'
                />
            </Grid.Col>
        ))
    }

    return (

        <Paper style={{marginTop: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-evenly'}}  shadow="xs" p='md' >
            <Grid grow justify='center'>
                {pools}
            </Grid>
        </Paper>

    )
}

export default StorageSpaceBoard