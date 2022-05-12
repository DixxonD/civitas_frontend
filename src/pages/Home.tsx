import React, {useEffect, useState} from 'react'
import {Title} from '@mantine/core';
import StateIndicator from "../components/cockpit/indicators/StateIndicator";
import StorageSpaceBoard from "../components/cockpit/StorageSpaceBoard";
import {getAllPools} from "../services/DashboardAPI";
import {RaidStatus} from "../config/types";

function Home(){

    const [pools, setPools] = useState<RaidStatus[]>([])

    useEffect(() => {fetchPools()}, [])

    function fetchPools(){
        getAllPools().then(pools => setPools(pools.filter(pool => pool.exists)))
    }

    return (
        <div className='content'>
            <Title order={1}>Cockpit</Title>
            <StorageSpaceBoard poolStates={pools}/>
            {pools.map( pool => <StateIndicator pool={pool}/>)}
        </div>
    )
}

export default Home