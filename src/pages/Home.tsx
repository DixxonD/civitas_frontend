import React, {useEffect, useState} from 'react'
import {Title, SimpleGrid} from '@mantine/core';
import {getAllPools} from "../services/DashboardAPI";
import {RaidStatus} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";
import AddLocalStorage from "../components/cockpit/AddLocalStorage";

function Home(){

    const [pools, setPools] = useState<RaidStatus[]>([])

    useEffect(() => {fetchPools()}, [])

    function fetchPools(){
        getAllPools().then(pools => setPools(pools.filter(pool => pool.exists)))
    }

    function renderContent(pools: RaidStatus[]){
        if(pools.length === 0){
            return (
                <AddLocalStorage/>
            )
        }

        return pools.map(pool => <PoolStatus pool={pool} onRefresh={() => fetchPools()}/>)
    }

    return (
        <div className='content' >
            <Title order={1}>Cockpit</Title>
            <Title order={2}>Own Data</Title>
            <SimpleGrid
                cols={4}
                spacing='lg'
                breakpoints={[
                    {maxWidth: 780, cols: 1, spacing: 'sm'},
                    {maxWidth: 1100, cols: 2, spacing: 'md'},
                    {maxWidth: 1800, cols: 3, spacing: 'md'},
                ]}
            >
                    {renderContent(pools)}
            </SimpleGrid>
        </div>
    )
}

export default Home
