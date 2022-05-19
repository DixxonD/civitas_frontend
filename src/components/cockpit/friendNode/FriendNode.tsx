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
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
      //  setSharedNode(node)
        updateStatus(node)
    }, [node])

    function updateStatus(node: SharedNode){
        if( node.disk === null){
            setStatusIcon( <AlertTriangle size={24}/>)
            setStatusText('No storage device attached.')
            return
        }

        const lastSeen = node.lastSeen === null ? 'never' : node.lastSeen.toLocaleTimeString()
        setStatusText(`Last seen: ${lastSeen}`)

        if( moreThanOneHourAgo(node.lastSeen)){
            setStatusIcon(<Clock size={24}/>)
            return
        }

        setStatusIcon(<Check size={24}/>)

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
                        statusIcon={statusIcon}
                        statusText={statusText}
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