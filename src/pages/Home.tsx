import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Title, SimpleGrid, Text, Badge} from '@mantine/core';
import {getAllPools} from "../services/DashboardAPI";
import {Disk, RaidStatus} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";
import AddStorageBox from "../components/cockpit/AddStorageBox";
import NodeName from "../components/NodeName";
import {Node} from "../config/types"
import {getOwnNodeInformation} from "../services/NodeAPI";

function Home(){

    const [pools, setPools] = useState<RaidStatus[]>([])
    const [ownNode, setOwnNode] = useState<Node>({nodeID: 'unknown', name: undefined})
    const [remoteStorage, setRemoteStorage] = useState<Disk[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchPools();
        fetchRemoteStorage();
        fetchOwnNodeName()
    }, [])

    function fetchPools(){
        getAllPools().then(pools => setPools(pools.filter(pool => pool.exists)))
    }

    function fetchRemoteStorage(){
        //todo: fetch and save remote storage
    }

    function fetchOwnNodeName(){
        console.log("hi")
        getOwnNodeInformation().then(ownNode => setOwnNode(ownNode)).catch(error => console.log(error))
    }

    function renderLocalStorage(pools: RaidStatus[]){
        if(pools.length === 0){
            return <AddStorageBox title='Add local storage' onClick={() => {navigate('addLocalStorage')}}/>
        }

        return pools.map(pool => <PoolStatus pool={pool} onRefresh={() => fetchPools()}/>)
    }

    function renderRemoteStorage(remoteStorage: Disk[]){
        if(remoteStorage.length === 0){
            return <AddStorageBox title='Add remote storage' onClick={() => {navigate('addRemoteStorage')}}/>
        }
        return <Text>remote Storage</Text>
    }

    return (
        <div className='content' >

            <Title order={1}>Cockpit</Title>
            <NodeName ownNode={ownNode}/>
            <Title order={2}>My Data</Title>
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
            <Title order={2}>My friend's data</Title>
            <div style={{marginTop: '10px', display: 'flex', width: '100%'}}>
                <Badge color="gray" size="xl" radius="lg">No one is claiming storage from you yet</Badge>
            </div>

        </div>
    )
}

export default Home
