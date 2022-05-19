import React, {useState} from "react";
import {Menu} from "@mantine/core";
import {Activity, PlugConnected} from "tabler-icons-react";
import ModalTemplate from "../ModalTemplate";
import FormReconnectDrive from "./modals/FormReconnectDrive";
import {RaidStatus} from "../../config/types";
import FormReplaceDrive from "./modals/FormReplaceDrive";
import {reconnectDrive, replaceDrive} from "../../services/DashboardAPI";

interface Prop{
    pool: RaidStatus,
    onRefresh(): void
}

function PoolStatusMenu({pool, onRefresh}: Prop){

    const [reconnectModalVisible, setReconnectModalVisible] = useState<boolean>(false)
    const [replaceModalVisible, setReplaceModalVisible] = useState<boolean>(false)

    return (
        <>
            <ModalTemplate
                visible={reconnectModalVisible}
                onClose={() => setReconnectModalVisible(false)}
                title='Reconnect Drive'
                content={<FormReconnectDrive
                    pool={pool}
                    close={() => setReconnectModalVisible(false)}
                    reconnectFunction={reconnectDrive}
                    onSuccess={onRefresh}/>}
            />
            <ModalTemplate
                fullSize
                visible={replaceModalVisible}
                onClose={() => setReplaceModalVisible(false)}
                title='Replace Drive'
                content={<FormReplaceDrive
                    pool={pool}
                    close={() => setReplaceModalVisible(false)}
                    replaceFunction={replaceDrive}
                    onSuccess={onRefresh}/>}
            />
            <Menu>
                <Menu.Item
                    icon={<PlugConnected size={18}/>}
                    onClick={() => setReconnectModalVisible(true)}
                >
                    Reconnect Drive
                </Menu.Item>
                <Menu.Item
                    icon={<Activity size={18}/>}
                    onClick={() => {setReplaceModalVisible(true)}}
                >
                    Replace Drive
                </Menu.Item>

            </Menu>
        </>
    )
}

export default PoolStatusMenu
