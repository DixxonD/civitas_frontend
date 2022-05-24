import React, {useEffect, useState} from "react";
import {Node, ObjWithNodeName, StorageProvider, StorageSupplier} from "../../../config/types";
import {Text} from "@mantine/core";

interface Prop{
    node: ObjWithNodeName//Node | StorageSupplier | StorageProvider
}

function NodeNameText({node}:Prop){
    const [nodeToDisplay, setNode] = useState<ObjWithNodeName>(node)
    useEffect(() => {setNode(node)}, [node])

    function getNodeName(node: ObjWithNodeName){
        if(node.name){
            return `${node.name} | ${node.nodeID}`
        }
        return node.nodeID
    }


    return ( <Text weight={700}>{getNodeName(nodeToDisplay)}</Text> )

}

export default NodeNameText