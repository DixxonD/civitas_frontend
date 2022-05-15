import React, {useEffect, useState} from "react";
import {Badge, Group, Text} from "@mantine/core";

import {Node} from "../../../config/types";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";

interface Prop{
    availableNodes: Node[],
    onSelect(node: Node): void
}

function StepSelectNode({availableNodes, onSelect}: Prop){

    const [nodes, setNodes] = useState<Node[]>(availableNodes)
    useEffect(() => {setNodes(availableNodes)}, [availableNodes])



    function renderNodes(nodes: Node[]){
        if(nodes.length === 0){
            return <Badge color="gray" style={{marginTop: '10px', marginBottom: '10px'}}>No other nodes found</Badge>
        }
        return nodes.map(node => (
            <SimpleBoxTemplate key={node.id} hovering onClick={() => onSelect(node)}>
                <Group>
                    <Text>Hallo</Text>
                    <Text>Hi</Text>
                </Group>

            </SimpleBoxTemplate>
        ))
    }

    return (
        <div>
            {renderNodes(nodes)}
        </div>
    )
}

export default StepSelectNode