import React, {useState} from "react";
import {Divider, Menu, Text} from "@mantine/core";
import {Activity, PlugConnected, Plus} from "tabler-icons-react";
import ModalTemplate from "../../ModalTemplate";
import GuideProvideDisk from "../../guides/remoteStorageGuides/provideDisk/GuideProvideDisk";

interface Prop{
    button: JSX.Element,
    statusIcon: JSX.Element,
    statusText: string,
    diskIsAlreadyConnected: boolean,
    supplierNodeID: string,
    afterAction(): void,

}

function SupplierNodeMenu({button, statusIcon, statusText, diskIsAlreadyConnected, supplierNodeID, afterAction}: Prop) {

    const [reconnectModalVisible, setReconnectModalVisible] = useState<boolean>(false)
    const [replaceModalVisible, setReplaceModalVisible] = useState<boolean>(false)
    const [addDiskModalVisible, setAddDiskModalVisible] = useState<boolean>(false)

    return (
        <>
            <ModalTemplate
                fullSize
                visible={addDiskModalVisible}
                title='Provide a disk for a friend'
                onClose={() => setAddDiskModalVisible(false)}
                content={
                <GuideProvideDisk
                    supplierNodeId={supplierNodeID}
                    onFinish={() => {
                            setAddDiskModalVisible(false)
                            afterAction()
                        }
                    }
                />}
            />


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
                    onClick={() => setAddDiskModalVisible(true)}
                    disabled={diskIsAlreadyConnected}
                >
                    Add storage device
                </Menu.Item>

                <Menu.Item
                    icon={<PlugConnected size={18}/>}
                    disabled={!diskIsAlreadyConnected}
                >
                    Reconnect drive
                </Menu.Item>

                <Menu.Item
                    icon={<Activity size={18}/>}
                    disabled={!diskIsAlreadyConnected}
                >
                    Replace drive
                </Menu.Item>
            </Menu>
        </>
    )
}

export default SupplierNodeMenu