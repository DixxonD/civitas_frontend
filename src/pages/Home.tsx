import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Title, SimpleGrid, Badge, Space} from '@mantine/core';
import {StorageSupplier, RaidStatus, StorageProvider} from "../config/types";
import PoolStatus from "../components/cockpit/PoolStatus";
import AddStorageBox from "../components/cockpit/AddStorageBox";
import NodeName from "../components/cockpit/nodeName/NodeName";
import {Node} from "../config/types"
import {getStorageSuppliers, getOwnNodeInformation, getLocalStorage, getStorageProviders} from "../services/NodeAPI";
import {showErrorNotification} from "../services/AppNotificationProvider";
import SupplierNode from "../components/cockpit/friendNode/SupplierNode";
import StorageProviderStatus from "../components/cockpit/StorageProviderStatus";
import {FiRefreshCw} from "react-icons/fi";

function Home(){

    const [localPools, setLocalPools] = useState<RaidStatus[]>([])
    const [ownNode, setOwnNode] = useState<Node>({nodeID: 'unknown', ip: "unknown", name: undefined})
    const [storageProvider, setStorageProvider] = useState<StorageProvider[]>([])
    const [storageSuppliers, setStorageSuppliers] = useState<StorageSupplier[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        refresh()
    }, [])

    function refresh(){
        fetchLocalPools();
        fetchStorageSuppliers();
        fetchStorageProvider();
        fetchOwnNodeName()
    }

    function fetchLocalPools(){
        getLocalStorage()
            .then(pools => setLocalPools(pools.filter(pool => pool.exists)))
            .catch((error) => showErrorNotification("Sorry!", error.message))
    }

    function fetchStorageProvider(){
        getStorageProviders()
            .then(disks => setStorageProvider(disks))
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchStorageSuppliers(){
        getStorageSuppliers()
            .then(storageSupplier => {setStorageSuppliers(storageSupplier)})
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchOwnNodeName(){
        getOwnNodeInformation().then(ownNode => setOwnNode(ownNode)).catch(error => console.log(error))
    }

    function renderLocalStorage(pools: RaidStatus[]){
        if(pools.length === 0){
            return <AddStorageBox title='Add local storage' onClick={() => {navigate('addLocalStorage')}}/>
        }

        return pools.map(pool => <PoolStatus pool={pool} onRefresh={() => fetchLocalPools()}/>)
    }

    function renderStorageProviders(storageProviders: StorageProvider[]){
        if(storageProviders.length === 0){
            return <AddStorageBox title='Add remote storage' onClick={() => {navigate('addRemoteStorage')}}/>
        }

        return storageProviders.map(storageProvider => <StorageProviderStatus provider={storageProvider}/>)
    }

    function renderStorageSuppliers(storageSuppliers: StorageSupplier[]){
        if(storageSuppliers.length === 0){
            return (
                <div style={{marginTop: '10px', display: 'flex', width: '100%'}}>
                    <Badge color="gray" size="xl" radius="lg">No one is claiming storage from you yet</Badge>
                </div>
            )
        }
        return storageSuppliers.map(node => (
            <SupplierNode
                key={node.nodeID}
                node={node}
                afterAction={fetchStorageSuppliers}
            />))
    }

    return (
        <div className='content' >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Title order={1}>Cockpit</Title>
                <Space w={20}/>
                <FiRefreshCw  onClick={() => refresh()} size='1.8em' style={{cursor: 'pointer', paddingTop: 5}} />
            </div>

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
                    {renderStorageProviders(storageProvider)}
            </SimpleGrid>
            <Title order={2}>My friend's data</Title>
            {renderStorageSuppliers(storageSuppliers)}

        </div>
    )
}

export default Home
