import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Title, SimpleGrid, Text} from '@mantine/core';
import {getAllPools} from "../services/DashboardAPI";
import {Disk, RaidStatus} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";
import AddStorageBox from "../components/cockpit/AddStorageBox";

function Home(){

    const [pools, setPools] = useState<RaidStatus[]>([])
    const [remoteStorage, setRemoteStorage] = useState<Disk[]>([])
    const navigate = useNavigate()

    useEffect(() => {fetchPools(); fetchRemoteStorage()}, [])

    function fetchPools(){
        getAllPools().then(pools => setPools(pools.filter(pool => pool.exists)))
    }

    function fetchRemoteStorage(){
        //todo: fetch and save remote storage
    }

    function renderLocalStorage(pools: RaidStatus[]){
        if(pools.length === 0){
            return <AddStorageBox title='Add local storage' onClick={() => {navigate('addLocalStorage')}}/>
        }

        return pools.map(pool => <PoolStatus pool={pool} onRefresh={() => fetchPools()}/>)
    }

    function renderRemoteStorage(remoteStorage: Disk[]){
        if(remoteStorage.length === 0){
            return <AddStorageBox title='Add remote storage' onClick={() => {}}/>
        }
        return <Text>remote Storage</Text>
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
                    {renderLocalStorage(pools)}
                    {renderRemoteStorage(remoteStorage)}
            </SimpleGrid>
        </div>
    )
}

export default Home
