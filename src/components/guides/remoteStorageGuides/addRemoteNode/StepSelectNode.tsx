import React, {useEffect, useState} from "react";
import {Badge, Group, Text} from "@mantine/core";

import {Node} from "../../../../config/types";
import SimpleBoxTemplate from "../../../SimpleBoxTemplate";
import SyncInterval from "./SyncInterval";

const DEFAULT_INTERVAL = 30

interface Prop{
    availableNodes: Node[],
    onSelect(node: Node, interval: number): void
}

function StepSelectNode({availableNodes, onSelect}: Prop){

    const [nodes, setNodes] = useState<Node[]>(availableNodes)
    const [syncInterval, setSyncInterval] = useState<number>(DEFAULT_INTERVAL)
    useEffect(() => {setNodes(availableNodes)}, [availableNodes])



    function renderNodes(nodes: Node[]){
        if(nodes.length === 0){
            return <Badge color="gray" style={{marginTop: '10px', marginBottom: '10px'}}>No other nodes found</Badge>
        }
        return nodes.map(node => (
            <SimpleBoxTemplate
                key={node.nodeID}
                hovering
                onClick={() => onSelect(node, syncInterval)}
                customTitle={(
                    <Group>
                        {node.nodeName && <Text>{node.nodeName}</Text>}
                        <Text>{node.nodeID}</Text>
                        <Text>{node.ip}</Text>
                    </Group>
                )}
            >
                <></>
            </SimpleBoxTemplate>
        ))
    }

    return (
        <div>
            {renderNodes(nodes)}
            <SyncInterval defaultInterval={DEFAULT_INTERVAL} onChange={interval => setSyncInterval(interval)}/>
        </div>
    )
}

export default StepSelectNode