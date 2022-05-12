import React, {useEffect, useState} from 'react'
import {Title, SimpleGrid} from '@mantine/core';
import {getAllPools} from "../services/DashboardAPI";
import {RaidStatus} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";

function Home(){

    const [pools, setPools] = useState<RaidStatus[]>([])

    useEffect(() => {fetchPools()}, [])

    function fetchPools(){
        getAllPools().then(pools => setPools(pools.filter(pool => pool.exists)))
    }

    return (
        <div className='content' >
            <Title order={1}>Cockpit</Title>
            <SimpleGrid
                cols={4}
                spacing='lg'
                breakpoints={[
                    {maxWidth: 780, cols: 1, spacing: 'sm'},
                    {maxWidth: 1100, cols: 2, spacing: 'md'},
                    {maxWidth: 1800, cols: 3, spacing: 'md'},
                ]}
            >
                    {pools.map(pool => <PoolStatus pool={pool}/>)}
            </SimpleGrid>

        </div>


    )
}

export default Home

/*
          <Grid  columns={12} >
                <Grid.Col span={4} >
                    {pools.map(pool => <PoolStatus pool={pool}/>)}
                </Grid.Col>
            </Grid>
 */