import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Badge, SimpleGrid, Space, Title} from '@mantine/core';
import {Node, RaidStatus, StorageProvider, StorageSupplier, StringMap} from "../config/types";
import LocalNode from "../components/cockpit/localNode/LocalNode";
import AddStorageBox from "../components/cockpit/AddStorageBox";
import NodeName from "../components/cockpit/nodeName/NodeName";
import {
    getLocalStorage,
    getOwnNodeInformation,
    getRemoteDiskState,
    getStorageProviders,
    getStorageSuppliers
} from "../services/NodeAPI";
import {showErrorNotification} from "../services/AppNotificationProvider";
import SupplierNode from "../components/cockpit/supplierNode/SupplierNode";
import ProviderNode from "../components/cockpit/providerNode/ProviderNode";
import {FiRefreshCw} from "react-icons/fi";
import SyncProgress from "../components/cockpit/SyncProgress";

/**
 * Page to display the Dashboard
 */
function Home(){

    const [localPools, setLocalPools] = useState<RaidStatus[]>([])
    const [ownNode, setOwnNode] = useState<Node>({nodeID: '', ip: "", nodeName: undefined})
    const [storageProviders, setStorageProviders] = useState<StorageProvider[]>([])
    const [storageSuppliers, setStorageSuppliers] = useState<StorageSupplier[]>([])
    const [remoteDiskStates, setRemoteDiskStates] = useState<StringMap>({})

    const navigate = useNavigate()

    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        fetchRemoteDiskStatus(ownNode.nodeID)
    }, [storageProviders, ownNode])

     function refresh(){
        fetchLocalPools();
        fetchStorageSuppliers();
        fetchStorageProvider();
        fetchOwnNode();
    }

    function fetchLocalPools(){
        getLocalStorage()
            .then(pools => setLocalPools(pools.filter(pool => pool.exists)))
            .catch((error) => showErrorNotification("Sorry!", error.message))
    }

    function fetchStorageProvider(){
        getStorageProviders()
            .then(providers => setStorageProviders(providers))
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchStorageSuppliers(){
        getStorageSuppliers()
            .then(storageSupplier => {setStorageSuppliers(storageSupplier)})
            .catch(error => showErrorNotification('Sorry!', error.message))
    }

    function fetchOwnNode(){
        getOwnNodeInformation()
            .then(ownNode => {setOwnNode(ownNode)})
            .catch(error => console.log(error))
    }

    async function fetchRemoteDiskStatus(ownNodeID: string){
        const diskStates: StringMap = {}
        for (const provider of storageProviders) {
            try{
                diskStates[provider.ip] = await getRemoteDiskState(ownNodeID, provider.ip)
            }catch (e) {
                diskStates[provider.ip] = e instanceof Error ? e.message : 'Node not reachable'
            }
        }
        setRemoteDiskStates(diskStates)
    }


    function renderLocalStorage(pools: RaidStatus[]){
        if(pools.length === 0){
            return <AddStorageBox title='Add local storage' onClick={() => {navigate('addLocalStorage')}}/>
        }

        return pools.map(pool => (
            <LocalNode
                key={pool.path}
                pool={pool}
                onRefresh={() => fetchLocalPools()}
            />))
    }

    function renderStorageProviders(storageProviders: StorageProvider[], diskStates: StringMap ){
        if(storageProviders.length === 0){
            return (<AddStorageBox title='Add remote storage' onClick={() => {navigate('addRemoteStorage')}}/>)
        }

        return storageProviders.map(storageProvider => (
            <ProviderNode
                key={storageProvider.nodeID}
                provider={storageProvider}
                diskState={diskStates[storageProvider.ip]}
            />))
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
            <SyncProgress emptyIfNoSync={true}/>
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
                    {renderStorageProviders(storageProviders, remoteDiskStates)}
            </SimpleGrid>
            <Title order={2}>My friend's data</Title>
            {renderStorageSuppliers(storageSuppliers)}

        </div>
    )
}

export default Home
