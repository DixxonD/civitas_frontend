import React, {useEffect, useState} from "react";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";
import {SharedNode} from '../../../config/types'
import NodeNameText from "../nodeName/NodeNameText";
import {Tooltip} from "@mantine/core";

import {AlertTriangle, Clock, Check, } from "tabler-icons-react";
import FriendNodeMenu from "./FriendNodeMenu";

interface Prop{
    node: SharedNode
}

function FriendNode({node}: Prop){

    //const [sharedNode, setSharedNode] = useState<SharedNode>(node)
    const [statusIcon, setStatusIcon] = useState<JSX.Element>(<></>)
    const [statusText, setStatusText] = useState<string>('Loading...')
    const [diskAlreadyConnected, setDiskAlreadyConnected] = useState<boolean>(false)
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
      //  setSharedNode(node)
        updateStatus(node)
        updateDiskAlreadyConnected(node)
    }, [node])

    function updateStatus(node: SharedNode){
        if( node.disk === null || node.disk === undefined){
            setStatusIcon( <AlertTriangle size={24}/>)
            setStatusText('No storage device attached.')
            return
        }

        setStatusText(`Last seen: ${getTimeAgo(node.lastSeen)}`)

        if( moreThanOneHourAgo(node.lastSeen)){
            setStatusIcon(<Clock size={24}/>)
            return
        }

        setStatusIcon(<Check size={24}/>)

    }

    function getTimeAgo(pastTime: Date | null): string{
        if(pastTime === null){return 'never'}
        const now = new Date()
        const diff = new Date(now.getTime() - pastTime.getTime() )

        if(diff.getUTCHours() > 0){
            return `${diff.getUTCHours()}h ago`
        }
        return `${diff.getUTCMinutes()} min ago`
    }

    function updateDiskAlreadyConnected(node: SharedNode){
        if( node.disk === null || node.disk === undefined){
            setDiskAlreadyConnected(false)
            return
        }
        setDiskAlreadyConnected(true)
    }

    function moreThanOneHourAgo(pastTime: Date | null): boolean{
        if(pastTime === null){return true}
        const ONE_HOUR = 60 * 60 * 1000 //ms
        const now = new Date()
        const timeDiffInMs = now.getTime() - pastTime.getTime()
        return timeDiffInMs >= ONE_HOUR
    }

    return (

        <SimpleBoxTemplate
            maxWidth={780}
            customTitle={(<NodeNameText node={node}/>)}
            menu={(
                <>
                    <FriendNodeMenu
                        supplierNodeID={node.nodeID}
                        statusIcon={statusIcon}
                        statusText={statusText}
                        diskIsAlreadyConnected={diskAlreadyConnected}
                        button={(
                            <Tooltip
                                opened={opened}
                                label={statusText}
                                withArrow
                            >
                                <div
                                    onMouseEnter={() => setOpened(true)}
                                    onMouseLeave={() => setOpened(false)}
                                    onClick={() => setOpened(false)}
                                    style={{alignItems: 'center'}}
                                >
                                    {statusIcon}
                                </div>
                            </Tooltip>
                    )}/>
                </>
            )}
        >
            <></>
        </SimpleBoxTemplate>

    )
}

export default FriendNode


/*



 */