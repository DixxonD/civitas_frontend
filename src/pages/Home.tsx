import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Title, SimpleGrid, Badge} from '@mantine/core';
import {getAllPools} from "../services/DashboardAPI";
import {SharedNode, RaidStatus} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";
import AddStorageBox from "../components/cockpit/AddStorageBox";
import NodeName from "../components/cockpit/nodeName/NodeName";
import {Node} from "../config/types"
import {getAllMarriedNodes, getOwnNodeInformation} from "../services/NodeAPI";
import {showErrorNotification} from "../services/AppNotificationProvider";
import FriendNode from "../components/cockpit/friendNode/FriendNode";
import RemoteDiskStatus from "../components/cockpit/RemoteDiskStatus";

function Home(){

    const [localPools, setLocalPools] = useState<RaidStatus[]>([])
    const [ownNode, setOwnNode] = useState<Node>({nodeID: 'unknown', ip: "unknown", name: undefined})
    const [remoteDisks, setRemoteDisks] = useState<RaidStatus[]>([])
    const [friendStorage, setFriendStorage] = useState<SharedNode[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchPools();
        fetchFriendNodes();
        fetchRemoteStorage();
        fetchOwnNodeName()
    }, [])

    function fetchPools(){
        getAllPools('local')
            .then(pools => setLocalPools(pools.filter(pool => pool.exists)))
            .catch((error) => showErrorNotification("Sorry!", error.message))
    }

    function fetchRemoteStorage(){
        getAllPools('remote')
            .then(disks => setRemoteDisks(disks.filter(disk => disk.exists)))
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchFriendNodes(){
        getAllMarriedNodes()
            .then(friendNodes => {setFriendStorage(friendNodes)})
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchOwnNodeName(){
        getOwnNodeInformation().then(ownNode => setOwnNode(ownNode)).catch(error => console.log(error))
    }

    function renderLocalStorage(pools: RaidStatus[]){
        if(pools.length === 0){
            return <AddStorageBox title='Add local storage' onClick={() => {navigate('addLocalStorage')}}/>
        }

        return pools.map(pool => <PoolStatus pool={pool} onRefresh={() => fetchPools()}/>)
    }

    function renderRemoteStorage(remoteStorage: RaidStatus[]){
        if(remoteStorage.length === 0){
            return <AddStorageBox title='Add remote storage' onClick={() => {navigate('addRemoteStorage')}}/>
        }

        return remoteStorage.map(remoteDisk => <RemoteDiskStatus remoteStorage={remoteDisk}/>)
    }

    function renderFriendsStorage(friendsNodes: SharedNode[]){
        if(friendsNodes.length === 0){
            return (
                <div style={{marginTop: '10px', display: 'flex', width: '100%'}}>
                    <Badge color="gray" size="xl" radius="lg">No one is claiming storage from you yet</Badge>
                </div>
            )
        }
        return friendsNodes.map(node => (<FriendNode key={node.nodeID} node={node}/>))
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
                    {renderLocalStorage(localPools)}
                    {renderRemoteStorage(remoteDisks)}
            </SimpleGrid>
            <Title order={2}>My friend's data</Title>
            {renderFriendsStorage(friendStorage)}

        </div>
    )
}

export default Home
