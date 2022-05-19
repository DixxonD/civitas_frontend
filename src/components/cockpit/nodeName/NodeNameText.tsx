import React, {useEffect, useState} from "react";
import {Node, SharedNode} from "../../../config/types";
import {Text} from "@mantine/core";

interface Prop{
    node: Node | SharedNode
}

function NodeNameText({node}:Prop){
    const [nodeToDisplay, setNode] = useState<Node|SharedNode>(node)
    useEffect(() => {setNode(node)}, [node])

    function getNodeName(node: Node|SharedNode){
        if(node.name){
            return `${node.name} | ${node.nodeID}`
        }
        return node.nodeID
    }


    return ( <Text weight={700}>{getNodeName(nodeToDisplay)}</Text> )

}

export default NodeNameText