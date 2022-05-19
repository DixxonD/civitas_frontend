import React, {useState} from "react";
import {Divider, Menu, Text} from "@mantine/core";
import {Activity, PlugConnected, Plus} from "tabler-icons-react";
import ModalTemplate from "../../ModalTemplate";
import FormReconnectDrive from "../modals/FormReconnectDrive";

interface Prop{
    button: JSX.Element,
    statusIcon: JSX.Element,
    statusText: string
}

function FriendNodeMenu({button, statusIcon, statusText}: Prop) {

    const [reconnectModalVisible, setReconnectModalVisible] = useState<boolean>(false)
    const [replaceModalVisible, setReplaceModalVisible] = useState<boolean>(false)

    /*
                <ModalTemplate
                visible={reconnectModalVisible}
                title={'Reconnect Drive'}
                onClose={()=> {setReconnectModalVisible(false)}}
                content={}
            />
     */

    return (
        <>

            <Menu size='lg' control={button}>
                <Menu.Item
                    component={Text}
                    icon={statusIcon}
                    disabled
                >
                    {statusText}
                </Menu.Item>
                <Divider/>

                <Menu.Item
                    icon={<Plus size={18}/>}
                >
                    Add storage device
                </Menu.Item>

                <Menu.Item
                    icon={<PlugConnected size={18}/>}
                >
                    Reconnect drive
                </Menu.Item>

                <Menu.Item
                    icon={<Activity size={18}/>}
                >
                    Replace drive
                </Menu.Item>
            </Menu>
        </>
    )
}

export default FriendNodeMenu